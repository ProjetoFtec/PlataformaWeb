const nodemailer = require("nodemailer");
require("dotenv").config();

// Configuração do Nodemailer para envio de e-mails via Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Seu email (ex: seuemail@gmail.com)
        pass: process.env.EMAIL_PASS, // Sua senha de email
    },
});

module.exports = transporter;