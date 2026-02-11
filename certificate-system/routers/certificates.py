"""
Certificate generation engine — creates individual PDFs from template + data.
Also handles CSV upload & preview.
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import pandas as pd
import img2pdf
import os
import io

from models import TemplateConfig, FieldPlacement, templates_store

Image.MAX_IMAGE_PIXELS = None

router = APIRouter()

# ── Font resolution ──────────────────────────────────────────────

FONT_MAP = {
    "Helvetica": "/System/Library/Fonts/Helvetica.ttc",
    "Arial": "/Library/Fonts/Arial.ttf",
    "Times": "/System/Library/Fonts/Times.ttc",
    "Georgia": "/Library/Fonts/Georgia.ttf",
    "Courier": "/System/Library/Fonts/Courier.dfont",
}

# Linux / Docker fallback fonts
LINUX_FONT_FALLBACKS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
    "/usr/share/fonts/TTF/DejaVuSans.ttf",
]


def resolve_font(family: str, size: int) -> ImageFont.FreeTypeFont:
    """Try custom fonts dir, then system fonts, then default."""
    # 1. Check fonts/ directory
    for ext in (".ttf", ".otf", ".ttc"):
        custom = Path(f"fonts/{family}{ext}")
        if custom.exists():
            return ImageFont.truetype(str(custom), size)

    # 2. System fonts
    if family in FONT_MAP and Path(FONT_MAP[family]).exists():
        return ImageFont.truetype(FONT_MAP[family], size)

    # 3. Try any system font
    for path in FONT_MAP.values():
        if Path(path).exists():
            return ImageFont.truetype(path, size)

    # 4. Linux / Docker fallback
    for path in LINUX_FONT_FALLBACKS:
        if Path(path).exists():
            return ImageFont.truetype(path, size)

    # 5. Fallback
    return ImageFont.load_default()


# ── Certificate generator ────────────────────────────────────────

def generate_certificate(
    template: TemplateConfig,
    data: dict,
    output_dir: str = "certificates",
) -> str:
    """Generate a single PDF certificate. Returns the output file path."""
    img = Image.open(template.image_path)
    draw = ImageDraw.Draw(img)

    for field in template.fields:
        value = str(data.get(field.field_name, "")).strip()
        if not value:
            continue

        font = resolve_font(field.font_family, field.font_size)
        bbox = draw.textbbox((0, 0), value, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]

        # Compute x based on alignment
        if field.alignment == "center":
            x = field.x - text_w / 2
        elif field.alignment == "right":
            x = field.x - text_w
        else:
            x = field.x

        y = field.y - text_h / 2  # Vertically center on the anchor point

        draw.text((x, y), value, fill=field.font_color, font=font)

    # Build safe filename
    name_part = data.get("name", "unknown").replace(" ", "_")
    serial_part = str(data.get("serial_number", "")).replace("/", "-").replace("\\", "-")
    base = f"{serial_part}_{name_part}" if serial_part else name_part

    Path(output_dir).mkdir(parents=True, exist_ok=True)
    temp_jpg = f"{output_dir}/{base}_temp.jpg"
    pdf_path = f"{output_dir}/{base}_certificate.pdf"

    # Save as JPEG with compression to keep file size reasonable for email
    if img.mode == "RGBA":
        img = img.convert("RGB")
    img.save(temp_jpg, "JPEG", quality=80, optimize=True)

    with open(pdf_path, "wb") as f:
        f.write(img2pdf.convert(temp_jpg))

    os.remove(temp_jpg)
    return pdf_path


# ── CSV Upload & Preview ────────────────────────────────────────

@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    """Upload a CSV/Excel file and return parsed participant data."""
    if not file.filename:
        raise HTTPException(400, "No file provided")

    ext = Path(file.filename).suffix.lower()
    contents = await file.read()

    try:
        if ext in (".xlsx", ".xls"):
            df = pd.read_excel(io.BytesIO(contents))
        elif ext == ".csv":
            df = pd.read_csv(io.BytesIO(contents))
        else:
            raise HTTPException(400, "Only CSV and Excel files are supported")
    except Exception as e:
        raise HTTPException(400, f"Failed to parse file: {str(e)}")

    # Validate required columns
    columns = [c.lower().strip() for c in df.columns]
    df.columns = columns

    if "name" not in columns or "email" not in columns:
        raise HTTPException(
            400,
            f"File must have 'name' and 'email' columns. Found: {list(df.columns)}"
        )

    # Detect serial number column
    serial_col = None
    for col in ("serial_number", "serial", "sr_no", "sr_number", "sno"):
        if col in columns:
            serial_col = col
            break

    # Build participant list
    participants = []
    for _, row in df.iterrows():
        p = {
            "name": str(row["name"]).strip(),
            "email": str(row["email"]).strip(),
        }
        if serial_col and pd.notna(row.get(serial_col)):
            p["serial_number"] = str(row[serial_col]).strip()
        participants.append(p)

    return {
        "total": len(participants),
        "columns": list(df.columns),
        "serial_column": serial_col,
        "participants": participants,
    }


@router.post("/preview")
async def preview_certificate(
    template_id: str,
    name: str = "Sample Name",
    serial_number: str = "CSA/EDB/001",
):
    """Generate a single preview certificate and return the path."""
    if template_id not in templates_store:
        raise HTTPException(404, "Template not found")

    template = templates_store[template_id]
    data = {"name": name, "serial_number": serial_number}

    try:
        cert_path = generate_certificate(template, data, output_dir="certificates/preview")
        return {"path": cert_path, "url": f"/{cert_path}"}
    except Exception as e:
        raise HTTPException(500, f"Failed to generate preview: {str(e)}")
