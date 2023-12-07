import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../css/header.css";

function NavBar() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      signOut(auth);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserIsLoggedIn(true);
      }
    });
  }, [userIsLoggedIn]);

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
