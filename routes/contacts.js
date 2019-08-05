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
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).json({
      msg: "Contact not found"
    });
    // check ownership
    if (contact.user.toString() != req.user.id) {
      return res.status(401).json({
        msg: "Not authorized"
      });
    }
    // update
    contact = await Contact.findByIdAndUpdate(req.params.id, {
      $set: contactFields
    }, {
      new: true
    });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route DELETE api/contacts/:id
 * @desc Get all of contacts of user
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).json({
      msg: "Contact not found"
    });
    // check ownership
    if (contact.user.toString() != req.user.id) {
      return res.status(401).json({
        msg: "Not authorized"
      });
    }
    // delete
    await Contact.findByIdAndRemove(req.params.id);
    res.json({
      msg: "Contact removed"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;