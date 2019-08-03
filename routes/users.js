const express = require('express');
const { check, validationResult } = require('express-validator/check');

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
    check('email', 'Include valid email').isEmail(),
    check('password', 'Have password with length at least 6').isLength({ min: 6 })
  ], 
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    // process
    res.send("passed");
  }
);

module.exports = router;