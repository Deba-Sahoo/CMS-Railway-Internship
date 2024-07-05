import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import RaiseComplaint from "./pages/RaiseComplaint";
import HomePage from "./pages/HomePage";
import CheckStatus from "./pages/CheckStatus";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AddUser from "./pages/AddUser";
import ManageUsers from "./pages/ManageUsers";
import AllComplains from "./pages/AllComplains";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    const handlePopState = () => {
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = '/';
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Navbar user={user} />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/raise-complaint" element={<RaiseComplaint user={user} />} />
          <Route path="/check-complaint-status" element={<CheckStatus user={user} />} />
          <Route path="/add-user/:userID" element={<AddUser user={user} />} />
          <Route path="/manage-users/:userID" element={<ManageUsers user={user} />} />
          <Route path="/login" element={user === null ? <LoginPage setUser={setUser} user={user} /> : <HomePage />} />
          <Route path="/all-complains/:userID" element={<AllComplains user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/change-password" element={<ChangePassword user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
