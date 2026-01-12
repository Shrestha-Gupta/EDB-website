import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import cookieParser from "cookie-parser";
import fs from 'fs';

// Load environment variables FIRST before any other imports that need them
const envLocalPath = path.resolve(__dirname, '../.env.local');
const envPath = path.resolve(__dirname, '../.env');

console.log(`Attempting to load env from: ${envLocalPath}`);
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
  console.log('Loaded .env.local');
} else {
  console.log('.env.local not found');
}

console.log(`Attempting to load env from: ${envPath}`);
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('Loaded .env');
} else {
  console.log('.env not found');
}

// Import routes AFTER dotenv is configured
import authRoutes from "./routes/auth";
import munRoutes from "./routes/mun";
import arunodayRoutes from "./routes/arunoday";
import eventsRoutes from "./routes/events";

// Import database connection
import connectDB from "./config/database";

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
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Configure nodemailer transport
// Configure nodemailer transport
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpEmail = process.env.SMTP_EMAIL;
const smtpPassword = process.env.SMTP_PASSWORD;

// Debug log to show partial password for verification
if (smtpPassword) {
  console.log(`SMTP Config Loaded: Host=${smtpHost}, Port=${smtpPort}, Email=${smtpEmail}, Pwd=${smtpPassword.substring(0, 3)}***`);
}

if (!smtpHost || !smtpPort || !smtpEmail || !smtpPassword) {
  const missing = [];
  if (!smtpHost) missing.push("SMTP_HOST");
  if (!smtpPort) missing.push("SMTP_PORT");
  if (!smtpEmail) missing.push("SMTP_EMAIL");
  if (!smtpPassword) missing.push("SMTP_PASSWORD");
  
  const errorMsg = `CRITICAL ERROR: Missing SMTP Environment Variables: ${missing.join(", ")}. Please check your .env or .env.local file. Current PWD: ${process.cwd()}`;
  console.error(errorMsg);
  throw new Error(errorMsg);
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: Number(smtpPort),
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpEmail,
    pass: smtpPassword,
  },
});

// Verify transporter configuration
try {
  transporter.verify((error, success) => {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP server is ready to send emails');
    }
  });
} catch (err) {
  console.error("Transporter verification crashed", err);
}

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the EDB Backend Server!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.get("/api/env-check", (req, res) => {
  res.json({
    smtpHostConfigured: !!process.env.SMTP_HOST,
    smtpPortConfigured: !!process.env.SMTP_PORT,
    smtpEmailConfigured: !!process.env.SMTP_EMAIL,
    smtpPasswordConfigured: !!process.env.SMTP_PASSWORD,
    smtpHostValue: process.env.SMTP_HOST || "MISSING",
  });
});

