import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function SingleGalleryImage({ image, setImage, galleryData }) {
  const [currentIdx, setCurrentIdx] = useState(image.idx);
  const handleClearImage = () => {
    setImage({});
  };


  return (
    <div className="single-gallery-image-container">
      <button className="close-single-gallery" onClick={handleClearImage}>
        <ClearIcon sx={{ color: "black" }} />
      </button>
      {galleryData.map((img, idx) => (
        <img
          className={idx === currentIdx ? "single-image active" : "slide"}
          src={img.source}
        />
      ))}
    </div>
  );
}

export default SingleGalleryImage;
