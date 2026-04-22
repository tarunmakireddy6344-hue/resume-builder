const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mock simple login (Since Firebase requires actual setup on client side, we use a mock route for now)
router.post('/login', async (req, res) => {
  try {
    const { email, name, uid } = req.body;
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, email, name });
      await user.save();
    }
    res.json({ message: 'Success', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
