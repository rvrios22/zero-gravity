import React from "react";
import { Link } from "react-router-dom";

function MobileLinks() {
  return (
    <div className="mobile-links">
      <Link to={"/"}>Home</Link>
      <Link to={"/gallery"}>Gallery</Link>
      <Link to={"/contact"}>Contact</Link>
    </div>
  );
}

export default MobileLinks;
