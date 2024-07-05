// Imports ---------------------------------------------------------------
import React, {useState}  from "react";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({setUser,user}) => {
  const navigate = useNavigate();

  // creating a hook state for the input data ---------------------------
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3003/login", {
        userName: userName,
        password: password,
      });
      const { userId } = response.data;
      setUser({ userName, userId });
      navigate(`/all-complains/${userId}`);
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <main className="login-main">
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="userName">Username</label>
            <input type="text" id="userName" name="userName" onChange={(e) => setUserName(e.target.value)} />
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
