const express = require('express');
const router = express.Router();
const { getAllBooks, addBook, getIssuedBooks, deleteBook } = require('../controllers/bookController');
const { auth } = require('../middlewares/auth');


router.get('/', getAllBooks);
router.get('/getIssuedBooks', auth, getIssuedBooks);
router.post('/add', auth, addBook);
router.delete('/:id', auth, deleteBook);


module.exports = router;
