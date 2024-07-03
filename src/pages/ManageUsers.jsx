import React, { useState } from 'react';
import './ManageUsers.css';

const ManageUsers = ({ user }) => {
  const [activateUser, setActivateUser] = useState('');
  const [deactivateUser, setDeactivateUser] = useState('');

  const handleActivateChange = (e) => {
    setActivateUser(e.target.value);
  };

  const handleDeactivateChange = (e) => {
    setDeactivateUser(e.target.value);
  };

  const handleActivateSubmit = (e) => {
    e.preventDefault();
    // Handle activate user logic here
    console.log(`Activating user: ${activateUser}`);
  };

  const handleDeactivateSubmit = (e) => {
    e.preventDefault();
    // Handle deactivate user logic here
    console.log(`Deactivating user: ${deactivateUser}`);
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <div className="manage-section">
        <h3>Activate User</h3>
        <form onSubmit={handleActivateSubmit}>
          <input
            type="text"
            value={activateUser}
            onChange={handleActivateChange}
            placeholder="Enter username or ID"
            required
          />
          <button type="submit" className="manage-button">Activate</button>
        </form>
      </div>
      <div className="manage-section">
        <h3>Deactivate User</h3>
        <form onSubmit={handleDeactivateSubmit}>
          <input
            type="text"
            value={deactivateUser}
            onChange={handleDeactivateChange}
            placeholder="Enter username or ID"
            required
          />
          <button type="submit" className="manage-button">Deactivate</button>
        </form>
      </div>
    </div>
  );
};

export default ManageUsers;
