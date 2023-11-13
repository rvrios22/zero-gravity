import React from "react";
import ContactForm from "../components/ContactForm";
import GetInTouch from "../components/GetInTouch";

function Contact() {
  return (
    <div>
      <h1 className="contact-header">Get In Touch</h1>
      <div className="contact-grid-container">
        <ContactForm />
        <GetInTouch />
      </div>
    </div>
  );
}

export default Contact;
