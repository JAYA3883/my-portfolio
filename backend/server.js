// server.js - Complete working version with MySQL database

const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jaya3883',  // Change to YOUR MySQL password
    database: 'portfolio_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.log('⚠️ Starting server without database - projects will use fallback data');
    } else {
        console.log('✅ Successfully connected to MySQL database!');
    }
});

// API Routes

// Get all projects
app.get('/api/projects', (req, res) => {
    db.query('SELECT * FROM projects ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            // Return fallback projects if database fails
            return res.json({ 
                success: true, 
                projects: [
                    {
                        id: 1,
                        title: "My Portfolio Website",
                        description: "A beautiful personal portfolio website",
                        image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
                        project_url: "#"
                    },
                    {
                        id: 2,
                        title: "Weather App",
                        description: "Check weather in any city",
                        image_url: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500",
                        project_url: "#"
                    },
                    {
                        id: 3,
                        title: "Task Manager",
                        description: "Keep track of your daily tasks",
                        image_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500",
                        project_url: "#"
                    }
                ]
            });
        }
        res.json({ success: true, projects: results });
    });
});

// Save contact message
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill in all fields' 
        });
    }
    
    db.query(
        'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
        [name, email, message],
        (err, result) => {
            if (err) {
                console.error('Error saving message:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Database error' 
                });
            }
            res.json({ success: true, message: 'Message sent successfully!' });
        }
    );
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server is running!`);
    console.log(`📁 Portfolio: http://localhost:${PORT}`);
    console.log(`🔌 API Health: http://localhost:${PORT}/api/health`);
});