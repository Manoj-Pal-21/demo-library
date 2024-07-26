import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from '../../utils/Cookie';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    contactNumber: ''
  });

  const { username, password, name, email, contactNumber } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username includes at least one number
    if (!/\d/.test(username)) {
      toast.error('Username must include at least one number.');
      return;
    }

    // Convert username to lowercase
    const lowerCaseUsername = username.toLowerCase();

    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, {
        ...formData,
        username: lowerCaseUsername
      });

      console.log(response)

      if (response.status === 200) {
        navigate('/sign-in');
        toast.success('Signed up successfully! Please sign in.');
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner p-4 shadow">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Sign Up</h3>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              placeholder="Enter your contact number"
              value={contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">Already have an account? <Link to="/sign-in">Sign In</Link></p>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default SignUp;
