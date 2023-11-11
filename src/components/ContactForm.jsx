import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "../css/contact.css";

function ContactForm() {
  const form = useRef();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const toastSuccess = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const toastError = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: true,
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        (res) => {
          console.log(res.text);
          toastSuccess.fire({
            icon: "success",
            title: "Thanks for your message!",
            text: "I'll reach back out to you as soon as possible.",
            background: "#F5F6F7",
            color: "black",
          });
          setUsername("");
          setUserEmail("");
          setUserMessage("");
        },
        (error) => {
          console.log(error.text);
          toastError.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong, please try again later.",
            background: "#F5F6F7",
            color: "black",
          });
          setUsername("");
          setUserEmail("");
          setUserMessage("");
        }
      );
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <label className="contact-labels" htmlFor="user_name">
          Name
        </label>
        <input
          className="contact-inputs"
          placeholder="What's Your Name?"
          id="user_name"
          type="text"
          name="user_name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="contact-labels" htmlFor="user_email">
          Email
        </label>
        <input
          className="contact-inputs"
          placeholder="What's Your Email?"
          id="user_email"
          type="email"
          name="user_email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <label className="contact-labels">Message</label>
        <textarea
          className="contact-inputs"
          placeholder="How can I help you?"
          name="message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          rows={4}
          cols={4}
          required
        />
        <button className="contact-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
