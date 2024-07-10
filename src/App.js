import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import SentComplaints from "./pages/SentComplaints";
import ResolvedComplaints from "./pages/ResolvedComplaints";
import Reports from "./pages/Reports";
import withAuth from "./pages/withAuth";

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
          <Route path="/raise-complaint" element={(<RaiseComplaint user={user} />)} />
          <Route path="/check-complaint-status" element={(<CheckStatus user={user} />)} />
          <Route path="/add-user/:userID" element={withAuth(<AddUser user={user} />)} />
          <Route path="/manage-users/:userID" element={withAuth(<ManageUsers user={user} />)} />
          <Route path="/all-complains/:userID" element={withAuth(<AllComplains user={user} />)} />
          <Route path="/sent-complaints/:userID" element={withAuth(<SentComplaints user={user} />)} />
          <Route path="/resolve-complaints/:userID" element={withAuth(<ResolvedComplaints user={user} />)} />
          <Route path="/report/:userID" element={withAuth(<Reports user={user} />)} />
          <Route path="/profile" element={withAuth(<Profile user={user} />)} />
          <Route path="/change-password" element={withAuth(<ChangePassword user={user} />)} />

          {/* Login page should not be protected */}
          <Route path="/login" element={user === null ? <LoginPage setUser={setUser} user={user} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
