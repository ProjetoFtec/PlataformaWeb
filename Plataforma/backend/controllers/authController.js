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