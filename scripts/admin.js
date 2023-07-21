const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); // Connect to the same SQLite database as the main server; replace with the same file path

const router = express.Router();

// Get all form data
router.get('/forms', (req, res) => {
  db.all('SELECT * FROM formData', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving form data' });
    }
    res.json(rows);
  });
});

// Get a single form data by ID
router.get('/forms/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM formData WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving form data' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Form data not found' });
    }
    res.json(row);
  });
});

// Update a single form data by ID
router.put('/forms/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, message } = req.body;

  db.run('UPDATE formData SET name = ?, email = ?, message = ? WHERE id = ?', [name, email, message, id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error updating form data' });
    }
    res.json({ id, name, email, message });
  });
});

// Delete a single form data by ID
router.delete('/forms/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM formData WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting form data' });
    }
    res.json({ message: 'Form data deleted successfully' });
  });
});

module.exports = router;
