import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MobileLinks from "./MobileLinks";
import { useLocation } from "react-router-dom";
import "../css/header.css";

function MobileNav() {
  const [isMobileIconClicked, setIsMobileIconClicked] = useState(false);
  const location = useLocation();
  const handleIconClick = () => {
    setIsMobileIconClicked(!isMobileIconClicked);
  };

  useEffect(() => {
    setIsMobileIconClicked(false);
  }, [location]);
  return (
    <>
      {<MobileLinks isMobileIconClicked={isMobileIconClicked} />}

      <button onClick={handleIconClick} className="mobile-nav-icon">
        {!isMobileIconClicked ? <MenuIcon /> : <CloseIcon />}
      </button>
    </>
  );
}

export default MobileNav;
