import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ManageUsers.css";

const ManageUsers = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [level1Users, setLevel1Users] = useState([]);

  useEffect(() => {
    // Fetch user details if userId is set
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    // Fetch Level 1 users on component mount
    fetchLevel1Users();
  }, []);

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

  const fetchLevel1Users = async () => {
    try {
      const response = await axios.get('http://localhost:3003/getLevel0and1');
      setLevel1Users(response.data);
      console.log(response.data) // Assuming response.data contains a list of Level 1 users
    } catch (error) {
      console.error('Error fetching Level 1 users:', error);
    }
  };

  // const handleToggleActivation = async (userId, currentStatus) => {
  //   try {
  //     const newStatus = currentStatus === 'Y' ? 'N' : 'Y';
  //     const response = await axios.put(`http://localhost:3003/toggleUserActivation/${userId}`, { newStatus });
  //     console.log(response.data); // Log success message or handle response data
  //     // Refresh user details after toggle
  //     if (userId === userData?.userID) {
  //       fetchUserData();
  //     }
  //     fetchLevel1Users();
  //     alert(`User ${newStatus === 'Y' ? 'activated' : 'deactivated'} successfully.`);
  //   } catch (error) {
  //     console.error('Error toggling user activation:', error);
  //     // Handle error, e.g., show error message to user
  //   }
  // };

  const handleToggleActivation = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Y' ? 'N' : 'Y';
      const response = await axios.put(`http://localhost:3003/toggleUserActivation/${userId}`, { newStatus });
      console.log(response.data); // Log success message or handle response data
      // Refresh user details after toggle
      if (userId === userData?.userID) {
        fetchUserData();
      }
      fetchLevel1Users();
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
            <p>Status: {userData.isActiveUser === 'Y' ? 'Active' : 'Inactive'}</p>
            <button
              className="manage-button"
              onClick={() => handleToggleActivation(userData.userID, userData.isActiveUser)}
            >
              {userData.isActiveUser === 'Y' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="manage-section">
        <h3>Level 1 Users</h3>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {level1Users.map((user) => (
              <tr key={user.userID}>
                <td>{user.userID}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.isActiveUser === 'Y' ? 'Active' : 'Inactive'}</td>
                <td>
                  <button
                    className="manage-button"
                    onClick={() => handleToggleActivation(user.userID, user.isActiveUser)}
                  >
                    {user.isActiveUser === 'Y' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
