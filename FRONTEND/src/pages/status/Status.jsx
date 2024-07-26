import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../utils/Cookie';
import NoDataFound from '../../components/NoDataFound';

const Status = () => {
  const [bookRequests, setBookRequests] = useState([]);
  const token = getToken('token');

  useEffect(() => {
    fetchBookRequests();
  }, []);

  const fetchBookRequests = async () => {
    try {
      const response = await axios.get(`${baseUrl}/transactions/issueDeatils`, token);
      setBookRequests(response.data);
    } catch (error) {
      console.error('Error fetching book requests:', error);
    }
  };

  const handleButtonClick = async (requestId) => {
    try {
      const response = await axios.put(`${baseUrl}/transactions/issueAction/${requestId}?action=return`, {}, token);
      console.log(response.data);
      fetchBookRequests();
    } catch (error) {
      console.log('Error rejecting book request:', error);
      toast.error('some thing went wrong');
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Status</h2>
      <div className="table-responsive">
        {bookRequests.length > 0 ? (
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Book Name</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.userId.name}</td>
                  <td>{request.bookId.name}</td>
                  <td>{request.userId.contactNumber}</td>
                  <td>{request.transactionType?.toUpperCase()}</td>
                  <td>
                    {request.transactionType?.toUpperCase() === "BORROWED" ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleButtonClick(request._id)}
                      >
                        Returned
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
};

export default Status;
