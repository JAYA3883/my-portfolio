// routes/contact.js - Handles contact form (stores in memory for demo)

const express = require('express');
const router = express.Router();

// Store messages in memory (will reset on server restart)
let messages = [];

// POST /api/contact - Save a contact message
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill in all fields' 
        });
    }
    
    const newMessage = {
        id: messages.length + 1,
        name,
        email,
        message,
        created_at: new Date()
    };
    
    messages.push(newMessage);
    console.log('New message received:', newMessage);
    
    res.json({ success: true, message: 'Message sent successfully!' });
});

// GET /api/messages - Get all messages (admin only, for testing)
router.get('/', async (req, res) => {
    res.json({ success: true, messages: messages });
});

module.exports = router;