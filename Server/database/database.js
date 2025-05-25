// server/database/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    phone TEXT,
    city TEXT,
    activity TEXT
  )`);
});

module.exports = db;