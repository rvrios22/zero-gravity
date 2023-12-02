import React, { useState } from "react";

function SingleGalleryImage({ image }) {

  return <img src={image.source} alt={image.alt} />;
}

export default SingleGalleryImage;
