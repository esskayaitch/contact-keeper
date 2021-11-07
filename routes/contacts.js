const express = require('express');
const router = express.Router();

/**
 * @route     GET api/contacts
 * @desc      Get all the users contacts
 * @access    Private
 */
router.get('/', (req, res) => {
  res.send('Get all CONtacts of a usERR');
});

/**
 * @route     POST api/contacts
 * @desc      Add a new contact
 * @access    Public
 */
router.post('/', (req, res) => {
  res.send('AdD a cOntaCt');
});

/**
 * @route     POST api/contacts/:id
 * @desc      UpdaTe ConTacT
 * @access    Private
 */
router.put('/:id', (req, res) => {
  res.send('upDate a CoNTact');
});

/**
 * @route     DELETE api/contacts/:id
 * @desc      dELeTe A contAcT
 * @access    Private
 */
router.delete('/:id', (req, res) => {
  res.send('DeleeT a CoNTact');
});

module.exports = router;
