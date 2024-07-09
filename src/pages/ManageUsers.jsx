import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ManageUsers.css";

const ManageUsers = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user details if userId is set
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/getUserDetails/${userId}`);
      setUserData(response.data); // Assuming response.data contains user details
      setError('');
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserData(null);
      setError('User not found or error fetching data.');
    }
  };

  const handleToggleActivation = async () => {
    try {
      const newStatus = userData.isActiveUser === 'Y' ? 'N' : 'Y';
      const response = await axios.put(`http://localhost:3003/toggleUserActivation/${userId}`, { newStatus });
      console.log(response.data); // Log success message or handle response data
      // Refresh user details after toggle
      fetchUserData();
      alert(`User ${newStatus === 'Y' ? 'activated' : 'deactivated'} successfully.`);
    } catch (error) {
      console.error('Error toggling user activation:', error);
      // Handle error, e.g., show error message to user
    }
  };
  
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <div className="manage-section">
        <h3>User Details</h3>
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <input
            type="text"
            value={userId}
            onChange={handleUserIdChange}
            placeholder="Enter userId"
            required
          />
        </form>
        {userData && (
          <div className="user-details">
            <p>User ID: {userData.userID}</p>
            <p>User Name: {userData.userName}</p>
            <p>Email: {userData.email}</p>
            <p>Contact: {userData.contact}</p>
            <p>User Level: {userData.userLevel}</p>
            <p>Active Status: {userData.isActiveUser === 'Y' ? 'Active' : 'Inactive'}</p>
            <button
              className="manage-button"
              onClick={handleToggleActivation}
            >
              {userData.isActiveUser === 'Y' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ManageUsers;
