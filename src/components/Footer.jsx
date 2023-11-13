import React from "react";
import "../css/footer.css";

function Footer() {
  return (
    <>
      <footer className="footer">
        <p>
          zerogravityaerialphotography.com was developed and is maintained by{" "}
          <a
            href="https://riosdevelopment.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rios Development
          </a>
          {" | "}
          Favicon was provided by{" "}
          <a
            href="https://icons8.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            icons8.com
          </a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
