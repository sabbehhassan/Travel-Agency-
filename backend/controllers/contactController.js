import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
 const mailOptions = {
  from: `"${name}" <${process.env.EMAIL_USER}>`,
  replyTo: email,
  to: process.env.EMAIL_USER,
  subject: `New Contact Form Submission: ${subject}`,
  html: `
  <div style="font-family: Arial, sans-serif; background: #f7f9fc; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
      <h2 style="color: #007BFF; text-align: center;">📩 New Contact Form Message</h2>
      <hr style="border: none; border-top: 2px solid #007BFF; margin: 10px 0;">
      <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
      <p style="font-size: 16px;"><strong>Message:</strong></p>
      <div style="background: #f0f4ff; padding: 15px; border-radius: 8px; margin-top: 10px;">
        ${message}
      </div>
      <br>
      <p style="text-align:center; color:#777;">— Silicon Global Tech Website Contact Form —</p>
    </div>
  </div>
  `,
};


    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "❌ Failed to send message. Try again later." });
  }
};
