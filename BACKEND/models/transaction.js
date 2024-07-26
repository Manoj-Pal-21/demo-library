const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  issueStatus: { type: Boolean },
  issueDate: { type: Date },
  dueDate: { type: Date },
  transactionType: { type: String, enum: ['borrowed', 'returned','rejected'], required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