// Auth and MUN routes
app.use("/api/auth", authRoutes);
app.use("/api/mun", munRoutes);
app.use("/api/arunoday", arunodayRoutes);
app.use("/api/events", eventsRoutes);

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

    // ADMIN NOTIFICATION EMAIL (to Editorial Board)
    const adminMailOptions = {
      from: `"${name}" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      attachments: attachments,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 650px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #FF8C42 0%, #FFD700 100%); color: white; padding: 40px 30px; text-align: center; }
              .logo { max-width: 180px; height: auto; margin-bottom: 20px; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
              .header p { margin: 10px 0 0 0; opacity: 0.95; font-size: 16px; }
              .content { background: #ffffff; padding: 40px 30px; }
              .field { margin-bottom: 24px; }
              .label { font-weight: 700; color: #FF8C42; text-transform: uppercase; font-size: 11px; letter-spacing: 1.5px; margin-bottom: 8px; }
              .value { padding: 14px; background: #f9f9f9; border-left: 4px solid #FF8C42; word-break: break-word; font-size: 15px; color: #333; border-radius: 4px; }
              .value a { color: #FF8C42; text-decoration: none; font-weight: 600; }
              .attachment-info { margin-top: 24px; padding: 18px; background: #fff8e1; border-left: 4px solid #FFD700; border-radius: 6px; }
              .attachment-info p { margin: 5px 0; font-size: 14px; color: #856404; }
              .footer { background: #f9f9f9; padding: 24px 30px; border-top: 3px solid #FF8C42; text-align: center; }
              .footer p { margin: 8px 0; font-size: 13px; color: #666; }
              .badge { display: inline-block; background: rgba(255,255,255,0.3); padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 New Contact Form Submission</h1>
                <p class="badge">The Editorial Board - MMMUT</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
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
              </div>
              <div class="footer">
                <p><strong>This email was sent from The Editorial Board contact form</strong></p>
                <p>To reply, simply respond to this email or contact the sender directly at ${email}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // CONFIRMATION EMAIL (to the sender)
    const confirmationMailOptions = {
      from: `"The Editorial Board" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `Thank you for contacting The Editorial Board - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 650px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #FF8C42 0%, #FFD700 100%); color: white; padding: 40px 30px; text-align: center; }
              .logo { max-width: 180px; height: auto; margin-bottom: 20px; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
              .header p { margin: 10px 0 0 0; opacity: 0.95; font-size: 16px; }
              .content { background: #ffffff; padding: 40px 30px; }
              .greeting { font-size: 18px; color: #333; margin-bottom: 20px; font-weight: 600; }
              .message-box { background: #f9f9f9; padding: 20px; border-left: 4px solid #FF8C42; border-radius: 6px; margin: 24px 0; }
              .message-box p { margin: 8px 0; line-height: 1.8; }
              .highlight { color: #FF8C42; font-weight: 600; }
              .footer { background: #f9f9f9; padding: 24px 30px; border-top: 3px solid #FF8C42; text-align: center; }
              .footer p { margin: 8px 0; font-size: 13px; color: #666; }
              .social-links { margin-top: 16px; }
              .social-links a { display: inline-block; margin: 0 8px; color: #FF8C42; text-decoration: none; font-size: 13px; }
              .checkmark { font-size: 48px; color: #4CAF50; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Message Received Successfully</h1>
                <p>The Editorial Board - MMMUT</p>
              </div>
              <div class="content">
                <p class="greeting">Dear ${name},</p>
                
                <div class="message-box">
                  <p>Thank you for reaching out to <span class="highlight">The Editorial Board</span>!</p>
                  <p>We have successfully received your message regarding "<strong>${subject}</strong>" and our team will review it shortly.</p>
                  <p>We typically respond within <strong>24-48 hours</strong>. If your inquiry is urgent, please feel free to reach out to us directly at <a href="mailto:literaryedb@mmmut.ac.in" style="color: #FF8C42;">literaryedb@mmmut.ac.in</a>.</p>
                </div>

                <p style="margin-top: 24px; color: #666; font-size: 14px;"><strong>Your Message Summary:</strong></p>
                <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; margin-top: 12px;">
                  <p style="margin: 4px 0; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 4px 0; font-size: 14px;"><strong>Message:</strong> ${message.substring(0, 150)}${message.length > 150 ? '...' : ''}</p>
                </div>

                <p style="margin-top: 28px; color: #666; line-height: 1.8;">
                  We appreciate your interest and look forward to connecting with you.
                </p>
                
                <p style="margin-top: 20px; color: #666;">
                  Best regards,<br>
                  <strong style="color: #FF8C42;">The Editorial Board Team</strong><br>
                  MMMUT Gorakhpur
                </p>
              </div>
              <div class="footer">
                <p><strong>The Editorial Board</strong> | MMMUT Gorakhpur</p>
                <p>📧 literaryedb@mmmut.ac.in | 🌐 <a href="https://www.theeditorialboard.in" style="color: #FF8C42;">www.theeditorialboard.in</a></p>
                <p style="margin-top: 16px; font-size: 12px; color: #999;">
                  This is an automated confirmation email. Please do not reply to this message.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send both emails
    try {
      console.log(`Sending admin notification to: ${process.env.SMTP_EMAIL}`);
      const adminResult = await transporter.sendMail(adminMailOptions);
      console.log('Admin email sent successfully:', adminResult.messageId);
    } catch (adminError) {
      console.error('Failed to send admin notification:', adminError);
      throw new Error('Failed to send admin notification');
    }

    try {
      console.log(`Sending confirmation email to: ${email}`);
      const confirmationResult = await transporter.sendMail(confirmationMailOptions);
      console.log('Confirmation email sent successfully:', confirmationResult.messageId);
    } catch (confirmError) {
      console.error('Failed to send confirmation email:', confirmError);
      // Don't throw here - admin email already sent, just log the error
      console.warn('WARNING: Confirmation email failed but admin email was sent');
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! Check your email for confirmation.' 
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
