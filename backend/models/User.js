const db = require("../config/db");

class User {
    static findByEmail(email, callback) {
        db.get("SELECT * FROM users WHERE email = ?", [email], callback);
    }

    static create(nome, email, senha, callback) {
        db.run("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha], callback);
    }
}

module.exports = User;