// In index.js (add to the server code)

const upload = multer({ storage: multer.memoryStorage() });

// Protected upload endpoint for Technicians
app.post('/upload', authenticateToken(['Technician']), upload.single('dentalScan'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { patientName, patientId, scanType, region } = req.body;
    const uploadResult = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
      folder: 'oralvis_scans'
    });
    
    const imageUrl = uploadResult.secure_url;
    const uploadDate = new Date().toISOString();

    db.run(
      `INSERT INTO scans (patientName, patientId, scanType, region, imageUrl, uploadDate) VALUES (?, ?, ?, ?, ?, ?)`,
      [patientName, patientId, scanType, region, imageUrl, uploadDate],
      function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: 'Failed to save scan data.' });
        }
        res.status(201).json({ 
          message: 'Scan uploaded successfully!', 
          scanId: this.lastID, 
          imageUrl: imageUrl 
        });
      }
    );
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Failed to upload image.' });
  }
});
