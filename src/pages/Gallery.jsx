import React, { useState } from "react";
import GalleryUploader from "../components/GalleryUploader";
import GalleryDisplay from "../components/GalleryDisplay";

function Gallery() {
  const [didImageUpload, setDidImageUpload] = useState(false);
  return (
    <div>
      <h1 className="gallery-header">Gallery</h1>
      <GalleryUploader
        didImageUpload={didImageUpload}
        setDidImageUpload={setDidImageUpload}
      />
      <GalleryDisplay
        didImageUpload={didImageUpload}
        setDidImageUpload={setDidImageUpload}
      />
    </div>
  );
}

export default Gallery;
