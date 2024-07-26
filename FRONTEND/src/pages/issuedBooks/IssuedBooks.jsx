import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getToken } from "../../utils/Cookie";
import toast, { Toaster } from 'react-hot-toast';
import { formatDate } from "../../dateFormatter/Date";
import NoDataFound from "../../components/NoDataFound";

const IssuedBooks = () => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [pendingBookRequest, setPendingBookRequest] = useState([]);

  const token = getToken("token");

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  useEffect(() => {
    getIssuedBookList();
  }, []);

  const getIssuedBookList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/books/getIssuedBooks`, token);

      const data = response.data || [];
      const issued = data.filter(
        (book) =>
          book.issueStatus === true && book.transactionType === "borrowed"
      );
      const pending = data.filter(
        (book) =>
          book.issueStatus === false && book.transactionType === "borrowed"
      );

      setIssuedBooks(issued);
      setPendingBookRequest(pending);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch books.");
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      const response = await axios.delete(`${baseUrl}/transactions/deletetransaction/${transactionId}`, token);
      console.log(response);
      toast.success('Transaction deleted successfully');
      getIssuedBookList()
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting transaction: ${error.response.data.message}`);
    }
  }

  return (

    <div className="container mt-4">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className={`nav-link ${selectedTab === "pending" ? "active" : ""}`}
            id="pending-tab"
            onClick={() => handleTabClick("pending")}
            data-toggle="tab"
            href="#pending"
            role="tab"
            aria-controls="pending"
            aria-selected={selectedTab === "pending" ? "true" : "false"}
          >
            Pending
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${selectedTab === "issued" ? "active" : ""}`}
            id="issued-tab"
            onClick={() => handleTabClick("issued")}
            data-toggle="tab"
            href="#issued"
            role="tab"
            aria-controls="issued"
            aria-selected={selectedTab === "issued" ? "true" : "false"}
          >
            Issued
          </a>
        </li>
      </ul>

      <div className="tab-content mt-2" id="myTabContent">
        <div
          className={`tab-pane fade ${selectedTab === "pending" ? "show active" : ""}`}
          id="pending"
          role="tabpanel"
          aria-labelledby="pending-tab"
        >
          <div className="container">
            <div className="pending-requests">
              <h4 className="mt-3">Pending Books</h4>
              {pendingBookRequest?.length > 0 ? (
                <ul className="list-group">
                  {pendingBookRequest.map((book, index) => (
                    <li key={index} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6>BookName: {book?.bookId?.name}</h6>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <NoDataFound/>
              )}
            </div>
          </div>

        </div>

        <div
          className={`tab-pane fade ${selectedTab === "issued" ? "show active" : ""}`}
          id="issued"
          role="tabpanel"
          aria-labelledby="issued-tab"
        >
          <div className="container">
            <div className="table-responsive">
              <h4 className="mt-3">Issued Books</h4>
              {
                issuedBooks?.length > 0 ? (
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>Book Name</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issuedBooks.map((book, index) => (
                        <tr key={index}>
                          <td>{book.bookId.name}</td>
                          <td>{formatDate(book.issueDate)}</td>
                          <td>{formatDate(book.dueDate)}</td>
                          <td>{book.issueStatus ? 'BORROWED' : 'RETURNED'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NoDataFound/>
                )
              }
            </div>
          </div>

        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default IssuedBooks;





