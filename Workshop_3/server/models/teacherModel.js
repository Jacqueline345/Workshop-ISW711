const mongoose = require('mongoose');
const teacher = new mongoose.Schema ({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  cedula: {
    type: String
  },
  age: {
    type: Number
  }
});

module.exports = mongoose.model('teachers', teacher);