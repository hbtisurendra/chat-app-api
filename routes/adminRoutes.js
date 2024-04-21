const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route for creating a new user
router.post('/users', adminController.createUser);

// Route for editing an existing user
router.put('/users/:id', adminController.editUser);

module.exports = router;
