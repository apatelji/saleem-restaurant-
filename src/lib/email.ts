import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "derek.schaden79@ethereal.email",
    pass: process.env.EMAIL_PASS || "r41vX3KqfM7GkEaX5p", // Mock ethereal credentials
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Saleem Restaurant" <no-reply@saleemrestaurant.com>',
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("Preview URL: %s", previewUrl);
    return previewUrl || true;
  } catch (error) {
    console.error("Error sending email", error);
    return false;
  }
};
