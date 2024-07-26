import React from 'react';
import Navbar from '../pages/navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const App = () => {
    const Location = useLocation();
    return (
        <>
            {!['/sign-in', '/sign-up']?.includes(Location?.pathname) && <Navbar />}
            <Outlet />
        </>
    );
};

export default App;
