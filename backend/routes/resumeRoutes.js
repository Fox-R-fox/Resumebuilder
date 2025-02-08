const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Render the resume form
router.get('/', resumeController.getResumeForm);

// Handle form submission
router.post('/generate', resumeController.generateResume);

module.exports = router;