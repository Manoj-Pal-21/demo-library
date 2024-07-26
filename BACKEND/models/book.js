const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  availabilityStatus: { type: Boolean, default: false },
  quantity: { type: Number },
  genre: { type: String },
  borrower: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  
  }]
}, {
  timestamps: true 
});

module.exports = mongoose.model('Book', bookSchema);
