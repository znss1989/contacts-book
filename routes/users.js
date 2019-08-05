const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const router = express.Router();

/**
 * @route POST api/users
 * @desc Register a user
 * @access Public
 */
router.post(
  '/', 
  [
    check('name', 'Add a name').not().isEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Have password with length at least 6').isLength({ min: 6 })
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
    const { name, email, password } = req.body;
    try {
      // check existance
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: "User already exists"
        });
      }
      // create user & save
      user = new User({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
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
      })
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;