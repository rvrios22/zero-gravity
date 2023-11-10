import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MobileLinks from "./MobileLinks";

function MobileNav() {
  const [isMobileIconClicked, setIsMobileIconClicked] = useState(false);

  const handleIconClick = () => {
    setIsMobileIconClicked(!isMobileIconClicked);
  };
  return (
    <>
      {isMobileIconClicked && <MobileLinks />}

      <button onClick={handleIconClick} className="mobile-nav-icon">
        {!isMobileIconClicked ? <MenuIcon /> : <CloseIcon />}
      </button>
    </>
  );
}

export default MobileNav;
