import React, { useState } from "react";
import "../Styles/navbar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import i1 from "../Images/images-removebg-preview.png";

const Navbar = () => {
  let loc = useLocation();
  let path = loc.pathname;
  let bool = path.startsWith("/adminportal");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, session data, etc.)
    localStorage.removeItem("Id");
    localStorage.clear();
    console.log("User logged out");
    navigate("/"); // Redirect to the logout or home page
  };
  return (
    <>
      <div className="navbar">
        {bool ? (
          <>
            <ul>
              <li>
                <img src={i1} alt="Logo" className="logo" />
              </li>
              <li>
                <NavLink to={"/adminportal/"}>HOME</NavLink>
              </li>
              <li>
                <NavLink to={"/adminportal/books"}>BOOKS</NavLink>
              </li>
              <li>
                <NavLink to={"/adminportal/about"}>ABOUT</NavLink>
              </li>
              <li>
                <NavLink to={"/adminportal/addbooks"}>ADD BOOKS</NavLink>
              </li>
              <li>
                <NavLink to={"/adminportal/users"}>USERS</NavLink>
              </li>
              <li>
                <NavLink to={"/adminportal/addusers"}>ADD USERS</NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmation(true);
                  }}
                >
                  LOGOUT
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <li>
                <img src={i1} alt="" className="logo" />
              </li>
              <li>
                <NavLink to={"/userportal/"}>HOME</NavLink>
              </li>
              <li>
                <NavLink to={"/userportal/books"}>BOOKS</NavLink>
              </li>
              <li>
                <NavLink to={"/userportal/about"}>ABOUT</NavLink>
              </li>
              <li>
                <NavLink to={"/userportal/profile"}>PROFILE</NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmation(true);
                  }}
                >
                  LOGOUT
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div> 
      {showConfirmation && (
        <div className="confirmation-modal">
          <p className="title" >Are you sure you want to logout?</p>
          <div className="buttons">
          <button className="yes"  onClick={handleLogout}>Yes</button>
          <button className="no" onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
