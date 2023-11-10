import React from "react";
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="navbar-container">
      <Link to={"/"}>Home</Link>
      <Link to={"/gallery"}>Gallery</Link>
      <Link to={"/contact"}>Contact</Link>
    </div>
  );
}

export default NavBar;
