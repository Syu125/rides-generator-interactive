const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const db = new sqlite3.Database(':memory:'); // Creates an in-memory database; replace with a file path for a persistent database

// Create a table for the form data
db.run('CREATE TABLE IF NOT EXISTS formData (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Save form data to the database
app.post('https://syu125.github.io/rides-generator-interactive/posts', (req, res) => {
  const { name, email, message } = req.body;

  db.run('INSERT INTO formData (name, email, message) VALUES (?, ?, ?)', [name, email, message], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error saving data to the database' });
    }

    res.json({ id: this.lastID, name, email, message });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Include the admin-side routes
const adminRoutes = require('./admin');
app.use('/admin', adminRoutes);


