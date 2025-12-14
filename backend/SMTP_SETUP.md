# SMTP Email Integration for Contact Form

## Configuration

The backend is configured with Gmail SMTP to handle contact form submissions from the website.

### Environment Variables (.env)

```env
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=edbrd028@gmail.com
SMTP_PASSWORD=kmkm qapv ktdi vosl
```

## Features

✅ **Email Validation**: Validates email addresses and required fields
✅ **HTML Email Templates**: Beautiful, branded emails with Editorial Board colors
✅ **CORS Configured**: Allows frontend (localhost:5173/5174) to communicate with backend
✅ **Error Handling**: Comprehensive error messages for debugging
✅ **Reply-To Header**: Emails include sender's email for easy replies

## API Endpoint

### POST /api/contact

Sends an email from the contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Regarding Article Submission",
  "message": "I would like to submit an article..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

## How It Works

1. **User fills contact form** on the website
2. **Frontend sends POST request** to `http://localhost:5000/api/contact`
3. **Backend validates** the form data
4. **Nodemailer sends email** via Gmail SMTP
5. **Email arrives at** edbrd028@gmail.com with:
   - Beautiful HTML template
   - Sender's information
   - Reply-To header for easy responses

## Email Template

The email includes:
- **Header**: Orange/gold gradient with Editorial Board branding
- **Content**: Formatted fields (Name, Email, Subject, Message)
- **Footer**: Information about the contact form
- **Reply-To**: Automatically set to sender's email

## Running the Backend

```bash
# Development mode (with hot reload)
cd backend
npm run dev

# Production mode
npm run build
npm start
```

## Testing

1. Make sure backend server is running on port 5000
2. Make sure frontend is running on port 5173 or 5174
3. Navigate to Contact Us page
4. Fill out the form and submit
5. Check the Gmail inbox (edbrd028@gmail.com) for the email

## Troubleshooting

### SMTP Connection Error
- Verify Gmail app password is correct
- Ensure "Less secure app access" is enabled (or use App Password)
- Check firewall settings for port 587

### CORS Error
- Ensure frontend URL matches the CORS origin in server.ts
- Check browser console for specific CORS errors

### Email Not Sending
- Check terminal logs for error messages
- Verify SMTP credentials in .env file
- Test SMTP connection with: `npm run dev` and check for "SMTP server is ready"

## Security Notes

⚠️ **Important**: 
- Never commit the .env file to version control
- The .env file is already in .gitignore
- For production, use environment variables from your hosting provider
- Consider using OAuth2 for Gmail instead of app passwords for better security

## Dependencies

```json
{
  "express": "^4.22.1",
  "nodemailer": "^7.0.11",
  "cors": "^2.8.5",
  "dotenv": "^16.6.1"
}
```
