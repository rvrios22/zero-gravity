import React, { useState } from "react";
import CarouselEditItem from "./CarouselEditItem";
import Uploader from "./Uploader";

function CarouselEdit({
  carouselData,
  setIsEditCarouselActive,
  setDidImageUpload,
  isImageDeleted,
  setIsImageDeleted,
}) {
  const handleCarouselEdit = () => {
    setIsEditCarouselActive(false);
  };
  return (
    <div>
      <button className="carousel-activate-edit" onClick={handleCarouselEdit}>
        Done
      </button>
      {carouselData.map((data) => (
        <CarouselEditItem
          key={data.id}
          alt={data.alt}
          desc={data.desc}
          id={data.id}
          source={data.source}
          photoName={data.name}
          setDidImageUpload={setDidImageUpload}
          isImageDeleted={isImageDeleted}
          setIsImageDeleted={setIsImageDeleted}
        />
      ))}
      <h2>Upload a New Slide</h2>
      <Uploader
        collectionName="carouselImages"
        setDidImageUpload={setDidImageUpload}
        isImageDeleted={isImageDeleted}
        setIsImageDeleted={setIsImageDeleted}
      />
    </div>
  );
}

export default CarouselEdit;
