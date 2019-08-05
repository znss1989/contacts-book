const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

const router = express.Router();

/**
 * @route GET api/contacts
 * @desc Get all of contacts of user
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact
      .find({
        user: req.user.id
      })
      .sort({
        date: -1
      });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  res.send("Get all contacts");
});

/**
 * @route POST api/contacts
 * @desc Add new contact
 * @access Private
 */
router.post(
  '/', 
  [
    auth, [
      check('name', "Name required").not().isEmpty()
    ]
  ], 
  async (req, res) => {
    // input validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route PUT api/contacts/:id
 * @desc Update contact
 * @access Private
 */
router.put('/:id', (req, res) => {
  res.send("Update contact");
});

/**
 * @route DELETE api/contacts/:id
 * @desc Get all of contacts of user
 * @access Private
 */
router.delete('/:id', (req, res) => {
  res.send("Delete contact");
});

module.exports = router;