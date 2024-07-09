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
    navigate(`/add-user/${user.userId}`);
  };

  const handleManageUsersClick = () => {
    navigate(`/manage-users/${user.userId}`);
  };

  const handleAllComplaintsClick = () => {
    navigate(`/all-complains/${user.userId}`);
  };

  const handleSentComplaintsClick = () => {
    navigate(`/sent-complaints/${user.userId}`);
  };

  const handleResolvedComplaintsClick = () => {
    navigate(`/resolve-complaints/${user.userId}`);
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
                    location.pathname === "/all-complains/:userID" ? "active" : ""
                  }`}
                  onClick={handleAllComplaintsClick}
                >
                  All Complaints
                </button>
              </li>
              <li>
                <button
                  className={`button nav-button ${
                    location.pathname === "/sent-complaints/:userID" ? "active" : ""
                  }`}
                  onClick={handleSentComplaintsClick}
                >
                  Sent Complaints
                </button>
              </li>
              <li>
                <button
                  className={`button nav-button ${
                    location.pathname === "/resolve-complaints/:userID" ? "active" : ""
                  }`}
                  onClick={handleResolvedComplaintsClick}
                >
                  Resolved Complaints
                </button>
              </li>
              {user.userLevel === 1 && (
                <>
                  <li>
                    <button
                      className={`button nav-button ${
                        location.pathname === "/add-user/:userID" ? "active" : ""
                      }`}
                      onClick={handleAddUserClick}
                    >
                      Add User
                    </button>
                  </li>
                  <li>
                    <button
                      className={`button nav-button ${
                        location.pathname === "/manage-users/:userID" ? "active" : ""
                      }`}
                      onClick={handleManageUsersClick}
                    >
                      Manage Users
                    </button>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
