import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

function MobileLinks({ isMobileIconClicked }) {
  return (
    <div
      className={
        isMobileIconClicked ? "show-mobile-links mobile-links" : "mobile-links"
      }
    >
      <Link to={"/"}>Home</Link>
      <Link to={"/gallery"}>Gallery</Link>
      <Link to={"/contact"}>Contact</Link>
    </div>
  );
}

export default MobileLinks;
