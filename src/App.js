import React, { useState } from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import RaiseComplaint from "./pages/RaiseComplaint";
import HomePage from "./pages/HomePage";
import CheckStatus from "./pages/CheckStatus";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AddUser from "./pages/AddUser";
import ManageUsers from "./pages/ManageUsers";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Navbar user={user}/>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/raise-complaint" element={<RaiseComplaint user={user} />} />
          <Route path="/check-complaint-status" element={<CheckStatus user={user} />} />
          <Route path="/add-user" element={<AddUser user={user} />} />
          <Route path="/manage-users" element={<ManageUsers user={user} />} />
          <Route path="/login" element={user === null ? <LoginPage setUser={setUser} user={user} /> : <HomePage/>} />
          <Route path="/landing/:userID" element={<LandingPage user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/change-password" element={<ChangePassword user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
