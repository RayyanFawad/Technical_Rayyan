// server.js
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

// ===============================
// Middleware
// ===============================
app.use(bodyParser.json());
app.use(cors());

// ===============================
// Contact Form API Route
// ===============================
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, msg: "⚠️ All fields are required." });
  }

  try {
    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rayyanfawad78@gmail.com",     // your Gmail
        pass: "your-app-password"            // ⚠️ must be Gmail App Password
      }
    });

    // Email Content
    const mailOptions = {
      from: email,
      to: "rayyanfawad78@gmail.com",        // you will receive emails here
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, msg: "✅ Your message has been sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, msg: "❌ Something went wrong. Please try again later." });
  }
});

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
