const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // json web tokens
const config = require('config'); // get.config etc.
const { body, validationResult } = require('express-validator'); // express validation functions
const User = require('../models/User'); // database schema model

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post('/', [body('name', 'The name field is required.').notEmpty(), body('email', 'Please include a valid email address.').isEmail(), body('password', 'The password must be at least 6 characters.').isLength({ min: 6 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  // res.send('No errors found.'); // debug

  // destructure
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ msg: 'That email address is already being used.' });
    }

    user = new User({
      name: name,
      email: email,
      password: password
    });

    const salt = await bcrypt.genSalt(9);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };
    // generate and return a token
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
    //
  } catch (error) {
    console.error(error.message);
    res.status(500).send('>>>>> Server Error. <<<<<');
  }
  //
}); // ends router.post

module.exports = router;
