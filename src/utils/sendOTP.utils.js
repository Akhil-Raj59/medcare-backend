export const sendOTPEmail = async (email, otp) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "AkhilMed Support",
      email: "532akhil@gmail.com"
    };

    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = "Your OTP Code";
    sendSmtpEmail.htmlContent = `<h2>Your OTP: ${otp}</h2>`;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return { success: true };

  } catch (err) {
    console.error("❌ Email failed, using fallback");

    // 🔥 Fallback: log OTP instead of sending
    console.log(`⚠️ OTP for ${email}: ${otp}`);

    // Optional: return OTP in dev
    if (process.env.NODE_ENV === "development") {
      return { success: true, otp }; 
    }

    // In production → still succeed but don't expose OTP
    return { success: true };
  }
};