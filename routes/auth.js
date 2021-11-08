const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // json web tokens
const config = require('config'); // get.config etc.
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator'); // express validation functions
const User = require('../models/User'); // database schema model

/**
 * @route     GET api/auth
 * @desc      get logged in user
 * @access    Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 1.');
  }
});

/**
 * @route     POST api/auth
 * @desc      Authorise user and get token
 * @access    Public
 */
router.post('/', [body('email', 'Please include a valid email address.').isEmail(), body('password', 'The password is required').exists()], async (req, res) => {
  // store validation errors
  const errors = validationResult(req);
  // iff errors, then fail
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  // destructure json
  const { email, password } = req.body;
  try {
    // check that user exists
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: 'I cannot find a user by that email.' });
    }
    // check that encypted pw matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'That password does not match the user given.' });
    }

    // generate and check the token
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error 2.');
  }
});

module.exports = router;
