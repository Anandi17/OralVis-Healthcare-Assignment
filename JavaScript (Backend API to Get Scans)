// In index.js (add to the server code)

// Protected endpoint to retrieve all scans for Dentists
app.get('/scans', authenticateToken(['Dentist']), (req, res) => {
  db.all('SELECT * FROM scans ORDER BY uploadDate DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve scans.' });
    }
    res.status(200).json(rows);
  });
});
