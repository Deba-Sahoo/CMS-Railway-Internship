import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    if (user) {
      setDropdown(!dropdown);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("valid");
    setUser(null);
    navigate("/");
    setDropdown(false);
  };

  return (
    <header className="header">
      <div className="container-flex">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>
        {user === null && (
          <button
            className="login-button"
            onClick={() => {
              location.pathname === "/" ? navigate("/login") : navigate("/");
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
