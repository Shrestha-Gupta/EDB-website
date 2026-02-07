# Certificate System - Admin Usage Guide

## 🌐 How to Access

### Prerequisites
1. You must be logged in as an **admin user**
2. Backend FastAPI server must be running on port 8000
3. Frontend React app must be running on port 5173/5174

### Starting the Servers

**Backend (Certificate API):**
```bash
cd certificate-system
python3 -m uvicorn app:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Access URL
Navigate to: **`http://localhost:5173/admin/certificates`**

> **Note:** This page is only accessible to admin users. Regular users will be redirected.

---

## 📋 How to Use the Certificate Generator

The certificate admin panel has **3 tabs**: Templates, Bulk Send, and Job History.

---

## 1️⃣ Templates Tab

### Upload a Certificate Template

1. Click the **"Upload Template"** button
2. Enter a **template name** (e.g., "MUN Certificate 2025")
3. Click **"Choose File"** and select your certificate image
   - Supported formats: JPG, PNG
   - Recommended size: High resolution (e.g., 12500×8333 px)
4. Click **"Upload"**

### View & Manage Templates

- All uploaded templates appear in a list with:
  - Template name
  - Upload date
  - Dimensions (width × height)
- Click **"Edit Fields"** to customize text positions
- Click **"Delete"** to remove a template

### Edit Field Positions (Visual Editor)

1. Click **"Edit Fields"** on any template
2. The template image loads with draggable field markers:
   - **🔵 Name** - Participant's name
   - **🟢 Serial Number** - Certificate serial/ID
3. **Drag the markers** to position them on the certificate
4. Use the **Properties Panel** to adjust:
   - **X/Y Position** - Fine-tune coordinates
   - **Font Size** - Text size in pixels
   - **Font Color** - Click to pick color
   - **Alignment** - Left, Center, or Right
   - **Font Family** - Helvetica, Arial, Times, Georgia, Courier
5. Use the **Zoom** slider to see details
6. Click **"Save Changes"** to update the template

> **Tip:** The default positions are pre-configured but you can adjust them to match your design.

---

## 2️⃣ Bulk Send Tab

This is where you generate and send certificates to multiple participants.

### Step-by-Step Process

#### Step 1: Select Template
- Choose a template from the dropdown
- Preview thumbnail appears once selected

#### Step 2: Enter Event Name
- Type the event name (e.g., "Model MUN 2025")
- This appears in the email subject and body

#### Step 3: Upload Participant List

1. Click **"Choose CSV/Excel file"**
2. Select a file with the following columns:
   - `name` - Full name of participant
   - `email` - Email address
   - `serial_number` (optional) - Certificate serial like `CSA/EDB/MMUN/25/001`

**Example CSV format:**
```csv
name,email,serial_number
Ritesh Yadav,riteshyvns2005@gmail.com,CSA/EDB/MMUN/25/001
Shlok,shlokmdnl@gmail.com,CSA/EDB/MMUN/25/002
```

3. After upload, a **preview table** shows all participants
4. Verify the data is correct

#### Step 4: Customize Email (Optional)

- **Subject Line:** Defaults to "Certificate - [Event Name]"
- **Email Body:** 
  - Write a custom message
  - Use `{name}` to personalize (e.g., "Dear {name},")
  - Default: "Dear {name},\n\nPlease find your certificate attached.\n\nBest regards,\nEDB Team"

#### Step 5: Send Certificates

1. Click **"Send Certificates"** button
2. Job starts immediately
3. You'll see:
   - Progress bar (e.g., "3/10 sent")
   - Real-time status for each participant
   - ✅ Green checkmark when sent
   - ❌ Red X if failed (with error message)

---

## 3️⃣ Job History Tab

Track all certificate sending jobs.

### Active Job Monitor

When a job is running, you'll see:
- **Progress bar** - Visual percentage complete
- **Participant status table** with:
  - Name
  - Email
  - Serial Number
  - Status (Pending, Sent, Failed)
  - Certificate file path (when generated)
- **Live updates** - Page polls every 2 seconds

### Job List

All past and current jobs appear in reverse chronological order:

- **Job ID** - Unique identifier
- **Event Name** - What event this was for
- **Status** - Pending, Running, Completed, Failed
- **Progress** - "5/10 sent, 0 failed"
- **Created** - Timestamp
- **Actions:**
  - **View Details** - See full participant list
  - **Delete** - Remove completed job

---

## 🎯 Complete Workflow Example

1. **Upload Template**
   - Go to Templates tab → Upload → Choose "certificate_template.jpg"
   - Name it "Model MUN 2025" → Upload

2. **Adjust Positions**
   - Click "Edit Fields"
   - Drag the "Name" marker to center of certificate
   - Drag "Serial Number" to top-right corner
   - Save Changes

3. **Prepare Participant List**
   - Create `participants.xlsx` with name, email, serial_number columns
   - Add all participant data

4. **Send Bulk Certificates**
   - Go to Bulk Send tab
   - Select "Model MUN 2025" template
   - Enter event name
   - Upload `participants.xlsx`
   - Customize email body (optional)
   - Click "Send Certificates"

5. **Monitor Progress**
   - Go to Job History tab
   - Watch real-time progress
   - See each email being sent
   - Verify all participants received certificates

---

## 📧 Email Configuration

The system uses the SMTP settings from `certificate-system/.env`:

```env
SENDER_EMAIL=edbrd028@gmail.com
SENDER_PASSWORD=your_app_password_here
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

**Email contains:**
- Subject: "Certificate - [Event Name]"
- Body: Custom message (or default)
- Attachment: PDF certificate (2-3 MB, optimized for email)

---

## ⚡ Technical Details

### Certificate Generation
- **Format:** PDF (JPEG compressed to 2-3 MB)
- **Text Rendering:** System fonts (Helvetica, Arial, etc.)
- **Alignment:** Left, Center, Right supported
- **Processing Time:** ~3-5 seconds per certificate + email

### Job Processing
- Runs in **background thread** (non-blocking)
- Progress updates in **real-time** via polling
- **Timeout:** 120 seconds per email
- **Retry:** Not implemented (failed jobs need manual re-send)

### Limitations
- **In-memory storage** - Jobs/templates are lost on server restart
- **No authentication on API** - Relies on frontend admin check
- **Single SMTP account** - All emails sent from same address
- **No batch limits** - Can send thousands at once (monitor SMTP limits)

---

## 🐛 Troubleshooting

### "Template not found" error
- Refresh the page to reload templates
- Verify the template was uploaded successfully

### Emails not sending
1. Check FastAPI server logs: `tail -f /tmp/uvicorn.log`
2. Verify `.env` credentials are correct
3. Ensure Gmail App Password is valid (not regular password)
4. Check SMTP quota (Gmail: 500/day for free accounts)

### "Server not connected" error
- PDF file too large (>5 MB) - happens with very high-res templates
- Network timeout - check internet connection
- SMTP server down - try again later

### Certificates missing text
- Font not found - system fonts should work
- Font size too small - increase in editor
- Text color same as background - change color

### Job stuck in "Running" status
- Server crashed - restart FastAPI server
- Background thread failed - check logs
- Refresh Job History tab to update status

---

## 📞 Support

For issues or questions:
- Check server logs: `/tmp/uvicorn.log`
- Review browser console for frontend errors
- Contact: **EDB Technical Team**

---

## 🔐 Security Notes

- Only **admin users** can access this page
- **No API authentication** - ensure production deploys add auth
- **.env credentials** - never commit to Git
- **App passwords** - use Gmail App Passwords, not account password

---

**Last Updated:** February 7, 2026
