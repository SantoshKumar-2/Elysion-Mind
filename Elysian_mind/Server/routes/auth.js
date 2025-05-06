const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const ensureAuthenticated = require('../Middleware/authMiddleWare');

// Signup route
router.post('/signup', async (req, res) => {
  const { fullName, email, password, age, gender } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, age, gender });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Error registering user: ' + error });
    }
  }
});

// Login route
// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcryptjs.compare(password, user.password))) {
      // Set session data
      req.session.user = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        gender: user.gender,
      };
      res.status(200).json({ message: 'Login successful', user: req.session.user });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in: ' + error });
  }
});


// Logout route
router.post('/logout', ensureAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out: ' + err });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Protected dashboard route
// Protected dashboard route
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // Access user info from the session
    const user = req.session.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Respond with session user data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data: ' + error });
  }
});


module.exports = router;
