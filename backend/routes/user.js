const express = require('express');
const router = express.Router();
const { login, signup, } = require('../controllers/users');

// Routes
// router.get('/users', getUsers);
router.post('/signup', signup);
router.post('/login', login);

// router.delete('/users/:id', deleteUser);

module.exports = router;
