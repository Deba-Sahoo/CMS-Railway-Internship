import React from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser, user }) => {
  const navigate = useNavigate();

  const navigateToLanding = (event) => {
    event.preventDefault();
    setUser(!user);
    navigate("/landing");
  };

  return (
    <div className="login-container">
      <main className="login-main">
        <form className="login-form" onSubmit={navigateToLanding}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <input
            type="submit"
            className="login-button-lp"
            value="Submit"
          />
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
