import React, { useState } from 'react';
import axios from 'axios';
import "./ManageUsers.css";

const ManageUsers = () => {
  const [activateUser, setActivateUser] = useState('');
  const [deactivateUser, setDeactivateUser] = useState('');

  const handleActivateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:3003/activateUser/${activateUser}`);
      console.log(response.data); // Log success message or handle response data
    } catch (error) {
      console.error('Error activating user:', error);
      // Handle error, e.g., show error message to user
    }
  };

  const handleDeactivateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:3003/deactivateUser/${deactivateUser}`);
      console.log(response.data); // Log success message or handle response data
    } catch (error) {
      console.error('Error deactivating user:', error);
      alert("Invalid User");
      // Handle error, e.g., show error message to user
    }
  };

  const handleActivateChange = (e) => {
    setActivateUser(e.target.value);
  };

  const handleDeactivateChange = (e) => {
    setDeactivateUser(e.target.value);
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <div className="manage-section">
        <h3>Activate User</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleActivateUser(); }}>
          <input
            type="text"
            value={activateUser}
            onChange={handleActivateChange}
            placeholder="Enter userId"
            required
          />
          <button type="submit" className="manage-button">Activate</button>
        </form>
      </div>
      <div className="manage-section">
        <h3>Deactivate User</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleDeactivateUser(); }}>
          <input
            type="text"
            value={deactivateUser}
            onChange={handleDeactivateChange}
            placeholder="Enter userId"
            required
          />
          <button type="submit" className="manage-button">Deactivate</button>
        </form>
      </div>
    </div>
  );
};

export default ManageUsers;
