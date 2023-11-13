import React from "react";
import GalleryUploader from "../components/GalleryUploader";
import GalleryDisplay from "../components/GalleryDisplay";

function Gallery() {
  return (
    <div>
      <h1 className="gallery-header">Gallery</h1>
      {/* <GalleryUploader /> */}
      <GalleryDisplay />
    </div>
  );
}

export default Gallery;
