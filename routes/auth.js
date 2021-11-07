const express = require('express');
const router = express.Router();

/**
 * @route     GET api/auth
 * @desc      get logged in user
 * @access    Private
 */
router.get('/', (req, res) => {
  res.send('gET the LOgged iN User');
});

/**
 * @route     POST api/auth
 * @desc      Authorise user and get token
 * @access    Public
 */
router.post('/', (req, res) => {
  res.send('loG IN usER');
});

module.exports = router;
