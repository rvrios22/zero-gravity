import React, { useState } from "react";

function SingleGalleryImage({ galleryData, onClickImageId }) {
  const [imageToDisplay, setImageToDisplay] = useState({ source: "", alt: "" });

  const findImageById = () => {
    console.log(galleryData.find((item) => item.id === onClickImageId))
  }
  return <img src="" alt="" />;
}

export default SingleGalleryImage;
