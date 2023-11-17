import React, { useEffect, useRef, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import DeletePhoto from "./DeletePhoto";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../css/gallery.css";

function GalleryDisplay({ didImageUpload, setDidImageUpload }) {
  const [galleryData, setGalleryData] = useState([]);

  const fetchGalleryData = async () => {
    const galleryDataRef = collection(db, "galleryImages");
    const galleryDataQuery = query(galleryDataRef, orderBy("alt", "asc"));
    try {
      const galleryDataSnapshot = await getDocs(galleryDataQuery);
      const filteredGalleryData = galleryDataSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGalleryData(filteredGalleryData);
    } catch (err) {
      console.error("error: ", err);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  if (didImageUpload) {
    fetchGalleryData();
    setDidImageUpload(false);
  }
  return (
    <main>
      <div className="gallery-grid-container">
        {galleryData.map((data) => (
          <div key={data.id}>
            <DeletePhoto collection='galleryImages' photoId={data.id} photoName={data.name} />
            <LazyLoadImage
              alt={data.alt}
              src={data.source}
              className="gallery-image"
              placeholderSrc="./loaderImage.jpg"
              effect="blur"
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export default trackWindowScroll(GalleryDisplay);
