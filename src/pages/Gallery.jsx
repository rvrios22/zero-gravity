import React, { useState } from "react";
import GalleryDisplay from "../components/GalleryDisplay";

function Gallery() {
  const [didImageUpload, setDidImageUpload] = useState(false);
  return (
    <div>
      <h1 className="gallery-header">Gallery</h1>
      <GalleryDisplay
        didImageUpload={didImageUpload}
        setDidImageUpload={setDidImageUpload}
      />
    </div>
  );
}

export default Gallery;
