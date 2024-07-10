import React, { useState } from "react";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3003/login", {
      email: email,
      password: password
    })
    .then(result => {
      if (result.data.loginStatus) {
        localStorage.setItem("valid", true);
        const { userID, userLevel, userName } = result.data;
        setUser({ userName, userID, userLevel });
        console.log(userID)
        navigate(`/all-complains/${userID}`);
      } else {
        setError(result.data.message || "Wrong credentials");
        alert(result.data.message || "Wrong credentials");
      }
    })
    .catch(err => {
      let errorMessage = "";
      if (err.response && err.response.status === 403) {
        errorMessage = err.response.data.message || "User is deactivated";
      } else {
        errorMessage = err.response?.data?.message || "Wrong Credentials/User Not Found";
      }
      setError(errorMessage);
      alert(errorMessage);
    });
  }

  return (
    <div className="login-container">
      <main className="login-main">
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button
            type="button"
            className="login-button-lp"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
