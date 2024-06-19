import React from "react";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";

const LoginPage = ({setUser,user}) => {
  const navigate = useNavigate();

  const navigateToLanding = () => {
    setUser("user1");
    navigate("/landing");
  };

  return (
    <div className="login-container">
      <main className="login-main">
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button
            type="button"
            className="login-button-lp"
            onClick={navigateToLanding}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
