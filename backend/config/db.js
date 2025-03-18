const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

// Tabela para armazenar usuários
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, nome TEXT, email TEXT UNIQUE, senha TEXT)");

// Tabela para armazenar códigos de recuperação de senha
db.run("CREATE TABLE IF NOT EXISTS password_reset_codes (id INTEGER PRIMARY KEY, email TEXT, code TEXT, expires_at DATETIME)");

module.exports = db;