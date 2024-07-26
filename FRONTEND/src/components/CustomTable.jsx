import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { baseUrl } from '../utils/Cookie';


const CustomTable = ({ token, data, fetchBookRequest }) => {

    const handleAccept = async (transactionId) => {
        try {
            const response = await axios.put(`${baseUrl}/transactions/issueAction/${transactionId}?action=accept`, {}, token);
            console.log(response.data);
            fetchBookRequest()
            toast.success('Book accepted successfully');
        } catch (error) {
            console.log('Error accepting book:', error);
            toast.error('Failed to accept book');
        }
    };

    const handleReject = async (transactionId) => {
        try {
            const response = await axios.put(`${baseUrl}/transactions/issueAction/${transactionId}?action=reject`, {}, token);
            console.log(response.data);
            fetchBookRequest()
            toast.success('Book request rejected successfully');
        } catch (error) {
            console.log('Error rejecting book request:', error);
            toast.error('Failed to reject book request');
        }
    };


    return (
        <>
            <div className="container mt-4">
                <div className="table-container">
                    <div className="table-responsive">
                        {
                            data?.length > 0 ? (<table className="table table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        {Object.keys(data[0]).map((item, index) => (
                                            !['TransactionId', 'BookId'].includes(item) && (
                                                <th key={index}>{item}</th>
                                            )
                                        ))}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((book, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Object.keys(book).map((key, colIndex) => (
                                                !['TransactionId', 'BookId'].includes(key) && (
                                                    <td key={colIndex}>{book[key]}</td>
                                                )
                                            ))}
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <button
                                                        className={'btn btn-success mr-2'}
                                                        onClick={() => handleAccept(book.TransactionId)}>
                                                        ACCEPT
                                                    </button>
                                                    <button
                                                        className={'btn btn-danger'}
                                                        onClick={() => handleReject(book.TransactionId)}>
                                                        REJECT
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            ) : (
                                <p>No data available</p>
                            )
                        }
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default CustomTable;
