import React, { useState } from 'react';
import { useDispatch } from 'react-redux';;
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { setUser } from '../../redux/slice/auth';
import axios from 'axios';
import { baseUrl, setCookie } from '../../utils/Cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/auth/login`, {
                username,
                password,
                // name
            });

            dispatch(setUser(response.data));
            setCookie('token', response.data.token, 7)
            navigate('/');
            toast.success(response.data.message);
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
                <form onSubmit={handleFormSubmit}>
                    <h3 className="text-center mb-2">Welcome to Library</h3>
                    <h4 className="text-center mb-2">Sign In</h4>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-block">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
                </div>
                <Toaster />
            </div>
        </div>

    );
};

export default Login;