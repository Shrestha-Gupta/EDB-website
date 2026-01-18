import nodemailer from 'nodemailer';

// Create transporter instance
const getTransporter = () => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpEmail = process.env.SMTP_EMAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpHost || !smtpPort || !smtpEmail || !smtpPassword) {
    throw new Error('SMTP configuration is missing. Please check your environment variables.');
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: false,
    auth: {
      user: smtpEmail,
      pass: smtpPassword,
    },
  });
};

interface MunCountryAssignmentEmailData {
  recipientEmail: string;
  recipientName: string;
  country: string;
  committee: string;
}

/**
 * Send MUN country assignment notification email to participant
 */
export const sendMunCountryAssignmentEmail = async (data: MunCountryAssignmentEmailData): Promise<boolean> => {
  const { recipientEmail, recipientName, country, committee } = data;
  
  try {
    const transporter = getTransporter();
    const smtpEmail = process.env.SMTP_EMAIL;

    const mailOptions = {
      from: `"The Editorial Board - MUN" <${smtpEmail}>`,
      to: recipientEmail,
      subject: `MUN Country Assignment: You have been assigned ${country}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 650px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #3182ce 100%); color: white; padding: 50px 30px; text-align: center; }
              .header h1 { margin: 0; font-size: 32px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
              .header p { margin: 15px 0 0 0; opacity: 0.95; font-size: 18px; }
              .flag-icon { font-size: 64px; margin-bottom: 15px; }
              .content { background: #ffffff; padding: 40px 30px; }
              .greeting { font-size: 20px; color: #1a365d; margin-bottom: 24px; font-weight: 600; }
              .assignment-box { background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 30px; border-radius: 12px; margin: 24px 0; border-left: 5px solid #3182ce; box-shadow: 0 2px 10px rgba(49,130,206,0.1); }
              .assignment-title { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #2c5282; font-weight: 700; margin-bottom: 12px; }
              .country-name { font-size: 36px; font-weight: 800; color: #1a365d; margin: 10px 0; }
              .committee-name { font-size: 18px; color: #4a5568; margin-top: 15px; }
              .committee-badge { display: inline-block; background: #3182ce; color: white; padding: 8px 20px; border-radius: 25px; font-weight: 600; font-size: 14px; margin-top: 5px; }
              .info-section { background: #f7fafc; padding: 25px; border-radius: 10px; margin: 24px 0; }
              .info-section h3 { color: #2c5282; margin-top: 0; font-size: 18px; }
              .info-section ul { padding-left: 20px; margin: 15px 0; }
              .info-section li { margin: 10px 0; color: #4a5568; }
              .highlight { color: #3182ce; font-weight: 600; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%); color: white; padding: 16px 40px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 20px 0; box-shadow: 0 4px 15px rgba(49,130,206,0.3); transition: transform 0.2s; }
              .cta-button:hover { transform: translateY(-2px); }
              .alert-box { background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 25px; border-radius: 12px; margin: 24px 0; border-left: 5px solid #e53e3e; box-shadow: 0 2px 10px rgba(229,62,62,0.1); }
              .alert-box h3 { color: #c53030; margin: 0 0 12px 0; font-size: 18px; }
              .alert-box p { color: #742a2a; margin: 0; line-height: 1.8; }
              .footer { background: #1a365d; padding: 30px; text-align: center; color: white; }
              .footer p { margin: 8px 0; font-size: 14px; color: rgba(255,255,255,0.9); }
              .footer a { color: #90cdf4; text-decoration: none; }
              .divider { height: 2px; background: linear-gradient(90deg, transparent, #3182ce, transparent); margin: 30px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="flag-icon">🌍</div>
                <h1>Country Assigned!</h1>
                <p>Model United Nations - MMMUT</p>
              </div>
              <div class="content">
                <p class="greeting">Dear ${recipientName},</p>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.8;">
                  Congratulations! We are thrilled to inform you that you have been officially assigned a country for the upcoming <strong>Model United Nations (MUN)</strong> conference organized by The Editorial Board, MMMUT Gorakhpur.
                </p>

                <div class="assignment-box">
                  <div class="assignment-title">Your Assigned Country</div>
                  <div class="country-name">🏳️ ${country}</div>
                  <div class="committee-name">
                    Committee: <span class="committee-badge">${committee}</span>
                  </div>
                </div>

                <div class="alert-box">
                  <h3>📄 Important: Position Paper Submission Required</h3>
                  <p>
                    As a delegate representing <strong>${country}</strong>, you are <strong>required to submit a Position Paper</strong> before the conference. 
                    Your position paper should outline ${country}'s stance on the agenda topics and your proposed solutions.
                  </p>
                  <p style="margin-top: 12px;">
                    <strong>📌 How to submit:</strong> Log in to your MUN dashboard and upload your position paper in PDF format before the deadline.
                  </p>
                </div>

                <div class="info-section">
                  <h3>📋 Next Steps</h3>
                  <ul>
                    <li><strong>Research your country:</strong> Familiarize yourself with ${country}'s policies, positions, and stance on the committee's agenda.</li>
                    <li><strong>Prepare your Position Paper:</strong> Draft and submit your position paper through the MUN dashboard.</li>
                    <li><strong>Review the Rules of Procedure:</strong> Ensure you understand the MUN rules and parliamentary procedures.</li>
                    <li><strong>Stay Updated:</strong> Check your dashboard regularly for updates, announcements, and important deadlines.</li>
                  </ul>
                </div>

                <div class="divider"></div>

                <p style="text-align: center; color: #4a5568; font-size: 15px;">
                  Access your MUN dashboard to view more details and submit your position paper:
                </p>

                <div style="text-align: center;">
                  <a href="https://www.theeditorialboard.in/mun" class="cta-button">
                    📤 Submit Position Paper
                  </a>
                </div>

                <p style="color: #4a5568; margin-top: 30px; line-height: 1.8;">
                  We are excited to have you represent <strong>${country}</strong> at this prestigious event. Your participation contributes to meaningful discussions on global issues.
                </p>

                <p style="color: #4a5568; margin-top: 20px;">
                  If you have any questions or concerns, please don't hesitate to reach out to us at 
                  <a href="mailto:literaryedb@mmmut.ac.in" style="color: #3182ce;">literaryedb@mmmut.ac.in</a>
                </p>

                <p style="margin-top: 30px; color: #4a5568;">
                  Best regards,<br>
                  <strong style="color: #1a365d;">The Editorial Board</strong><br>
                  <span style="color: #718096;">MUN Organizing Committee</span><br>
                  MMMUT Gorakhpur
                </p>
              </div>
              <div class="footer">
                <p><strong>The Editorial Board | Model United Nations</strong></p>
                <p>MMMUT Gorakhpur</p>
                <p>📧 <a href="mailto:literaryedb@mmmut.ac.in">literaryedb@mmmut.ac.in</a> | 🌐 <a href="https://www.theeditorialboard.in">www.theeditorialboard.in</a></p>
                <p style="margin-top: 16px; font-size: 12px; color: rgba(255,255,255,0.7);">
                  This is an automated notification. Please do not reply directly to this email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`MUN country assignment email sent to ${recipientEmail}:`, result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send MUN country assignment email:', error);
    return false;
  }
};

interface MunNewspaperAssignmentEmailData {
  recipientEmail: string;
  recipientName: string;
  newspaper: string;
}

/**
 * Send MUN newspaper assignment notification email to IP participant
 */
export const sendMunNewspaperAssignmentEmail = async (data: MunNewspaperAssignmentEmailData): Promise<boolean> => {
  const { recipientEmail, recipientName, newspaper } = data;
  
  try {
    const transporter = getTransporter();
    const smtpEmail = process.env.SMTP_EMAIL;

    const mailOptions = {
      from: `"The Editorial Board - MUN" <${smtpEmail}>`,
      to: recipientEmail,
      subject: `MUN International Press Assignment: You have been assigned to ${newspaper}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 650px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #a855f7 100%); color: white; padding: 50px 30px; text-align: center; }
              .header h1 { margin: 0; font-size: 32px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
              .header p { margin: 15px 0 0 0; opacity: 0.95; font-size: 18px; }
              .press-icon { font-size: 64px; margin-bottom: 15px; }
              .content { background: #ffffff; padding: 40px 30px; }
              .greeting { font-size: 20px; color: #581c87; margin-bottom: 24px; font-weight: 600; }
              .assignment-box { background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%); padding: 30px; border-radius: 12px; margin: 24px 0; border-left: 5px solid #7c3aed; box-shadow: 0 2px 10px rgba(124,58,237,0.1); }
              .assignment-title { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #6b21a8; font-weight: 700; margin-bottom: 12px; }
              .newspaper-name { font-size: 36px; font-weight: 800; color: #581c87; margin: 10px 0; }
              .committee-name { font-size: 18px; color: #4a5568; margin-top: 15px; }
              .committee-badge { display: inline-block; background: #7c3aed; color: white; padding: 8px 20px; border-radius: 25px; font-weight: 600; font-size: 14px; margin-top: 5px; }
              .info-section { background: #f7fafc; padding: 25px; border-radius: 10px; margin: 24px 0; }
              .info-section h3 { color: #6b21a8; margin-top: 0; font-size: 18px; }
              .info-section ul { padding-left: 20px; margin: 15px 0; }
              .info-section li { margin: 10px 0; color: #4a5568; }
              .highlight { color: #7c3aed; font-weight: 600; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #6b21a8 100%); color: white; padding: 16px 40px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 20px 0; box-shadow: 0 4px 15px rgba(124,58,237,0.3); transition: transform 0.2s; }
              .cta-button:hover { transform: translateY(-2px); }
              .role-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 12px; margin: 24px 0; border-left: 5px solid #f59e0b; box-shadow: 0 2px 10px rgba(245,158,11,0.1); }
              .role-box h3 { color: #92400e; margin: 0 0 12px 0; font-size: 18px; }
              .role-box p { color: #78350f; margin: 0; line-height: 1.8; }
              .footer { background: #581c87; padding: 30px; text-align: center; color: white; }
              .footer p { margin: 8px 0; font-size: 14px; color: rgba(255,255,255,0.9); }
              .footer a { color: #e9d5ff; text-decoration: none; }
              .divider { height: 2px; background: linear-gradient(90deg, transparent, #7c3aed, transparent); margin: 30px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="press-icon">📰</div>
                <h1>Press Assignment!</h1>
                <p>Model United Nations - MMMUT</p>
              </div>
              <div class="content">
                <p class="greeting">Dear ${recipientName},</p>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.8;">
                  Congratulations! We are thrilled to inform you that you have been officially assigned to a newspaper company for the <strong>International Press (IP)</strong> at the upcoming Model United Nations (MUN) conference organized by The Editorial Board, MMMUT Gorakhpur.
                </p>

                <div class="assignment-box">
                  <div class="assignment-title">Your Assigned Newspaper</div>
                  <div class="newspaper-name">📰 ${newspaper}</div>
                  <div class="committee-name">
                    Committee: <span class="committee-badge">International Press</span>
                  </div>
                </div>

                <div class="role-box">
                  <h3>📝 Your Role as Press Reporter</h3>
                  <p>
                    As a member of the <strong>International Press</strong> representing <strong>${newspaper}</strong>, you will be responsible for covering the proceedings of the MUN committees. Your role includes questioning delegates, seeking clarifications, writing articles, and reporting on the debates and resolutions.
                  </p>
                </div>

                <div class="info-section">
                  <h3>📋 Preparation Guidelines</h3>
                  <ul>
                    <li><strong>Research your newspaper:</strong> Familiarize yourself with ${newspaper}'s editorial style, political stance, and reporting approach.</li>
                    <li><strong>Understand the agenda:</strong> Study the committee agendas so you can ask relevant and probing questions.</li>
                    <li><strong>Prepare interview questions:</strong> Draft thoughtful questions to ask delegates during press conferences.</li>
                    <li><strong>Review press procedures:</strong> Understand how press interactions work during MUN sessions.</li>
                    <li><strong>Stay Updated:</strong> Check your dashboard regularly for updates, announcements, and important information.</li>
                  </ul>
                </div>

                <div class="divider"></div>

                <p style="text-align: center; color: #4a5568; font-size: 15px;">
                  Access your MUN dashboard to view more details:
                </p>

                <div style="text-align: center;">
                  <a href="https://www.theeditorialboard.in/mun" class="cta-button">
                    🎯 Go to Dashboard
                  </a>
                </div>

                <p style="color: #4a5568; margin-top: 30px; line-height: 1.8;">
                  We are excited to have you as part of the <strong>International Press</strong> representing <strong>${newspaper}</strong>. Your coverage will bring the proceedings to life for everyone following the conference!
                </p>

                <p style="color: #4a5568; margin-top: 20px;">
                  If you have any questions or concerns, please don't hesitate to reach out to us at 
                  <a href="mailto:literaryedb@mmmut.ac.in" style="color: #7c3aed;">literaryedb@mmmut.ac.in</a>
                </p>

                <p style="margin-top: 30px; color: #4a5568;">
                  Best regards,<br>
                  <strong style="color: #581c87;">The Editorial Board</strong><br>
                  <span style="color: #718096;">MUN Organizing Committee</span><br>
                  MMMUT Gorakhpur
                </p>
              </div>
              <div class="footer">
                <p><strong>The Editorial Board | Model United Nations</strong></p>
                <p>MMMUT Gorakhpur</p>
                <p>📧 <a href="mailto:literaryedb@mmmut.ac.in">literaryedb@mmmut.ac.in</a> | 🌐 <a href="https://www.theeditorialboard.in">www.theeditorialboard.in</a></p>
                <p style="margin-top: 16px; font-size: 12px; color: rgba(255,255,255,0.7);">
                  This is an automated notification. Please do not reply directly to this email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`MUN newspaper assignment email sent to ${recipientEmail}:`, result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send MUN newspaper assignment email:', error);
    return false;
  }
};

export default {
  sendMunCountryAssignmentEmail,
  sendMunNewspaperAssignmentEmail,
};
