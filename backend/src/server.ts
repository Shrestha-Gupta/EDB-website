import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads (in memory, optional)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, PNG, GIF) and PDFs are allowed'));
    }
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://www.theeditorialboard.in', 'https://www.theeditorialboard.in/'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the EDB Backend Server!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Contact form endpoint
app.post('/api/contact', upload.single('image'), async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email address' 
      });
    }

    // Build attachments array if file is provided
    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype
      });
    }

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // Send to your own email
      replyTo: email, // Allow replying to sender
      subject: `Contact Form: ${subject}`,
      attachments: attachments,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FF8C42 0%, #FFD700 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #FF8C42; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
              .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #FF8C42; word-break: break-word; }
              .attachment-info { margin-top: 20px; padding: 15px; background: #fff3cd; border-left: 3px solid #FFD700; border-radius: 4px; }
              .attachment-info p { margin: 5px 0; font-size: 14px; color: #856404; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 12px; color: #666; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">📧 New Message Received</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">The Editorial Board - MMMUT</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}" style="color: #FF8C42; text-decoration: none;">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                ${attachments.length > 0 ? `
                <div class="attachment-info">
                  <p><strong>📎 Attachment Included:</strong></p>
                  <p>${attachments[0].filename}</p>
                </div>
                ` : ''}
                <div class="footer">
                  <p>This email was sent from the Editorial Board contact form</p>
                  <p>To reply, simply respond to this email or contact the sender directly</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Start server if not running in Vercel (or if run directly)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
