import React, { useState } from "react";
import CarouselEditItem from "./CarouselEditItem";

function CarouselEdit({ carouselData, setIsEditCarouselActive }) {
  const handleCarouselEdit = () => {
    setIsEditCarouselActive(false);
  };
  return (
    <div>
      <button onClick={handleCarouselEdit}>Done</button>
      {carouselData.map((data) => (
        <CarouselEditItem key={data.id} alt={data.alt} desc={data.desc} id={data.id} source={data.source}/>
      ))}
    </div>
  );
}

export default CarouselEdit;
