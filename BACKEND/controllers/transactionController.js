const Transaction = require('../models/transaction');
const Book = require('../models/book');


const addTransaction = async (req, res) => {
  const { userId } = req.user;
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    const isTransactionExist = await Transaction.findOne({ bookId, userId });
    if (isTransactionExist?.transactionType === "borrowed") {
      return res.status(405).json({ message: 'This book is already pending or issued' })
    }
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ error: 'Book out of stock' });
    }

    const newTransaction = new Transaction({
      userId: userId,
      bookId: bookId,
      issueStatus: false,
      transactionType: 'borrowed',
    });

    const transaction = await newTransaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBookRequest = async (req, res) => {
  try {
    const response = await Transaction.find({
      transactionType: "borrowed",
      issueStatus: false
    })
      .populate([
        { path: 'userId', select: 'name' },
        { path: 'bookId', select: 'name' }
      ]);

    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateIssueRequest = async (req, res) => {
  const { transactionId } = req.params;
  const actionType = req.query.action

  try {
    const currentDate = new Date();
    const dueDate = new Date(currentDate);

    dueDate.setMonth(dueDate.getMonth() + 1);

    const transaction = await Transaction.findByIdAndUpdate(transactionId, {
      issueStatus: actionType === "accept",
      transactionType: actionType === "accept" ? "borrowed" : actionType === "return" ? "returned" : "rejected",
      issueDate: new Date(),
      dueDate: dueDate
    }, { new: true })

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (actionType === "accept")
      await Book.findByIdAndUpdate(transaction?.bookId, { $inc: { quantity: -1 } })

    if (actionType === "return")
      await Book.findByIdAndUpdate(transaction?.bookId, { $inc: { quantity: 1 } })

    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error accepting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const issueDetails = async (req, res) => {
  try {
    const response = await Transaction.find({
      transactionType: { $in: ["borrowed", "returned"] },
    })
      .populate([
        { path: 'userId', select: ['name', 'contactNumber'] },
        { path: 'bookId', select: 'name' }
      ]);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching issue details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTransation = async (req, res) => {
  const { transactionId } = req.params;

  try {

    const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully', deletedTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateIssueRequest, addTransaction, getBookRequest, deleteTransation, issueDetails };
