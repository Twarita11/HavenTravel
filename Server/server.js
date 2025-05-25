// server/server.js
require('dotenv').config();
const express = require('express');
const sqlite3 = require('./database/database');
const cors = require('cors');
const twilio = require('twilio');
const bcrypt = require('bcrypt'); // Added for password hashing

const app = express();
app.use(express.json());
app.use(cors());

// Twilio Credentials
// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// User Registration (with password hashing)
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, password, phone, city, trustedContact, activities } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    sqlite3.run('INSERT INTO users (username, password, phone, city, trustedContact) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, phone, city, trustedContact], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const userId = this.lastID;
      activities.forEach(async activityName => {
        sqlite3.get('SELECT id FROM activities WHERE name = ?', [activityName], (err, row) => {
          if (err || !row) {
            return res.status(500).json({ error: err ? err.message : 'Activity not found' });
          }
          sqlite3.run('INSERT INTO userActivities (userId, activityId) VALUES (?, ?)', [userId, row.id]);
        });
      });
      res.json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login (with password verification)
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    sqlite3.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const passwordMatch = await bcrypt.compare(password, row.password); // Verify password
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ id: row.id, username: row.username, city: row.city }); // Send only necessary info
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Activities
app.get('/api/activities', (req, res) => {
  sqlite3.all('SELECT name FROM activities', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows.map(row => row.name));
  });
});

// Get Matches
app.get('/api/matches/:userId', (req, res) => {
  const userId = req.params.userId;
  sqlite3.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
    if (err || !user) {
      return res.status(500).json({ error: err ? err.message : 'User not found' });
    }
    sqlite3.all(`
      SELECT u.* FROM users u
      JOIN userActivities ua ON u.id = ua.userId
      WHERE ua.activityId IN (
        SELECT ua2.activityId FROM userActivities ua2 WHERE ua2.userId = ?
      ) AND u.city = ? AND u.id != ?`, [userId, user.city, userId], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });
});

// Panic Button
app.post('/api/safety/panic/:userId', (req, res) => {
  const userId = req.params.userId;
  sqlite3.get('SELECT trustedContact FROM users WHERE id = ?', [userId], (err, user) => {
    if (err || !user) {
      return res.status(500).json({ error: err ? err.message : 'User not found' });
    }
    client.messages.create({
      body: 'Panic alert! User needs help.',
      from: twilioPhoneNumber,
      to: user.trustedContact,
    }).then(() => res.json({ message: 'Panic alert sent' }))
    .catch((error) => res.status(500).json({ error: error.message }));
  });
});

// Location Storage
app.post('/api/safety/location/:userId', (req, res) => {
  const userId = req.params.userId;
  const { latitude, longitude } = req.body;
  sqlite3.run('INSERT INTO locations (userId, latitude, longitude) VALUES (?, ?, ?)', [userId, latitude, longitude], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Location stored' });
  });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});