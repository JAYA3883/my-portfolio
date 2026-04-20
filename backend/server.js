// server.js
// This is the MAIN entry point for your backend server

const express = require('express');
const cors = require('cors');
const path = require('path');
const { testConnection } = require('./config/db');

// Import your route files
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

// Create your Express app
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE - these are functions that process requests before they reach your routes
app.use(cors());                    // Allows frontend to call backend
app.use(express.json());           // Automatically parses JSON data from requests
app.use(express.static('public')); // Serves your frontend files

// ROUTES - define what happens when someone visits different URLs
app.use('/api/projects', projectRoutes);   // All project routes start with /api/projects
app.use('/api/contact', contactRoutes);    // All contact routes start with /api/contact

// Simple test route to check if server is running
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!', timestamp: new Date() });
});

// Start server without database requirement
app.listen(PORT, () => {
    console.log(`\n🚀 Server is running!`);
    console.log(`📁 Frontend available at: http://localhost:${PORT}`);
});

startServer();