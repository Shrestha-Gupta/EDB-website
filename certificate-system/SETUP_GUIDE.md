# Complete Setup and Usage Guide for Bulk Certificate System

This guide will walk you through every step needed to set up and use the bulk certificate email system.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Gmail Configuration](#gmail-configuration)
4. [Certificate Template Setup](#certificate-template-setup)
5. [Participant List Preparation](#participant-list-preparation)
6. [Running the System](#running-the-system)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Usage](#advanced-usage)

---

## Prerequisites

Before starting, ensure you have:

- ✅ Python 3.8 or higher installed
- ✅ A Gmail account (or other SMTP email provider)
- ✅ A certificate template image (PNG or JPG)
- ✅ List of participants with names and emails

### Check Python Version

Open Terminal and run:
```bash
python3 --version
```

You should see something like `Python 3.11.x` or higher.

---

## Installation

### Step 1: Navigate to the Certificate System Directory

Open Terminal and navigate to the project:

```bash
cd /Users/apple/Documents/EDB/EDB-website/certificate-system
```

### Step 2: Install Required Python Libraries

Run the following command to install all dependencies:

```bash
pip3 install -r requirements.txt
```

This will install:
- **Pillow** - For image processing and certificate generation
- **pandas** - For reading CSV files
- **openpyxl** - For Excel file support
- **python-dotenv** - For secure environment variable management

**Expected Output:**
```
Successfully installed Pillow-10.2.0 pandas-2.2.0 openpyxl-3.1.2 python-dotenv-1.0.1
```

### Step 3: Verify Installation

Test if libraries are installed correctly:

```bash
python3 -c "import PIL, pandas, dotenv; print('✓ All libraries installed successfully!')"
```

---

## Gmail Configuration

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: [https://myaccount.google.com](https://myaccount.google.com)
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google," click on **2-Step Verification**
4. Follow the prompts to enable 2FA (you'll need your phone)

### Step 2: Generate App Password

1. After enabling 2FA, go back to **Security**
2. Under "Signing in to Google," click on **App passwords**
   - **Direct link:** [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. You may need to sign in again
4. Under "Select app," choose **Mail**
5. Under "Select device," choose **Mac** (or your device)
6. Click **Generate**
7. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)
   - ⚠️ **Important:** Save this password - you won't see it again!

### Step 3: Configure Environment Variables

Create your `.env` file from the example:

```bash
cp .env.example .env
```

Open `.env` file in a text editor:

```bash
open .env
```

Replace the placeholders with your actual credentials:

```env
# SMTP Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# Email Credentials
SENDER_EMAIL=your-actual-email@gmail.com
SENDER_PASSWORD=abcdefghijklmnop

# Example with real data:
# SENDER_EMAIL=edb.kiit@gmail.com
# SENDER_PASSWORD=xyzw abcd efgh ijkl
```

**⚠️ Security Notes:**
- Use the **16-character App Password**, NOT your regular Gmail password
- Never commit `.env` file to git (it's already in `.gitignore`)
- Keep this file secure and private

### Step 4: Test Email Configuration

Create a test script to verify your email setup:

```bash
python3 -c "
import smtplib
import os
from dotenv import load_dotenv

load_dotenv()
server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(os.getenv('SENDER_EMAIL'), os.getenv('SENDER_PASSWORD'))
print('✓ Email configuration successful!')
server.quit()
"
```

If you see `✓ Email configuration successful!`, you're ready to proceed!

---

## Certificate Template Setup

### Step 1: Prepare Your Certificate Design

Create or design a certificate template with these specifications:

**Recommended Specifications:**
- **Format:** PNG (supports transparency) or JPG
- **Resolution:** 1920x1080 pixels or higher
- **Orientation:** Landscape
- **Design Guidelines:**
  - Leave blank space in the center for participant name
  - Use professional fonts and colors
  - Include organization logo and signature
  - Add borders or decorative elements

**Design Tools:**
- Canva (easiest): [https://www.canva.com](https://www.canva.com)
- Adobe Photoshop
- GIMP (free)
- PowerPoint/Keynote (export as PNG)

### Step 2: Save Certificate Template

1. Export your certificate as PNG or JPG
2. Name it: `certificate_template.png`
3. Move it to the `template` folder:

```bash
# If your certificate is on Desktop:
mv ~/Desktop/certificate_template.png template/

# Or manually drag and drop into the template folder
```

### Step 3: Verify Template

Check if the template is in the correct location:

```bash
ls -lh template/certificate_template.png
```

You should see the file size (e.g., `-rw-r--r--  1 user  staff   2.1M Feb  6 10:30 template/certificate_template.png`)

### Step 4: Add Custom Font (Optional)

If you want to use a custom font:

1. Download a `.ttf` font file (e.g., from [Google Fonts](https://fonts.google.com))
2. Place it in the `fonts/` directory:

```bash
# Example:
mv ~/Downloads/Playfair-Display.ttf fonts/
```

3. Update `certificate_sender.py` to use your font:

Open the file and change this line:
```python
self.font_path = 'fonts/Playfair-Display.ttf'  # Change to your font name
```

**Font Recommendations:**
- **Elegant:** Playfair Display, Cinzel, Great Vibes
- **Professional:** Roboto, Open Sans, Montserrat
- **Traditional:** Times New Roman, Georgia

---

## Participant List Preparation

### Step 1: Create CSV File

You can use Excel, Google Sheets, or any text editor to create your participant list.

**Required Format:**
- File name: `participants.csv` (or any name you prefer)
- Columns: `name` and `email` (exactly these names, lowercase)

### Step 2: CSV Template

Create a file with this exact structure:

```csv
name,email
Aarav Sharma,aarav.sharma@gmail.com
Diya Patel,diya.patel@gmail.com
Rohan Kumar,rohan.kumar@gmail.com
Ananya Verma,ananya.verma@gmail.com
Arjun Singh,arjun.singh@gmail.com
```

**Important Rules:**
- ✅ First row MUST be: `name,email`
- ✅ No extra spaces around names or emails
- ✅ One participant per line
- ✅ Valid email addresses only
- ❌ No empty rows
- ❌ No special characters in names (unless intended)

### Step 3: Using Google Sheets

If you're creating the list in Google Sheets:

1. Create a sheet with columns: `name` and `email`
2. Fill in participant data
3. Go to **File → Download → Comma Separated Values (.csv)**
4. Move the downloaded file to the certificate-system folder:

```bash
mv ~/Downloads/participants.csv /Users/apple/Documents/EDB/EDB-website/certificate-system/
```

### Step 4: Using Excel

If you're using Excel:

1. Create a workbook with columns: `name` and `email`
2. Fill in participant data
3. Go to **File → Save As**
4. Choose format: **CSV UTF-8 (Comma delimited) (.csv)**
5. Move the file to the certificate-system folder

### Step 5: Verify CSV Format

Check your CSV file:

```bash
head -5 participants.csv
```

Output should look like:
```
name,email
Aarav Sharma,aarav.sharma@gmail.com
Diya Patel,diya.patel@gmail.com
Rohan Kumar,rohan.kumar@gmail.com
Ananya Verma,ananya.verma@gmail.com
```

---

## Running the System

### Step 1: Test with Sample Data First

Before sending to real participants, test with a small sample:

1. Create a test CSV with your own email:

```csv
name,email
Test User,your-email@gmail.com
```

Save as `test_participants.csv`

### Step 2: Run the Script

Execute the main script:

```bash
python3 certificate_sender.py
```

### Step 3: Follow the Prompts

**Prompt 1: CSV File Path**
```
Enter CSV file path (default: participants.csv):
```
- Press **Enter** to use default `participants.csv`
- OR type: `test_participants.csv` (for testing)

**Prompt 2: Event Name**
```
Enter event name (optional):
```
- Type event name: `Arunoday 2026` or `MUN Conference`
- OR press **Enter** to skip

**Prompt 3: Confirmation**
```
⚠️  About to send certificates from: test_participants.csv
Continue? (yes/no):
```
- Type: `yes` and press **Enter**

### Step 4: Monitor Progress

The script will show real-time progress:

```
📧 Processing 3 certificates...

[1/3] Processing Aarav Sharma (aarav.sharma@gmail.com)...
  ✓ Successfully sent to Aarav Sharma
[2/3] Processing Diya Patel (diya.patel@gmail.com)...
  ✓ Successfully sent to Diya Patel
[3/3] Processing Rohan Kumar (rohan.kumar@gmail.com)...
  ✓ Successfully sent to Rohan Kumar

==================================================
📊 Summary:
  Total: 3
  ✓ Success: 3
  ✗ Failed: 0
==================================================
```

### Step 5: Verify Certificates

1. Check the `certificates/` folder for generated images:

```bash
ls -l certificates/
```

2. Check recipient emails (or your test email) for the certificate

3. Verify:
   - ✅ Name is correctly displayed
   - ✅ Name is properly centered
   - ✅ Font is readable
   - ✅ Email contains certificate attachment

### Step 6: Send to All Participants

Once testing is successful:

1. Run the script again:
```bash
python3 certificate_sender.py
```

2. Enter your full `participants.csv` file

3. Confirm and let it run

4. Monitor the summary for any failures

---

## Troubleshooting

### Error: "SENDER_EMAIL or SENDER_PASSWORD not found"

**Cause:** `.env` file not configured or not found

**Solution:**
```bash
# Check if .env exists
ls -la .env

# If not, create from example
cp .env.example .env

# Edit with your credentials
open .env
```

---

### Error: "SMTPAuthenticationError"

**Cause:** Wrong email credentials or App Password not used

**Solution:**
1. Verify you're using **App Password**, not regular password
2. Re-generate App Password from Google Account
3. Ensure no extra spaces in `.env` file:
```env
SENDER_PASSWORD=abcdefghijklmnop
# NOT: SENDER_PASSWORD= abcd efgh ijkl mnop (spaces removed)
```

---

### Error: "Template not found"

**Cause:** Certificate template not in correct location

**Solution:**
```bash
# Check if template exists
ls template/certificate_template.png

# If not, add your template
mv ~/Desktop/your_certificate.png template/certificate_template.png
```

---

### Error: "Font file not found"

**Cause:** Custom font specified but file doesn't exist

**Solution:**
- The script will use default font automatically
- OR download and add your font to `fonts/` folder
- Update `font_path` in `certificate_sender.py`

---

### Name Not Centered on Certificate

**Solution:** Adjust the vertical position in `certificate_sender.py`:

Open file and find this line (around line 40):
```python
y = img.height / 2  # This centers vertically
```

Change to:
```python
y = img.height * 0.45  # Move up
# OR
y = img.height * 0.6   # Move down
```

Test and adjust until perfect.

---

### Error: "CSV must have columns: ['name', 'email']"

**Cause:** CSV file has wrong column names

**Solution:**
- Ensure first row is exactly: `name,email`
- Column names are case-sensitive (use lowercase)
- No extra spaces: `name,email` not `name, email`

---

### Some Emails Failed to Send

**Cause:** Invalid email addresses or temporary network issues

**Solution:**
1. Check the failed email addresses in CSV
2. Remove/fix invalid emails
3. Re-run with only failed participants:
   - Create new CSV with failed entries
   - Run script again

---

### Rate Limiting / Too Many Emails

**Cause:** Gmail has sending limits (500 emails/day for regular accounts)

**Solution:**
1. **Batch processing:** Send in batches of 100-200
2. **Add delays:** Modify script to add sleep between emails:
```python
import time
time.sleep(2)  # Wait 2 seconds between emails
```
3. **Use G Suite/Google Workspace:** Higher limits (2000/day)

---

## Advanced Usage

### Option 1: Send to Specific Event Participants from Database

Modify the script to fetch from your MongoDB:

```python
import pymongo

# Connect to database
client = pymongo.MongoClient('your-mongodb-uri')
db = client['edb']

# Fetch participants
registrations = db['eventregistrations'].find({'eventId': 'event_123'})

# Process each
for reg in registrations:
    name = reg['name']
    email = reg['email']
    # Generate and send certificate
```

### Option 2: Add Position/Title to Certificate

Modify CSV to include position:

```csv
name,email,position
Aarav Sharma,aarav@gmail.com,Winner
Diya Patel,diya@gmail.com,Runner-up
```

Update script to use position in certificate.

### Option 3: Batch Processing Large Lists

For 1000+ participants, split into batches:

```bash
# Split CSV into batches of 100
split -l 101 participants.csv batch_

# Send each batch
python3 certificate_sender.py
# Enter: batch_aa

python3 certificate_sender.py
# Enter: batch_ab
```

### Option 4: PDF Certificates Instead of PNG

Install additional library:

```bash
pip3 install img2pdf
```

Modify script to convert PNG to PDF before sending.

### Option 5: Dry Run Mode

Add a dry-run mode to test without sending emails:

In the script, add before `send_email()`:
```python
if DRY_RUN:
    print(f"  [DRY RUN] Would send to {email}")
    continue
```

---

## Best Practices

### ✅ Do's

1. **Always test first** with your own email
2. **Backup your participants.csv** before running
3. **Check generated certificates** in `certificates/` folder
4. **Use professional email language** in email body
5. **Keep `.env` file secure** and never share it
6. **Monitor the summary** for failed sends

### ❌ Don'ts

1. **Don't send to production** list without testing
2. **Don't share your App Password** with anyone
3. **Don't commit `.env`** to version control
4. **Don't ignore failed sends** - investigate and resend
5. **Don't send during off-hours** (respect time zones)

---

## Quick Reference Commands

```bash
# Navigate to directory
cd /Users/apple/Documents/EDB/EDB-website/certificate-system

# Install dependencies
pip3 install -r requirements.txt

# Configure environment
cp .env.example .env && open .env

# Check template
ls template/certificate_template.png

# Verify CSV
head participants.csv

# Run script
python3 certificate_sender.py

# View generated certificates
open certificates/

# Check errors
tail -20 # (if logging added)
```

---

## Support

For issues or questions:

1. Check [Troubleshooting](#troubleshooting) section
2. Review error messages carefully
3. Verify all files are in correct locations
4. Test with small sample first

---

## Checklist Before Running

Before sending bulk certificates, verify:

- [ ] Python 3.8+ installed
- [ ] All dependencies installed (`pip3 install -r requirements.txt`)
- [ ] Gmail App Password generated
- [ ] `.env` file configured with correct credentials
- [ ] Certificate template exists at `template/certificate_template.png`
- [ ] CSV file has correct format (`name,email`)
- [ ] Tested with sample data (your own email)
- [ ] Certificate looks correct (name centered, readable)
- [ ] Email body is appropriate
- [ ] Event name is correct

Once all checked, you're ready to send! 🎉

---

**Last Updated:** February 6, 2026  
**EDB Team**
