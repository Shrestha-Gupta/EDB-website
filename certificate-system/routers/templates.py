"""
Template management — upload, list, update field placements, delete.
"""

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from PIL import Image
from pathlib import Path
import shutil

from models import (
    TemplateConfig, TemplateFieldsUpdate, FieldPlacement,
    templates_store, new_id, now_iso,
)

Image.MAX_IMAGE_PIXELS = None  # Allow large templates

router = APIRouter()


@router.post("", response_model=TemplateConfig)
async def upload_template(
    name: str = Form(...),
    file: UploadFile = File(...),
):
    """Upload a new certificate template image."""
    # Validate file type
    if file.content_type not in ("image/png", "image/jpeg", "image/jpg"):
        raise HTTPException(400, "Only PNG and JPG images are supported")

    tid = new_id()
    ext = Path(file.filename).suffix or ".png"
    save_path = f"uploads/templates/{tid}{ext}"

    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Read dimensions
    img = Image.open(save_path)
    w, h = img.size

    # Create default field placements (centered name + serial top-right)
    default_fields = [
        FieldPlacement(
            field_name="name",
            x=w / 2,
            y=h * 0.505,
            font_size=120,
            font_color="#000000",
            alignment="center",
        ),
        FieldPlacement(
            field_name="serial_number",
            x=w * 0.73,
            y=h * 0.18,
            font_size=70,
            font_color="#000000",
            alignment="left",
        ),
    ]

    template = TemplateConfig(
        id=tid,
        name=name,
        image_path=save_path,
        fields=default_fields,
        width=w,
        height=h,
        created_at=now_iso(),
    )
    templates_store[tid] = template
    return template


@router.get("")
async def list_templates():
    """List all saved templates."""
    return list(templates_store.values())


@router.get("/{template_id}")
async def get_template(template_id: str):
    """Get a single template by ID."""
    if template_id not in templates_store:
        raise HTTPException(404, "Template not found")
    return templates_store[template_id]


@router.put("/{template_id}/fields")
async def update_fields(template_id: str, payload: TemplateFieldsUpdate):
    """Update the field placements for a template (from the Fabric.js editor)."""
    if template_id not in templates_store:
        raise HTTPException(404, "Template not found")

    templates_store[template_id].fields = payload.fields
    return templates_store[template_id]


@router.delete("/{template_id}")
async def delete_template(template_id: str):
    """Delete a template and its image file."""
    if template_id not in templates_store:
        raise HTTPException(404, "Template not found")

    tpl = templates_store.pop(template_id)
    path = Path(tpl.image_path)
    if path.exists():
        path.unlink()

    return {"detail": "deleted"}
