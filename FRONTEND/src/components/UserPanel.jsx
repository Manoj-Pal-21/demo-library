import React from 'react';
import { selectUser } from '../redux/slice/auth';
import { useSelector } from 'react-redux';

const UserPanel = () => {
    const { user } = useSelector(selectUser);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="card text-center shadow">
                <div className="card-body">
                    <h2 className="card-title mb-4">Welcome, {user?.username}!</h2>
                    {user?.isAdmin &&
                        <p className="card-text text-success">You are an admin.</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default UserPanel;
