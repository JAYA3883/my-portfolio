// routes/contact.js
// This handles contact form submissions

const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');

// POST /api/contact - Save a contact message
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    
    // Validate that all fields are filled
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill in all fields' 
        });
    }
    
    try {
        const [result] = await promisePool.query(
            'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;