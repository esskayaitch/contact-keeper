const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator'); // express validation functions

const User = require('../models/User'); // user collection schema model
const Contact = require('../models/Contact'); // contact collection schema model

/**
 * @route     GET api/contacts
 * @desc      Get all the users contacts
 * @access    Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('>>>>> Server Error, get all contacts. <<<<<');
  }
});

/**
 * @route     POST api/contacts
 * @desc      Add a new contact
 * @access    Private
 */
router.post('/', [auth, [body('name', 'The name field is required.').notEmpty()]], async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  // pull details from document
  const { name, email, phone, type } = req.body;

  try {
    // create new contact
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });
    // save it
    const contact = await newContact.save();

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('>>>>> Server Error, add new contact. <<<<<');
  }
});

/**
 * @route     POST api/contacts/:id
 * @desc      Update contact
 * @access    Private
 */
router.put('/:id', auth, async (req, res) => {
  // pull details from document
  const { name, email, phone, type } = req.body;

  // build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // check that the user owns the contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised - that contact belongs to another user.' });
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
    res.json(contact);
    // error
  } catch (error) {
    console.error(error.message);
    res.status(500).send('>>>>> Server Error, update contact. <<<<<');
  }
});

/**
 * @route     DELETE api/contacts/:id
 * @desc      dELeTe A contAcT
 * @access    Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // check that the user owns the contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised - that contact belongs to another user.' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact has left the collection.' });
    // error
  } catch (error) {
    console.error(error.message);
    res.status(500).send('>>>>> Server Error, update contact. <<<<<');
  }
});

module.exports = router;
