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
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/ai', require('./routes/ai'));

// The "catchall" handler: for any request that doesn't match an API route,
// send back React's index.html file.
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
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

