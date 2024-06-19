import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRaiseComplaintClick = () => {
    navigate("/raise-complaint");
  };

  const handleCheckComplaintStatusClick = () => {
    navigate("/check-complaint-status");
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <button
              className={`button nav-button ${
                location.pathname === "/raise-complaint" ? "active" : ""
              }`}
              onClick={handleRaiseComplaintClick}
            >
              Raise Complaint
            </button>
          </li>
          <li>
            <button
              className={`button nav-button ${
                location.pathname === "/check-complaint-status" ? "active" : ""
              }`}
              onClick={handleCheckComplaintStatusClick}
            >
              Check Complaint Status
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
