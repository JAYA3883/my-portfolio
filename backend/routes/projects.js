// routes/projects.js - Returns hardcoded projects (no database)

const express = require('express');
const router = express.Router();

// Hardcoded projects for Render deployment
const projects = [
    {
        id: 1,
        title: "My Portfolio Website",
        description: "A beautiful personal portfolio website built with Node.js, Express, and modern HTML/CSS.",
        image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
        project_url: "https://github.com/JAYA3883/my-portfolio"
    },
    {
        id: 2,
        title: "Weather App",
        description: "Check weather in any city using OpenWeatherMap API.",
        image_url: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500",
        project_url: "https://github.com/JAYA3883/weather-app"
    },
    {
        id: 3,
        title: "Task Manager",
        description: "Keep track of your daily tasks with this simple app.",
        image_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500",
        project_url: "https://github.com/JAYA3883/task-manager"
    }
];

// GET /api/projects - Return all projects
router.get('/', async (req, res) => {
    res.json({ success: true, projects: projects });
});

// POST /api/projects - Add new project (for future use)
router.post('/', async (req, res) => {
    const { title, description, image_url, project_url } = req.body;
    
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }
    
    const newProject = {
        id: projects.length + 1,
        title,
        description,
        image_url,
        project_url,
        created_at: new Date()
    };
    
    projects.push(newProject);
    res.json({ success: true, id: newProject.id });
});

module.exports = router;