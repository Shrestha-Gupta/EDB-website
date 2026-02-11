# EDB Bulk Certificate Sender System

Automated system to generate and send personalized certificates to participants via email.

## Features

✨ Batch certificate generation from CSV
📧 Automated email delivery with attachments
🎨 Customizable certificate templates
📊 Progress tracking and summary reports
🔒 Secure credential management with .env

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Email Settings

Copy `.env.example` to `.env` and add your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your details:

```env
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-app-password
```

**For Gmail:**
1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new App Password for "Mail"
4. Use that 16-character password in `.env`

### 3. Prepare Certificate Template

Place your certificate template image in:
```
template/certificate_template.png
```

The script will automatically center the participant's name on the certificate.

### 4. Add Fonts (Optional)

Place custom font files in:
```
fonts/your-font.ttf
```

Update `font_path` in the script if needed.

### 5. Prepare Participant List

Create a CSV file with columns: `name`, `email`

Example (`participants.csv`):
```csv
name,email
John Doe,john@example.com
Jane Smith,jane@example.com
```

## Usage

### Run the Script

```bash
python certificate_sender.py
```

The script will:
1. Ask for the CSV file path
2. Ask for the event name (optional)
3. Confirm before sending
4. Generate certificates and send emails

### Custom CSV File

```bash
python certificate_sender.py
# Then enter your CSV path when prompted
```

## File Structure

```
certificate-system/
├── certificate_sender.py    # Main script
├── requirements.txt          # Python dependencies
├── .env.example             # Environment template
├── .env                     # Your credentials (gitignored)
├── participants.csv         # Participant list
├── README.md                # This file
├── template/
│   └── certificate_template.png
├── fonts/
│   └── arial.ttf
└── certificates/            # Generated certificates (auto-created)
    └── *.png
```

## Customization

### Adjust Name Position

Edit in `certificate_sender.py`:

```python
y = img.height / 2  # Change this value
```

### Change Font Size

```python
name_font = ImageFont.truetype(self.font_path, 80)  # Change 80
```

### Customize Email Body

Edit the `body` variable in the `send_email` method.

## Troubleshooting

**Font not found:** The script will use default font. Add custom .ttf fonts to `fonts/` directory.

**SMTP Error:** Check your email credentials and ensure App Password is used for Gmail.

**Template not found:** Ensure `template/certificate_template.png` exists.

## Security Notes

⚠️ Never commit `.env` file to git
⚠️ Use App Passwords, not regular passwords
⚠️ Keep `SENDER_PASSWORD` secure

## Integration with EDB Backend

To fetch participants from your MongoDB database instead of CSV:

```python
import pymongo
from dotenv import load_dotenv

# Connect to MongoDB
client = pymongo.MongoClient(os.getenv('MONGODB_URI'))
db = client['edb']
participants = db['eventregistrations'].find({'eventId': 'event_id_here'})

# Process participants
for participant in participants:
    name = participant['name']
    email = participant['email']
    # ... generate and send
```

## License

MIT License - EDB Team
