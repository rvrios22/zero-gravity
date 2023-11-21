import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import DeletePhoto from "./DeletePhoto";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../css/gallery.css";
import Uploader from "./Uploader";

function GalleryDisplay() {
  const [galleryData, setGalleryData] = useState([]);
  const [didImageUpload, setDidImageUpload] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);

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
  }, [didImageUpload, isImageDeleted]);

  return (
    <main>
      <Uploader
        setDidImageUpload={setDidImageUpload}
        collectionName="galleryImages"
        isImageDeleted={isImageDeleted}
        setIsImageDeleted={setIsImageDeleted}
      />
      <div className="gallery-grid-container">
        {galleryData.map((data) => (
          <div key={data.id}>
            <DeletePhoto
              collectionName="galleryImages"
              photoId={data.id}
              photoName={data.name}
              setIsImageDeleted={setIsImageDeleted}
              isImageDeleted={isImageDeleted}
            />
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
