import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../css/header.css";

function NavBar() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserIsLoggedIn(true);
    }
  });

  const handleSignout = () => {
    signOut(auth);
    navigate(0);
  };

  return (
    <div className="navbar-container">
      {userIsLoggedIn && (
        <div className="greeter-container">
          <button onClick={handleSignout} className="signout">
            Logout
          </button>
          <p className="greeter">Hello, Travis</p>
        </div>
      )}

      <div className="navbar-links-container">
        <Link to={"/"}>Home</Link>
        <Link to={"/gallery"}>Gallery</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
    </div>
  );
}

export default NavBar;
