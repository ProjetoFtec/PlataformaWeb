const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require("../nodemailerConfig");

exports.register = (req, res) => {
    const { nome, email, senha } = req.body;

    User.findByEmail(email, (err, row) => {
        if (row) return res.status(400).json({ msg: "E-mail já cadastrado" });

        bcrypt.hash(senha, 10, (err, hash) => {
            User.create(nome, email, hash, () => res.json({ msg: "Cadastro realizado!" }));
        });
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    User.findByEmail(email, (err, row) => {
        if (!row) return res.status(400).json({ msg: "E-mail não encontrado" });

        bcrypt.compare(senha, row.senha, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ msg: "Senha incorreta" });
            res.json({ msg: "Login bem-sucedido" });
        });
    });
};

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require("../nodemailerConfig");
const db = require("../config/db");

// Função para enviar o código de recuperação de senha
exports.sendResetPasswordCode = (req, res) => {
    const { email } = req.body;

    // Verificar se o usuário existe
    User.findByEmail(email, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ msg: "E-mail não encontrado." });
        }

        // Gerar um código aleatório
        const code = Math.floor(100000 + Math.random() * 900000);  // Código de 6 dígitos
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15); // O código expira em 15 minutos

        // Armazenar o código no banco de dados
        db.run("INSERT INTO password_reset_codes (email, code, expires_at) VALUES (?, ?, ?)", [email, code, expiresAt], (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao salvar o código no banco de dados." });
            }

            // Enviar o código por e-mail
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Código de Recuperação de Senha",
                text: `Seu código de recuperação de senha é: ${code}. Ele expira em 15 minutos.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ msg: "Erro ao enviar o e-mail." });
                }
                res.json({ msg: "Código enviado com sucesso. Verifique seu e-mail." });
            });
        });
    });
};

exports.verifyResetPasswordCode = (req, res) => {
    const { email, code } = req.body;

    // Verificar se o código existe e se ele não expirou
    db.get("SELECT * FROM password_reset_codes WHERE email = ? AND code = ? AND expires_at > ?", [email, code, new Date()], (err, row) => {
        if (err || !row) {
            return res.status(400).json({ msg: "Código inválido ou expirado." });
        }
        res.json({ msg: "Código válido!" });
    });
};

exports.updatePassword = (req, res) => {
    const { email, newPassword } = req.body;

    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ msg: "Erro ao criptografar a senha." });
        }

        // Atualizar a senha no banco de dados
        db.run("UPDATE users SET senha = ? WHERE email = ?", [hash, email], (err) => {
            if (err) {
                return res.status(500).json({ msg: "Erro ao atualizar a senha." });
            }

            // Remover o código de recuperação de senha após a atualização
            db.run("DELETE FROM password_reset_codes WHERE email = ?", [email], (err) => {
                if (err) {
                    return res.status(500).json({ msg: "Erro ao remover o código de recuperação." });
                }

                res.json({ msg: "Senha atualizada com sucesso!" });
            });
        });
    });
};