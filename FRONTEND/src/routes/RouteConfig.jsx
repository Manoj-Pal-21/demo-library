import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/Signup';
import AllBooks from '../pages/book/AllBooks';
import App from './App'
import PrivateRoute from './PrivateRoute';
import Error404 from '../components/Error404';
import AddBookForm from '../pages/addBook/AddBooks';
import BookeRequest from '../pages/bookRequest/BookeRequest';
import IssuedBooks from '../pages/issuedBooks/IssuedBooks';
import Status from '../pages/status/Status';


const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <PrivateRoute element={<Home />} />,
            },
            {
                path: '/sign-in',
                element: <PrivateRoute element={<Login />} />,
            },
            {
                path: '/sign-UP',
                element: <PrivateRoute element={<SignUp />} />,
            },
            {
                path: '/all-books',
                element: <PrivateRoute element={<AllBooks />} />,
            },
            {
                path: '/issued-books',
                element: <PrivateRoute element={<IssuedBooks />} />,
            },
            {
                path: '/add-books',
                element: <PrivateRoute element={<AddBookForm />} />,
            },
            {
                path: '/books-req',
                element: <PrivateRoute element={<BookeRequest />} />,
            },
            {
                path: '/status',
                element: <PrivateRoute element={<Status />} />,
            }
        ],
    },
    {
        path: '*',
        element: <Error404 />,
    },
]);

export default Router;