import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";

function GetInTouch() {
  return (
    <div className="communcation-container">
      <p>
        Feel free to get in touch with me. I am always open to discussing new
        projects, creative ideas, or opportunities to be part of your visions.
      </p>
      <div className="icons-container">
        <a href="tel:+17602189344" className="icon">
          <PhoneIcon sx={{fontSize:'2em'}}/>
        </a>
        <a
          href="https://instagram.com/zerogravityaerialphotography"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <InstagramIcon sx={{fontSize:'2em'}}/>
        </a>
        <a
          href="https://www.google.com/search?q=Zero+Gravity+Aerial+Photography%2C+Washington+St%2C+La+Quinta%2C+CA+92253&rlz=1C5CHFA_enUS753US753&oq=zero+gravi&aqs=chrome.0.69i59l2j69i57j0i433i512j0i512j69i60j69i61l2.4254j0j7&sourceid=chrome&ie=UTF-8#ip=1"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <GoogleIcon sx={{fontSize:'2em'}}/>
        </a>
      </div>
    </div>
  );
}

export default GetInTouch;
