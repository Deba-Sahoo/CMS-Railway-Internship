import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AllComplains.css';

const AllComplains = ({ user }) => {
  console.log(user);
  const { userID } = useParams();
  const [complains, setComplains] = useState([]);
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [reply, setReply] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/getComplaintsByCurrentHolder/${userID}`);
        setComplains(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, [userID]);

  useEffect(() => {
    if (selectedOption === 'forward') {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3003/getLevel0and1');
          setUsers(response.data.filter(u => u.userID !== parseInt(userID))); // Filter out the logged-in user
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [selectedOption, userID]);

  const handleViewDetails = (complain) => {
    setSelectedComplain(complain);
    setSelectedOption('');
    setSelectedUser('');
    setReply('');
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

  const handleSubmit = async () => {
    if (selectedOption === 'forward' && selectedUser && reply) {
      try {
        const requestBody = {
          remark: reply,
          createdBy: userID,  // assuming userID is the ID of the user performing the action
          sentTo: selectedUser,
          complaintID: selectedComplain.complaintID,
        };
        const response = await axios.post('http://localhost:3003/forwardComplaint', requestBody);
        console.log(response.data);
        alert('Complaint forwarded successfully');
        window.location.reload();  // Reload the page
      } catch (error) {
        console.error('Error forwarding complaint:', error);
        // Handle error (e.g., show an error message)
      }
    } else if (selectedOption === 'resolve' && reply) {
      try {
        const requestBody = {
          remark: reply,
          createdBy: parseInt(userID),  // assuming userID is the ID of the user performing the action
          sentTo: selectedComplain.currentHolder, // assuming current holder is the one resolving it
          complaintID: selectedComplain.complaintID,
        };
        const response = await axios.post('http://localhost:3003/resolveComplaint', requestBody);
        console.log(response.data);
        alert('Complaint resolved successfully');
        window.location.reload();  // Reload the page
      } catch (error) {
        console.error('Error resolving complaint:', error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  return (
    <div className="all-complains-container">
      <h2>Welcome, {user.userName}!</h2>
      <h2>All Complains</h2>  
      <div className={`content ${selectedComplain ? 'split-view' : ''}`}>
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
                  <td className="truncate-text" title={complain.complaint}>{complain.complaint}</td>
                  <td>{complain.status}</td>
                  <td>
                    <button onClick={() => handleViewDetails(complain)}>View Details</button>
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
              <p><strong>ID:</strong> {selectedComplain.complaintID}</p>
              <p><strong>Title:</strong> {selectedComplain.title}</p>
              <p><strong>Complain:</strong> {selectedComplain.complaint}</p>
              <p><strong>Department:</strong> {selectedComplain.department}</p>
              <p><strong>Website:</strong> {selectedComplain.website}</p>
              <p><strong>Module:</strong> {selectedComplain.module}</p>
              <p><strong>Division:</strong> {selectedComplain.division}</p>
              {selectedComplain.document && (
                <p><strong>Document:</strong> <a href={`http://localhost:3003/uploads/${selectedComplain.document}`} target="_blank" rel="noopener noreferrer">View Document</a></p>
              )}
              <p><strong>Status:</strong> {selectedComplain.status}</p>
              <p><strong>Current Holder:</strong> {selectedComplain.currentHolderUsername}</p>
              <button className="close-button" onClick={handleCloseDetails}>Close</button>
              <button className="transactions-button" onClick={handleShowTransactions}>Transaction Details</button>
              <div className="radio-buttons">
                <label>
                  <input
                    type="radio"
                    value="forward"
                    checked={selectedOption === 'forward'}
                    onChange={handleOptionChange}
                  />
                  Forward
                </label>
                <label>
                  <input
                    type="radio"
                    value="resolve"
                    checked={selectedOption === 'resolve'}
                    onChange={handleOptionChange}
                  />
                  Resolve
                </label>
              </div>
              {selectedOption === 'forward' && (
                <div className="forward-section">
                  <label>Select User:</label>
                  <select value={selectedUser} onChange={handleUserChange}>
                    <option value="">Select User</option>
                    {users.map((u) => (
                      <option key={u.userID} value={u.userID}>{u.userName}</option>
                    ))}
                  </select>
                  <label>Reply:</label>
                  <textarea
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="Enter your reply here..."
                  ></textarea>
                  <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
              )}
              {selectedOption === 'resolve' && (
                <div className="resolve-section">
                  <label>Remark:</label>
                  <textarea
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="Enter your remark here..."
                  ></textarea>
                  <button className="submit-button" onClick={handleSubmit}>Submit</button>
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
                  <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                  <p><strong>Created By:</strong> {transaction.createdByUsername || transaction.createdBy}</p>
                  <p><strong>Sent To:</strong> {transaction.sentToUsername}</p>
                  <p><strong>Time and Date:</strong> {new Date(transaction.timeAndDate).toLocaleString()}</p>
                  <p><strong>Remark:</strong> {transaction.remark}</p>
                  <p><strong>Status:</strong> {transaction.status}</p>
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={handleCloseTransactions}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllComplains;
