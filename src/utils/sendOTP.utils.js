import nodemailer from "nodemailer";


export const sendOTPEmail = async (email, otp) => {
  try {
    console.log("EMAIL:", process.env.OTP_SENDING_EMAIL);
console.log("PASS:", process.env.EMAIL_PASS ? "LOADED" : "MISSING");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.OTP_SENDING_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
  from: `"AkhilMed Support" <${process.env.OTP_SENDING_EMAIL}>`,
  to: email,
  subject: "Your AkhilMed Verification Code",
  html: `
  <div style="background:#f4f7fb;padding:40px 0;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08)">
      
      <!-- Header -->
      <div style="background:#2563eb;padding:20px;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:0.5px">
          Akhil<span style="font-weight:300">Med</span>
        </h1>
        <p style="color:#dbeafe;margin:6px 0 0;font-size:13px">
          Secure Health Platform
        </p>
      </div>

      <!-- Body -->
      <div style="padding:28px;color:#111827">
        <p style="font-size:15px;margin:0 0 12px">Hi 👋</p>

        <p style="font-size:15px;line-height:1.6;margin:0 0 20px">
          Use the verification code below to continue signing in to
          <strong>AkhilMed</strong>.
        </p>

        <!-- OTP Box -->
        <div style="background:#f1f5ff;border:1px dashed #2563eb;
          padding:16px;text-align:center;border-radius:8px;margin-bottom:20px">
          <p style="margin:0;font-size:13px;color:#1e40af">Your OTP Code</p>
          <p style="margin:6px 0 0;font-size:28px;font-weight:700;
            letter-spacing:6px;color:#2563eb">
            ${otp}
          </p>
        </div>

        <p style="font-size:13px;color:#374151;margin:0 0 20px">
          ⏱ This code is valid for <strong>5 minutes</strong>.  
          Please do not share it with anyone.
        </p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">

        <p style="font-size:12px;color:#6b7280;line-height:1.5">
          If you did not request this code, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb;padding:14px;text-align:center">
        <p style="margin:0;font-size:11px;color:#9ca3af">
          © ${new Date().getFullYear()} AkhilMed · All rights reserved
        </p>
      </div>

    </div>
  </div>
  `,
});
 

    console.log("✅ OTP sent:", info.messageId);
    return { success: true };

  } catch (err) {
    console.error("❌ OTP send failed:", err.message);
    throw err;
  }
};
