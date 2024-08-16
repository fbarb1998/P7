const express = require('express');
const router = express.Router();
const { getUsers, signup, deleteUser } = require('../controllers/users');

// Routes
// router.get('/users', getUsers);
router.post('/signup', signup);
// router.delete('/users/:id', deleteUser);

module.exports = router;
