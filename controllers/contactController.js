import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";
import { generateEmailTemplate } from "../public/templates/emailTemplate.js";

export const handleContactForm = async (req, res) => {
  try {
    const {
      ask__first__name,
      ask__last__name,
      ask__registration__email,
      ask__number,
      ask__subject,
      ask_message,
    } = req.body;

    const newContact = await Contact.create({
      firstName: ask__first__name,
      lastName: ask__last__name,
      email: ask__registration__email,
      phone: ask__number,
      subject: ask__subject,
      message: ask_message,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format date and time
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const mailOptions = {
      from: {
        name: `${ask__first__name} ${ask__last__name}`,
        address: ask__registration__email,
      },
      replyTo: ask__registration__email,
      to: process.env.OWNER_EMAIL,
      subject: `📬 New Inquiry from ${ask__first__name} ${ask__last__name}: ${ask__subject}`,
      text: `
📋 New Contact Inquiry Details
━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Sender Information:
• Name: ${ask__first__name} ${ask__last__name}
• Email: ${ask__registration__email}
• Phone: ${ask__number}

📝 Message Details:
• Subject: ${ask__subject}

💬 Message Content:
${ask_message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Received: ${currentDate}

Note: To respond to this inquiry, please reply directly to ${ask__registration__email}

Best regards,
Your Contact Form System
`,
      html: generateEmailTemplate({
        ask__first__name,
        ask__last__name,
        ask__registration__email,
        ask__number,
        ask__subject,
        ask_message,
        currentDate,
      }),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error in handleContactForm:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
