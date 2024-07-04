import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';

const AddUser = ({ user }) => {
  const [formData, setFormData] = useState({
    username: '',
    pfno: '',
    password: '',
    confirmPassword: '',
    phone: '',
    email: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, pfno, password, confirmPassword, phone, email } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3003/addUser', {
        userName: username,
        pf: pfno,
        password,
        contact: phone,
        email,
        userLevel: 1
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user');
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="add-user-form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-user-form-group">
          <label htmlFor="pfno">PF No.</label>
          <input
            type="text"
            id="pfno"
            name="pfno"
            value={formData.pfno}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-user-form-group">
          <label htmlFor="phone">Phone No.</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-user-form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-user-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-user-form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
