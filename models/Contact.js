const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  // relate contact to user
  user: {
    type: mongoose.Schema.Types.ObjectId, // Key to collection item
    ref: 'users' // collection name
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'personal' // contacts are either personal or professional
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('contact', ContactSchema);
