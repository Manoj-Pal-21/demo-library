
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    addBook(state, action) {
      state.books.push(action.payload);
    },
    deleteBook(state, action) {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    resetBook(state) {
      state.books = [];
    }
  },
});

export const { setBooks, addBook, deleteBook, resetBook } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
