import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function SingleGalleryImage({ image, setImage }) {
  const handleClearImage = () => {
    setImage({});
  };

  return (
    <div className="single-gallery-image-container">
      <button className="close-single-gallery" onClick={handleClearImage}>
        <ClearIcon sx={{ color: "white" }} />
      </button>
      <img src={image.source} alt={image.alt} />
    </div>
  );
}

export default SingleGalleryImage;
