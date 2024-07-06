import React, { useState } from "react";
import "./AllComplains.css";

const AllComplains = () => {
  const [complains, setComplains] = useState([
    {
      complaintID: 1,
      title: "Internet Connectivity Issue",
      complaint:
        "Unable to access company website from office network. Lorem ipsum",
      department: "IT",
      website: "companywebsite.com",
      module: "Network Services",
      division: "Operations",
      document: null,
      status: "Resolved",
      currentHolder: 2,
      currentHolderUsername: "sarans",
      transactions: [
        {
          transactionId: 1,
          createdBy: 123456,
          sentTo: 1,
          createdByUsername: null,
          sentToUsername: "admin",
          timeAndDate: "2024-06-30T18:12:48.000Z",
          remark: "Unable to access company website from office network.",
          status: "pending",
        },
        {
          transactionId: 2,
          createdBy: 1,
          sentTo: 2,
          createdByUsername: "admin",
          sentToUsername: "sarans",
          timeAndDate: "2024-06-30T18:25:18.000Z",
          remark: "Forwarding it to you. The issue of the web application.",
          status: "In Progress",
        },
        {
          transactionId: 3,
          createdBy: 2,
          sentTo: 1,
          createdByUsername: "sarans",
          sentToUsername: "admin",
          timeAndDate: "2024-06-30T18:27:08.000Z",
          remark: "Resolved.",
          status: "Resolved",
        },
      ],
    },
    // Additional complaints...
  ]);

  const [selectedComplain, setSelectedComplain] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [reply, setReply] = useState("");

  const handleViewDetails = (complain) => {
    setSelectedComplain(complain);
    setSelectedOption("");
    setSelectedUser("");
    setReply("");
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the submit action
    console.log(`Selected option: ${selectedOption}`);
    console.log(`Selected user: ${selectedUser}`);
    console.log(`Reply: ${reply}`);
    // Add your submission logic here
  };

  return (
    <div className="all-complains-container">
      <h2>All Complains</h2>
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
                    href={selectedComplain.document}
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
              <div className="closeandtransaction">
                <button
                  className="transactions-button"
                  onClick={handleShowTransactions}
                >
                  Transaction Details
                </button>
                <button className="close-button" onClick={handleCloseDetails}>
                  Close
                </button>
              </div>
              <div className="radio-buttons">
                <label>
                  <input
                    type="radio"
                    value="forward"
                    checked={selectedOption === "forward"}
                    onChange={handleOptionChange}
                  />
                  Forward
                </label>
                <label>
                  <input
                    type="radio"
                    value="resolve"
                    checked={selectedOption === "resolve"}
                    onChange={handleOptionChange}
                  />
                  Resolve
                </label>
              </div>
              {selectedOption === "forward" && (
                <div className="forward-section">
                  <label>Select User:</label>
                  <select value={selectedUser} onChange={handleUserChange}>
                    <option value="">Select User</option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                    <option value="user3">User 3</option>
                    {/* Add more users as needed */}
                  </select>
                  <label>Reply:</label>
                  <textarea
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="Enter your reply here..."
                  ></textarea>
                  <button className="submit-button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              )}
              {selectedOption === "resolve" && (
                <div className="resolve-section">
                  <label>Remark:</label>
                  <textarea
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="Enter your remark here..."
                  ></textarea>
                  <button className="submit-button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              )}
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
