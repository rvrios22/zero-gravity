import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../css/gallery.css";

function GalleryDisplay() {
  const [galleryData, setGalleryData] = useState([]);

  const fetchGalleryData = async () => {
    const galleryDataRef = collection(db, "galleryImages");
    const galleryDataQuery = query(galleryDataRef, orderBy('alt', 'asc'));
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
      {galleryData.map((data) => (
        <div key={data.id}>
          <img src={data.source} alt={data.alt} />
        </div>
      ))}
    </main>
  );
}

export default GalleryDisplay;
