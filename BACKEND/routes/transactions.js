const express = require('express');
const router = express.Router();
const { updateIssueRequest, addTransaction, getBookRequest, deleteTransaction, issueDetails } = require('../controllers/transactionController');
const { auth } = require('../middlewares/auth')

// Endpoint to issue a book to a user
router.post('/issueBook', auth, addTransaction);

// Endpoint to delete a transaction (issued book)
router.delete('/deletetransaction/:transactionId', auth, deleteTransaction);

// Endpoint for the admin to get book requests from users
router.get('/getbookrequest', auth, getBookRequest);

// Endpoint for the admin to accept, reject, or mark a book as returned
router.put('/issueAction/:transactionId', auth, updateIssueRequest);

// Endpoint for the admin to get details about issued books and their status
router.get('/issueDeatils', auth, issueDetails);


module.exports = router;
