const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  comments: [String],
});

module.exports = mongoose.model('Customer', customerSchema);
