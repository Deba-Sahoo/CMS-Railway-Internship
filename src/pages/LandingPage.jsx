import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ user }) => {
  const navigate = useNavigate();

  const handleAllComplaintsClick = () => {
    navigate("/all-complaints");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the Complaint Management System</h1>
      {user && (
        <button
          className="button all-complaints-button"
          onClick={handleAllComplaintsClick}
        >
          All Complaints
        </button>
      )}
    </div>
  );
};

export default LandingPage;
