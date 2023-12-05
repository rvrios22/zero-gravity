import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function SingleGalleryImage({ image, setImage, galleryData }) {
  const [currentIdx, setCurrentIdx] = useState(image.idx);
  const handleClearImage = () => {
    setImage({});
  };

  const nextSlide = () => {
    setCurrentIdx(currentIdx === galleryData.length - 1 ? 0 : currentIdx + 1);
  };

  const prevSlide = () => {
    setCurrentIdx(currentIdx === 0 ? galleryData.length - 1 : currentIdx - 1);
  };

  return (
    <div className="single-gallery-image-container">
      <button className="close-single-gallery" onClick={handleClearImage}>
        <ClearIcon sx={{ color: "black", fontSize: "2em" }} />
      </button>
      {galleryData.map((img, idx) => (
        <img
          className={idx === currentIdx ? "single-image active" : "slide"}
          src={img.source}
        />
      ))}
      <div className="single-arrow-container">
        <button onClick={prevSlide}>
          <KeyboardArrowLeftIcon sx={{ fontSize: '2.5em', color: 'black'}} />
        </button>
        <button onClick={nextSlide}>
          <KeyboardArrowRightIcon sx={{ fontSize: '2.5em', color: 'black'}} />
        </button>
      </div>
    </div>
  );
}

export default SingleGalleryImage;
