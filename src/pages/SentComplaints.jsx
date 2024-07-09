import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AllComplains.css";

const AllComplains = ({ user }) => {
  const { userID } = useParams();
  const [complains, setComplains] = useState([]);
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/getComplaintByUserId/${userID}`
        );
        setComplains(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [userID]);

  const handleViewDetails = (complain) => {
    setSelectedComplain(complain);
    setSelectedOption("");
  };

  const handleCloseDetails = () => {
    setSelectedComplain(null);
    setShowTransactions(false);
  };

  const handleShowTransactions = () => {
    setShowTransactions(true);
  };

  const handleCloseTransactions = () => {
    setShowTransactions(false);
  };

  return (
    <div className="all-complains-container">
      <h2>Sent Complaints</h2>
      <div className={`content ${selectedComplain ? "split-view" : ""}`}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Complain ID</th>
                <th>Title</th>
                <th>Complain</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complains.map((complain) => (
                <tr key={complain.complaintID}>
                  <td>{complain.complaintID}</td>
                  <td>{complain.title}</td>
                  <td className="truncate-text" title={complain.complaint}>
                    {complain.complaint}
                  </td>
                  <td>{complain.status}</td>
                  <td>
                    <button onClick={() => handleViewDetails(complain)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedComplain && (
          <div className="details-container">
            <div className="details-content">
              <h3>Complain Details</h3>
              <p>
                <strong>ID:</strong> {selectedComplain.complaintID}
              </p>
              <p>
                <strong>Title:</strong> {selectedComplain.title}
              </p>
              <p>
                <strong>Complain:</strong> {selectedComplain.complaint}
              </p>
              <p>
                <strong>Department:</strong> {selectedComplain.department}
              </p>
              <p>
                <strong>Website:</strong> {selectedComplain.website}
              </p>
              <p>
                <strong>Module:</strong> {selectedComplain.module}
              </p>
              <p>
                <strong>Division:</strong> {selectedComplain.division}
              </p>
              {selectedComplain.document && (
                <p>
                  <strong>Document:</strong>{" "}
                  <a
                    href={`http://localhost:3003/uploads/${selectedComplain.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                </p>
              )}
              <p>
                <strong>Status:</strong> {selectedComplain.status}
              </p>
              <p>
                <strong>Current Holder:</strong>{" "}
                {selectedComplain.currentHolderUsername}
              </p>
              <button className="close-button" onClick={handleCloseDetails}>
                Close
              </button>
              <button
                className="transactions-button"
                onClick={handleShowTransactions}
              >
                Transaction Details
              </button>
            </div>
          </div>
        )}
      </div>
      {showTransactions && selectedComplain && (
        <div className="modal">
          <div className="modal-content">
            <h3>Transaction Details</h3>
            <ul>
              {selectedComplain.transactions.map((transaction) => (
                <li key={transaction.transactionId}>
                  <p>
                    <strong>Transaction ID:</strong> {transaction.transactionId}
                  </p>
                  <p>
                    <strong>Created By:</strong>{" "}
                    {transaction.createdByUsername || transaction.createdBy}
                  </p>
                  <p>
                    <strong>Sent To:</strong> {transaction.sentToUsername}
                  </p>
                  <p>
                    <strong>Time and Date:</strong>{" "}
                    {new Date(transaction.timeAndDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Remark:</strong> {transaction.remark}
                  </p>
                  <p>
                    <strong>Status:</strong> {transaction.status}
                  </p>
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={handleCloseTransactions}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllComplains;
