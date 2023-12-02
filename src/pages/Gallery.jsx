import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import GalleryDisplay from "../components/GalleryDisplay";
import Uploader from "../components/Uploader";
import SingleGalleryImage from "../components/SingleGalleryImage";

function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [onClickImageId, setOnClickImageId] = useState("");
  const [imageToDisplay, setImageToDisplay] = useState({ });
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

  const findImageById = () => {
    const image = galleryData.find((item) => item.id === onClickImageId);
    console.log(image)
    setImageToDisplay({
      image
    })
  };

  const getIdOnClick = (data) => {
    setOnClickImageId(data.id);
    const image = galleryData.find((item) => item.id === onClickImageId);
    setImageToDisplay({
      source: image.source,
      alt: image.alt
    })
  };

  console.log(imageToDisplay)

  useEffect(() => {
    fetchGalleryData();
  }, [didImageUpload, isImageDeleted]);
  return (
    <div>
      <h1 className="gallery-header">Gallery</h1>
      <Uploader
        setDidImageUpload={setDidImageUpload}
        collectionName="galleryImages"
        isImageDeleted={isImageDeleted}
        setIsImageDeleted={setIsImageDeleted}
      />
      <GalleryDisplay
        galleryData={galleryData}
        setIsImageDeleted={setIsImageDeleted}
        isImageDeleted={isImageDeleted}
        getIdOnClick={getIdOnClick}
      />
      <SingleGalleryImage
        galleryData={galleryData}
        onClickImageId={onClickImageId}
        image={imageToDisplay}
      />
    </div>
  );
}

export default Gallery;
