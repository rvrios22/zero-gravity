import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Root() {
  return (
    <>
      <Header />
      <div className="app-wrapper">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Root;
