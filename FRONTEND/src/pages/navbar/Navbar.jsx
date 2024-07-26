import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCookie } from '../../utils/Cookie';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slice/auth';

const Navbar = () => {
    const { user } = useSelector(selectUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log(deleteCookie('token'));
        deleteCookie('token');
        navigate('/sign-in');
    };

    return (
        <header>
            <div className="logo_container">
                <Link to="/" className="action_name">Library Management System</Link>
            </div>
            <nav className="nav_bar">
                <div className='link'>
                    <Link to='/all-books'>All books</Link>
                </div>
                {!user?.isAdmin && (
                    <div className='link'>
                        <Link to='/issued-books'>Issued books</Link>
                    </div>
                )}
                {user?.isAdmin && (
                    <>
                        <div className='link'>
                            <Link to='/add-books'>Add Books</Link>
                        </div>
                        <div className='link'>
                            <Link to='/books-req'>Issued Books Request</Link>
                        </div>
                        <div className='link'>
                            <Link to='/status'>Status</Link>
                        </div>
                    </>
                )}
            </nav>
            <div className="action_bar">
                <div className="action_container">
                    <p onClick={handleLogout} className="action_name">LOGOUT</p>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
