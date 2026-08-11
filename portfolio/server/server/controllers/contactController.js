import nodemailer from "nodemailer";
import validator from "validator";
import Message from "../models/Message.js";

let transporter;

// Le transporteur SMTP n'est créé qu'une seule fois et réutilisé.
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

// @route  POST /api/contact
// @access Public
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Adresse email invalide." });
    }
    if (message.length > 5000) {
      return res.status(400).json({ message: "Le message est trop long." });
    }

    // 1. Sauvegarde en base (permet de retrouver le message même si l'email échoue)
    const saved = await Message.create({ name, email, subject, message });

    // 2. Envoi de l'email via Nodemailer (best-effort — n'échoue pas la requête si SMTP mal configuré)
    try {
      const mailer = getTransporter();
      await mailer.sendMail({
        from: `"Portfolio - Formulaire de contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: `Nouveau message de ${name} (${email}) :\n\n${message}`,
        html: `
          <h3>Nouveau message via le portfolio</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
    } catch (mailError) {
      console.error("⚠️ Échec de l'envoi de l'email (message quand même enregistré) :", mailError.message);
    }

    res.status(201).json({ message: "Message envoyé avec succès.", id: saved._id });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};
