import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorTrailer from "./components/CursorTrailer";

function Root() {
  return (
    <>
      <div className="app-wrapper">
        <div>
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
      <CursorTrailer />
    </>
  );
}

export default Root;
