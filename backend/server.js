const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-builder';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- SERVE FRONTEND ---
// Serve static files from the React app build folder
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/ai', require('./routes/ai'));

// The "catchall" handler: for any request that doesn't match an API route,
// send back React's index.html file.
app.get('{/*path}', (req, res) => {
  // If the request looks like a file (has a dot in the last segment), 
  // and we reached this point, it means express.static didn't find it.
  // Return 404 instead of serving index.html for missing assets.
  const url = req.url.split('?')[0];
  if (url.includes('.') && !url.endsWith('.html')) {
    console.log(`Asset not found: ${url}`);
    return res.status(404).send('Not Found');
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
});

