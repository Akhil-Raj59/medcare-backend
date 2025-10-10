import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send OTP email using Resend
 * @param {string} email - Recipient's email address
 * @param {string} otp - One-time password to send
 */
export const sendOTPEmail = async (email, otp) => {
  try {
    const data = await resend.emails.send({
      from: `AkhilMed Support <${process.env.EMAIL_FROM}>`,
      to: [email],
      subject: "Your OTP for AkhilMed Verification",
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
    });

    console.log(`✅ OTP sent successfully to ${email}`);
    console.log("📩 Email ID:", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("❌ Failed to send OTP email");
    console.error("Error details:", error.message || error);
    throw error;
  }
};