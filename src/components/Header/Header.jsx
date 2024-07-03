import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);


  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    setDropdown(false);
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setUser(null);
      console.log("User logged out");
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="container-flex">
        <div className="logo">
          <span className="logo-span">LOGO</span>
        </div>
        {user === null && (
          <button
            className="login-button"
            onClick={() => {
              if (location.pathname === "/") {
                navigate("/login");
                setUser(user);
              } else navigate("/");
            }}
          >
            <span className="login-span">LOGIN</span>
          </button>
        )}
        {user !== null && (
          <button className="login-button" onClick={handleDropdown}>
            WELCOME
            {dropdown && (
              <div className="dropdown">
                <ul>
                  {/* <li>
                    <button onClick={() => navigate("/profile")}>
                      Profile
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate("/change-password")}>
                      Change Password
                    </button>
                  </li> */}
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
