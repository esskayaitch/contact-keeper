const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route     POST api/users
// @desc      Register a user
// @access    Public

router.post('/', [body('name', 'The name field is required.').notEmpty(), body('email', 'Please include a valid email address.').isEmail(), body('password', 'The password must be at least 6 characters.').isLength({ min: 6 })], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  res.send('No errors found.');
});

module.exports = router;
