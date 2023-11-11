import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import NavBar from "./NavBar";
import "../css/header.css";

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidthResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidthResize);

    return () => window.removeEventListener("resize", handleWidthResize);
  }, []);

  return (
    <>
      <header>{windowWidth > 500 ? <NavBar /> : <MobileNav />}</header>
    </>
  );
}

export default Header;
