import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="profile-content">
        <h2>User Profile</h2>
        <div className="profile-details">
          <div className="profile-item">
            <label>Name:</label>
            <span>John Doe</span>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span>john.doe@example.com</span>
          </div>
          <div className="profile-item">
            <label>Phone:</label>
            <span>(123) 456-7890</span>
          </div>
          <div className="profile-item">
            <label>Address:</label>
            <span>123 Main St, Anytown, USA</span>
          </div>
          <div className="profile-item">
            <label>Member Since:</label>
            <span>January 1, 2020</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
