import React from "react";
import DeletePhoto from "./DeletePhoto";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../css/gallery.css";

function GalleryDisplay({
  galleryData,
  setIsImageDeleted,
  isImageDeleted,
  getImageToDisplayOnClick,
  userIsLoggedIn,
}) {
  return (
    <main>
      <div className="gallery-grid-container">
        {galleryData.map((data) => (
          <div key={data.id}>
            {userIsLoggedIn && (
              <DeletePhoto
                collectionName="galleryImages"
                photoId={data.id}
                photoName={data.name}
                setIsImageDeleted={setIsImageDeleted}
                isImageDeleted={isImageDeleted}
              />
            )}

            <button onClick={() => getImageToDisplayOnClick(data)}>
              <LazyLoadImage
                alt={data.alt}
                src={data.source}
                className="gallery-image"
                placeholderSrc="./loaderImage.jpg"
                effect="blur"
              />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default trackWindowScroll(GalleryDisplay);
