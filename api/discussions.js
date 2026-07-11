// This file lives at:  api/discussions.js  (in the ROOT of your Vercel project,
// same level as package.json — NOT inside src/)
//
// Vercel automatically turns any file in /api into a live endpoint.
// This one becomes:  https://your-site.vercel.app/api/discussions
//
// Install nodemailer first:
//   npm install nodemailer

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, subject, message } = req.body ?? {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: "name, email, and message are required" });
    }

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.RECEIVING_EMAIL || process.env.GMAIL_USER,
            replyTo: email,
            subject: subject ? `New discussion: ${subject}` : "New discussion from your portfolio",
            text: `From: ${name} <${email}>\n\n${message}`,
            html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${subject ? `<p><strong>Topic:</strong> ${subject}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
        });

        return res.status(201).json({ status: "created" });
    } catch (err) {
        console.error("Email send failed:", err);
        return res.status(500).json({ error: "Failed to send message" });
    }
}