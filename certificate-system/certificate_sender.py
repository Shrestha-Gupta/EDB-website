from PIL import Image, ImageDraw, ImageFont
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import pandas as pd
import os
from dotenv import load_dotenv
from pathlib import Path
import img2pdf

# Load environment variables
load_dotenv()


class CertificateSender:
    def __init__(self):
        self.template_path = 'template/certificate_template.jpg'
        self.font_path = 'fonts/arial.ttf'
        self.output_dir = 'certificates'

        # Email configuration
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.sender_email = os.getenv('SENDER_EMAIL')
        self.sender_password = os.getenv('SENDER_PASSWORD')

        Path(self.output_dir).mkdir(parents=True, exist_ok=True)

    def generate_certificate(self, name, event_name='', serial_number=None,
                             output_path=None, output_format='pdf'):
        try:
            img = Image.open(self.template_path)
            draw = ImageDraw.Draw(img)

            # ===== FONT LOADING =====
            font_loaded = False
            try:
                name_font = ImageFont.truetype(self.font_path, 110)   # ✔ correct size
                event_font = ImageFont.truetype(self.font_path, 60)
                serial_font = ImageFont.truetype(self.font_path, 48)  # ✔ correct size
                font_loaded = True
            except:
                try:
                    name_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 110)
                    event_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 60)
                    serial_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 48)
                    font_loaded = True
                except:
                    try:
                        name_font = ImageFont.truetype('/Library/Fonts/Arial.ttf', 110)
                        event_font = ImageFont.truetype('/Library/Fonts/Arial.ttf', 60)
                        serial_font = ImageFont.truetype('/Library/Fonts/Arial.ttf', 48)
                        font_loaded = True
                    except:
                        name_font = ImageFont.load_default()
                        event_font = ImageFont.load_default()
                        serial_font = ImageFont.load_default()

            # ===== SERIAL NUMBER POSITION (FINAL FIXED) =====
            if serial_number:
                serial_text = str(serial_number)

                serial_x = int(img.width * 1550 / 2048)
                serial_y = int(img.height * 325 / 1365)

                draw.text((serial_x, serial_y), serial_text,
                          fill='#000000', font=serial_font)

            # ===== NAME POSITION (FINAL FIXED) =====
            name_y = int(img.height * 820 / 1365)

            if font_loaded:
                bbox = draw.textbbox((0, 0), name, font=name_font)
                text_width = bbox[2] - bbox[0]
                x = (img.width - text_width) / 2
            else:
                x = img.width / 2 - 200

            draw.text((x, name_y), name, fill='#000000', font=name_font)

            # ===== EVENT NAME =====
            if event_name:
                if font_loaded:
                    event_bbox = draw.textbbox((0, 0), event_name, font=event_font)
                    event_width = event_bbox[2] - event_bbox[0]
                    event_x = (img.width - event_width) / 2
                else:
                    event_x = img.width / 2 - 150

                event_y = name_y + 180
                draw.text((event_x, event_y), event_name,
                          fill='#333333', font=event_font)

            # ===== SAVE CERTIFICATE =====
            if output_path is None:
                base_name = name.replace(" ", "_")

                if serial_number:
                    safe_serial = str(serial_number).replace("/", "-").replace("\\", "-")
                    base_name = f"{safe_serial}_{base_name}"

                if output_format.lower() == 'pdf':
                    temp_png = f'{self.output_dir}/{base_name}_temp.png'
                    output_path = f'{self.output_dir}/{base_name}.pdf'

                    img.save(temp_png)

                    with open(output_path, 'wb') as f:
                        f.write(img2pdf.convert(temp_png))

                    os.remove(temp_png)
                else:
                    output_path = f'{self.output_dir}/{base_name}.png'
                    img.save(output_path)

            return output_path

        except Exception as e:
            print(f"❌ Error generating certificate for {name}: {str(e)}")
            return None

    # ===== EMAIL SENDING =====
    def send_email(self, to_email, name, cert_path, event_name=''):
        try:
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = to_email
            msg['Subject'] = f'Certificate of Participation - {event_name}' if event_name else 'Your Certificate'

            body = f"""Dear {name},

Congratulations! 🎉

Please find your certificate of participation attached.

Thank you for being a part of {event_name if event_name else 'our event'}.

Best regards,
EDB Team
"""
            msg.attach(MIMEText(body, 'plain'))

            with open(cert_path, 'rb') as attachment:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())

            encoders.encode_base64(part)
            part.add_header('Content-Disposition',
                            f'attachment; filename={os.path.basename(cert_path)}')
            msg.attach(part)

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.sender_email, self.sender_password)
            server.send_message(msg)
            server.quit()

            return True

        except Exception as e:
            print(f"❌ Error sending email to {to_email}: {str(e)}")
            return False

    # ===== BULK PROCESS =====
    def process_bulk(self, file_path, event_name='', output_format='pdf'):
        try:
            if file_path.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(file_path)
            else:
                df = pd.read_csv(file_path)

            required_columns = ['name', 'email']
            if not all(col in df.columns for col in required_columns):
                print(f"❌ File must contain columns: {required_columns}")
                return

            serial_col = 'serial_number' if 'serial_number' in df.columns \
                else 'serial' if 'serial' in df.columns else None

            total, success, failed = len(df), 0, 0

            print(f"\n📧 Processing {total} certificates...\n")

            for i, row in df.iterrows():
                name = row['name'].strip()
                email = row['email'].strip()
                serial_number = row[serial_col] if serial_col and pd.notna(row[serial_col]) else None

                print(f"[{i+1}/{total}] {name} ({email})")

                cert_path = self.generate_certificate(name, event_name, serial_number,
                                                      output_format=output_format)

                if cert_path and self.send_email(email, name, cert_path, event_name):
                    print("  ✓ Sent")
                    success += 1
                else:
                    print("  ✗ Failed")
                    failed += 1

            print(f"\n📊 Total: {total} | ✓ {success} | ✗ {failed}\n")

        except Exception as e:
            print(f"❌ Bulk processing error: {str(e)}")


# ===== MAIN =====
def main():
    print("EDB Bulk Certificate Sender")

    sender = CertificateSender()

    if not sender.sender_email or not sender.sender_password:
        print("❌ Set SENDER_EMAIL and SENDER_PASSWORD in .env")
        return

    file_path = input("Enter CSV/Excel path (default participants.csv): ").strip() or "participants.csv"
    event_name = input("Enter event name: ").strip()
    output_format = input("Output format pdf/png (default pdf): ").strip().lower() or "pdf"

    confirm = input("Send certificates? (yes/no): ").lower()
    if confirm in ["yes", "y"]:
        sender.process_bulk(file_path, event_name, output_format)
    else:
        print("Cancelled")


if __name__ == "__main__":
    main()
