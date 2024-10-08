const bcrypt = require('bcryptjs'); // Use bcryptjs for password hashing
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted' }); // Use JSON response
    } else {
      res.status(404).json({ error: 'User not found' }); // Return JSON for consistency
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Signup function
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User added successfully!', user });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: error.message });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    // Check the password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Incorrect password!' });
    }

    // Generate a token
    const token = jwt.sign(
      { userId: user.id }, // Use user.id instead of user._id for Sequelize
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ userId: user.id, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  deleteUser,
  login,
};
