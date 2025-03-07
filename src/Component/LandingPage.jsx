import React, { useState } from "react";
import "../Styles/landingpage.css";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";

const LandingPage = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  const toggleLogin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="landingpage">
      <div className="container">
        <div className="btn-container">
          <button
            onClick={toggleLogin}
            className={isAdmin ? "adminBtn activeBtn" : "userBtn"}
          >
            {isAdmin ? "Admin Login" : "User Login"}
          </button>
        </div>
        <h2 className="heading">{isAdmin ? "ADMIN LOGIN PAGE" : "USER LOGIN PAGE"}</h2>
        <div className="form-container">
          {isAdmin ? <AdminLogin /> : <UserLogin />}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
