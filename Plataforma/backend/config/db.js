const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, nome TEXT, email TEXT UNIQUE, senha TEXT)");

module.exports = db;