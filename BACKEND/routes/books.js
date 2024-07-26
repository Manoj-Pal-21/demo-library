const express = require('express');
const router = express.Router();
const { getAllBooks, addBook, getIssuedBooks, deleteBook } = require('../controllers/bookController');
const { auth } = require('../middlewares/auth');

// Route to fetch all books
router.get('/', getAllBooks);

// Route to fetch issued books (accessible only to authenticated users)
router.get('/getIssuedBooks', auth, getIssuedBooks);

// Route to add a new book (accessible only to authenticated users with admin privileges)
router.post('/add', auth, addBook);

// Route to delete a book by ID (accessible only to authenticated users with admin privileges)
router.delete('/:id', auth, deleteBook);


module.exports = router;
