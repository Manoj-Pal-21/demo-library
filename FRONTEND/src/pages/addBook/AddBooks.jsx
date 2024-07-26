import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { addBook } from '../../redux/slice/book';
import { baseUrl, getToken } from '../../utils/Cookie';
import { selectUser } from '../../redux/slice/auth';
import UnAuthorized from '../../components/UnAuthorized';

const AddBookForm = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = getToken('token')

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    availabilityStatus: false,
    quantity: 0,
    genre: '',
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'quantity') {
      const quantityValue = parseInt(value, 10);

      if (!isNaN(quantityValue) && quantityValue >= 0) {
        setFormData({ ...formData, [id]: quantityValue });
      }

      return;
    }
    setFormData({ ...formData, [id]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/books/add`, formData, token);
      dispatch(addBook(response.data));
      toast.success('Book added successfully!');
      setFormData({
        name: '',
        author: '',
        availabilityStatus: false,
        quantity: 0,
        genre: '',
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  if (!user?.isAdmin) return <UnAuthorized />

  return (
    <div className="auth-wrapper">
      <div className="auth-inner p-4 shadow">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Add Book</h3>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter book name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              placeholder="Enter genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Add Book
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default AddBookForm;
