import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomTable from '../../components/CustomTable';
import { selectRequests, setRequests } from '../../redux/slice/transaction';
import { baseUrl, getToken } from '../../utils/Cookie';
import axios from 'axios';
import UnAuthorized from '../../components/UnAuthorized';
import { selectUser } from '../../redux/slice/auth';

const BookRequest = () => {
  const requests = useSelector(selectRequests);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = getToken('token')

  useEffect(() => {
    fetchBookRequests();
  }, []);

  console.log(token, "token")

  const fetchBookRequests = async () => {
    try {
      const response = await axios.get(`${baseUrl}/transactions/getbookrequest`, token);
      const data = response.data.map(item => ({ TransactionId: item._id, Name: item.userId.name, Book: item.bookId.name, BookId: item.bookId._id }));
      dispatch(setRequests(data));
    } catch (error) {
      console.error('Error fetching book requests:', error);
    }
  };

  if (!user?.isAdmin) return <UnAuthorized />

  return (
    <div className="container mt-4">
      <h2>Ussued Books Request</h2>
      {<CustomTable data={requests} token={token} fetchBookRequest={fetchBookRequests} />}
    </div>
  );
};

export default BookRequest;
