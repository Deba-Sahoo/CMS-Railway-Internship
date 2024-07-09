import React from "react";
import { NavLink, Navigate, useNavigate} from "react-router-dom";


const withAuth = (children) => {
 return localStorage.getItem("valid") ? children : <Navigate to="/"/>};

export default withAuth;
