const express = require('express');
const router = express.Router();
const { login, signup, deleteUser } = require('../controllers/users'); // Ensure deleteUser is imported

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

// Route for deleting a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;
