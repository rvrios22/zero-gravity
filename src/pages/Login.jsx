import React, { useState, usestate } from "react";
import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleEmailChange = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setUser({ email: "", password: "" });
      });
  };

  return (
    <>
      <h1>Please Login</h1>
      <form action="PUT">
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          required
          onChange={handleEmailChange}
          value={user.email}
          autoComplete="email"
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          required
          onChange={handlePasswordChange}
          value={user.password}
          autoComplete="current-password"
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </>
  );
}

export default Login;
