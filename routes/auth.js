const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const router = express.Router();

/**
 * @route GET api/auth
 * @desc Get logged in user
 * @access Private
 */
router.get('/', (req, res) => {
  res.send("Get the logged in user");
});

/**
 * @route POST api/auth
 * @desc Auth user & get token
 * @access Public
 */
router.post('/', [
  check('email', "Include a valid email").isEmail(),
  check('password', "Password required").exists()
], 
async (req, res) => {
  // input validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  // process
  const { email, password } = req.body;
  try {
    // check credentials
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    }
    // return token
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, config.get('jwtSecret'), { 
      expiresIn: 10800 
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;