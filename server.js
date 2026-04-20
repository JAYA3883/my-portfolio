// server.js - Main entry point for your backend

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import your route files
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

// Create your Express app
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ROUTES
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Simple test route
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!', timestamp: new Date() });
});

// Start server directly (no database check)
app.listen(PORT, () => {
    console.log(`\n🚀 Server is running!`);
    console.log(`📁 Frontend available at: http://localhost:${PORT}`);
    console.log(`🔌 API available at: http://localhost:${PORT}/api/health`);
});