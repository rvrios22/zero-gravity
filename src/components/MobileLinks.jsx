import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../css/header.css";

function MobileLinks({ isMobileIconClicked }) {
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
    <div
      className={
        isMobileIconClicked ? "show-mobile-links mobile-links" : "mobile-links"
      }
    >
      <Link to={"/"}>Home</Link>
      <Link to={"/gallery"}>Gallery</Link>
      <Link to={"/contact"}>Contact</Link>
      {userIsLoggedIn && <button onClick={handleSignout}>Logout</button>}
    </div>
  );
}

export default MobileLinks;
