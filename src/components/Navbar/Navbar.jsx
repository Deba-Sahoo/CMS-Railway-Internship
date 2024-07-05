import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRaiseComplaintClick = () => {
    navigate("/raise-complaint");
  };

  const handleCheckComplaintStatusClick = () => {
    navigate("/check-complaint-status");
  };

  const handleAddUserClick = () => {
    navigate("/add-user");
  };

  const handleManageUsersClick = () => {
    navigate("/manage-users");
  };

  const handleAllComplaintsClick = () => {
    navigate("/all-complains");
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {!user ? (
            <>
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
            </>
          ) : (
            <>
            <li>
                <button
                  className={`button nav-button ${
                    location.pathname === "/landing" ? "active" : ""
                  }`}
                  onClick={handleAllComplaintsClick}
                >
                  All Complaints
                </button>
              </li>
              <li>
                <button
                  className={`button nav-button ${
                    location.pathname === "/add-user" ? "active" : ""
                  }`}
                  onClick={handleAddUserClick}
                >
                  Add User
                </button>
              </li>
              <li>
                <button
                  className={`button nav-button ${
                    location.pathname === "/manage-users" ? "active" : ""
                  }`}
                  onClick={handleManageUsersClick}
                >
                  Manage Users
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;