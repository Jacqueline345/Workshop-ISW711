const mongoose = require('mongoose');


const courses = new mongoose.Schema({
  name: { type: String },
  code: { type: Number },
  description : { type: String},
  credits: { type: Number },
  teacher: { type : mongoose.Schema.Types.ObjectId, ref: 'Teacher'}
});

module.exports = mongoose.model('Course', courses);
