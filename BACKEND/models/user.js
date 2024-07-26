const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  name: { type: String },
  email: { type: String },
  contactNumber: { type: String }
}, {
  timestamps: true
});



module.exports = mongoose.model('User', userSchema);
