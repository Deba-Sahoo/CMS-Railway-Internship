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
    navigate(`/add-user/${user.userID}`);
  };

  const handleManageUsersClick = () => {
    navigate(`/manage-users/${user.userID}`);
  };

  const handleAllComplaintsClick = () => {
    navigate(`/all-complains/${user.userID}`);
  };

  const handleSentComplaintsClick = () => {
    navigate(`/sent-complaints/${user.userID}`);
  };

  const handleResolvedComplaintsClick = () => {
    navigate(`/resolve-complaints/${user.userID}`);
  };

  const handleReportClick = () => {
    navigate(`/report/${user.userID}`);
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
                    location.pathname === `/all-complains/${user.userId}` ? "active" : ""
                  }`}
                  onClick={handleAllComplaintsClick}
                >
                  All Complaints
                </button>
              </li>
              <li>
                <button
                  className={`button nav-button ${
                    location.pathname === `/sent-complaints/${user.userId}` ? "active" : ""
                  }`}
                  onClick={handleSentComplaintsClick}
                >
                  Sent Complaints
                </button>
              </li>
              <li>
                <button
                  className={`button nav-button ${
                    location.pathname === `/resolve-complaints/${user.userId}` ? "active" : ""
                  }`}
                  onClick={handleResolvedComplaintsClick}
                >
                  Resolved Complaints
                </button>
              </li>
              {user.userLevel === 0 && (
                <>
                  <li>
                    <button
                      className={`button nav-button ${
                        location.pathname === `/add-user/${user.userId}` ? "active" : ""
                      }`}
                      onClick={handleAddUserClick}
                    >
                      Add User
                    </button>
                  </li>
                  <li>
                    <button
                      className={`button nav-button ${
                        location.pathname === `/manage-users/${user.userId}` ? "active" : ""
                      }`}
                      onClick={handleManageUsersClick}
                    >
                      Manage Users
                    </button>
                  </li>
                </>
              )}
              <li>
                <button
                  className={`button nav-button ${
                    location.pathname === `/report/${user.userID}` ? "active" : ""
                  }`}
                  onClick={handleReportClick}
                >
                  Reports
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
