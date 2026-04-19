// routes/projects.js
// This file handles all requests related to projects

const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');

// GET /api/projects - Fetch all projects
// This is called when your portfolio page loads
router.get('/', async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json({ success: true, projects: rows });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /api/projects - Add a new project
// You can use this later to add projects from an admin panel
router.post('/', async (req, res) => {
    const { title, description, image_url, project_url } = req.body;
    
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }
    
    try {
        const [result] = await promisePool.query(
            'INSERT INTO projects (title, description, image_url, project_url) VALUES (?, ?, ?, ?)',
            [title, description, image_url, project_url]
        );
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;