import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../css/gallery.css";

function GalleryDisplay() {
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

  return (
    <main>
      <div className="gallery-grid-container">
        {galleryData.map((data) => (
          <div key={data.id}>
            <img src={data.source} alt={data.alt} className="gallery-image" loading="lazy"/> 
            {/* <LazyLoadImage 
              alt={data.alt}
              src={data.source}
              placeholderSrc="./loaderImage.jpg"
            /> */}
          </div>
        ))}
      </div>
    </main>
  );
}

export default GalleryDisplay;
