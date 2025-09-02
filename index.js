// index.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

// SQLite Database Setup
const db = new sqlite3.Database('./oralvis.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
  
  // Create tables if they don't exist
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientName TEXT NOT NULL,
      patientId TEXT NOT NULL,
      scanType TEXT NOT NULL,
      region TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      uploadDate TEXT NOT NULL
    )`);

    // Insert dummy users for testing
    const hashedPassword = bcrypt.hashSync('password123', 10);
    db.run(`INSERT OR IGNORE INTO users (email, password, role) VALUES ('technician@oralvis.com', ?, 'Technician')`, [hashedPassword]);
    db.run(`INSERT OR IGNORE INTO users (email, password, role) VALUES ('dentist@oralvis.com', ?, 'Dentist')`, [hashedPassword]);
    
  });
});

// A simple root endpoint to confirm the server is running
app.get('/', (req, res) => {
  res.send('OralVis Healthcare API is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
