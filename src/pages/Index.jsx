import React from "react";
import Landing from "../components/Landing";
import Carousel from "../components/Carousel";
import Rating from "../components/Rating";
import { useLoaderData } from "react-router-dom";

function Index() {
  return (
    <>
      <Landing />
      <Carousel />
      <Rating />
    </>
  );
}

export default Index;
