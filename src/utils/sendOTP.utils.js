import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create reusable transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.EMAIL_SERVICE_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVICE_USER,
    pass: process.env.EMAIL_SERVICE_PASS,
  },
  // Additional options for better compatibility
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

// Verify transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Brevo SMTP Configuration Error:", error);
  } else {
    console.log("✅ Brevo SMTP Server is ready to send emails");
  }
});

/**
 * Send OTP email to user for verification.
 * @param {string} email - Recipient's email address
 * @param {string} otp - One-time password to send
 */
export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"AkhilMed Support" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Your OTP for AkhilMed Verification",
    text: `Your OTP for verification is: ${otp}. It will expire in 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb; border-radius: 8px;">
        <h2 style="color: #2563eb;">AkhilMed Verification</h2>
        <p style="font-size: 16px;">Dear User,</p>
        <p style="font-size: 16px;">Your OTP for verification is:</p>
        <h1 style="color: #2563eb; letter-spacing: 2px;">${otp}</h1>
        <p style="font-size: 14px; color: #555;">This OTP will expire in 5 minutes.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #777;">If you didn't request this, you can safely ignore this email.</p>
        <p style="font-size: 12px; color: #777;">– Team AkhilMed</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent successfully to ${email}`);
    console.log("📩 Message ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Failed to send OTP email");
    console.error("Error details:", error.message || error);
    console.error("Full error:", error);
    
    // More detailed error information
    if (error.code === 'EAUTH') {
      console.error("🔑 Authentication failed. Check your Brevo SMTP credentials!");
    }
    
    throw error; // Re-throw to handle in the calling function
  }
};