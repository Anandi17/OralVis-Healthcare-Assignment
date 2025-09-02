// In index.js (add to the server code from Part 1)

// JWT Secret Key (use a long, random string in production)
const JWT_SECRET = 'your_super_secret_jwt_key';

// Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ token });
  });
});

// Middleware to protect routes and verify role
const authenticateToken = (allowedRoles) => (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Authentication token is required.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    
    req.user = user; // Add user payload to the request object
    
    if (allowedRoles && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }
    
    next();
  });
};
