import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Brevo SMTP connection failed:", error);
  } else {
    console.log("✅ Connected to Brevo SMTP successfully");
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
    });
    console.log(`📩 Email sent to ${to}`);
  } catch (error) {
    console.error("Mailer error:", error);
  }
};
