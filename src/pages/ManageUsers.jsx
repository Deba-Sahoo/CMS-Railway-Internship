import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Manage Users</h2>
      <div>
        <h3>Activate User</h3>
        <input
          type="text"
          value={activateUser}
          onChange={handleActivateChange}
          placeholder="Enter username or ID"
          required
        />
        <button onClick={handleActivateUser}>Activate</button>
      </div>
      <div>
        <h3>Deactivate User</h3>
        <input
          type="text"
          value={deactivateUser}
          onChange={handleDeactivateChange}
          placeholder="Enter username or ID"
          required
        />
        <button onClick={handleDeactivateUser}>Deactivate</button>
      </div>
    </div>
  );
};

export default ManageUsers;
