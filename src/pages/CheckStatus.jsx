import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckStatus.css";

const CheckStatus = () => {
  const [statusBy, setStatusBy] = useState("complainID");
  const [statusInput, setStatusInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);

  const checkStatus = async () => {
    try {
      let response;
      if (statusBy === "complainID") {
        response = await axios.get(
          `http://localhost:3003/getComplaintById/${statusInput}`
        );
      } else if (statusBy === "employeeNo") {
        response = await axios.get(
          `http://localhost:3003/getComplaintByPfNo/${statusInput}`
        );
      }

      setResults(response.data);
      setSelectedComplain(null);
      setShowTransactions(false);
      setError("");
    } catch (error) {
      setError(
        "Error fetching the status. Please check the input and try again."
      );
      setResults([]);
      setSelectedComplain(null);
      setShowTransactions(false);
    }
  };

  const handleViewDetails = (complain) => {
    setSelectedComplain(complain);
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
    <div className="check-status-container">
      <main>
        <div className="content-wrapper">
          <h1>Check Complaint Status</h1>
          <div className="status-check">
            <label htmlFor="statusBy">Check Status By</label>
            <select
              id="statusBy"
              value={statusBy}
              onChange={(e) => setStatusBy(e.target.value)}
            >
              <option value="complainID">Complain ID</option>
              <option value="employeeNo">Employee No.</option>
            </select>
            <input
              type="text"
              id="statusInput"
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
              placeholder="Complain ID/ Employee No."
            />
            <button className="go-button" onClick={checkStatus}>
              Go
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((result) => (
                  <tr key={result.complaintID}>
                    <td>{result.complaintID}</td>
                    <td>{result.createdByName}</td>
                    <td>{result.title}</td>
                    <td>
                      <button onClick={() => handleViewDetails(result)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">
                    No complaints {error && <p className="error">{error}</p>}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {selectedComplain && (
        <div className="details-modal">
          <div className="details-content">
            <h3>Complain Details</h3>
            <p>
              <strong>ID:</strong> {selectedComplain.complaintID}
            </p>
            <p>
              <strong>Created By:</strong> {selectedComplain.createdByName}
            </p>
            <p>
              <strong>PF No:</strong> {selectedComplain.pfNo}
            </p>
            <p>
              <strong>Title:</strong> {selectedComplain.title}
            </p>
            <p>
              <strong>Complaint:</strong> {selectedComplain.complaint}
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

export default CheckStatus;
