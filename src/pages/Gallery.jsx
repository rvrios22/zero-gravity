import React, { useEffect, useState } from "react";
import { db, auth } from "../config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import GalleryDisplay from "../components/GalleryDisplay";
import Uploader from "../components/Uploader";
import SingleGalleryImage from "../components/SingleGalleryImage";

function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [imageToDisplay, setImageToDisplay] = useState({});
  const [didImageUpload, setDidImageUpload] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

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

  const getImageToDisplayOnClick = (data) => {
    const image = galleryData.find(({ id }) => id === data.id);
    const idx = galleryData.findIndex((element) => element === image);
    setImageToDisplay({
      source: image.source,
      alt: image.alt,
      id: image.id,
      idx: idx,
    });
  };

  useEffect(() => {
    fetchGalleryData();
  }, [didImageUpload, isImageDeleted]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserIsLoggedIn(true);
      }
    });
  }, [userIsLoggedIn]);

  return (
    <div>
      <h1 className="gallery-header">Gallery</h1>
      {userIsLoggedIn && (
        <Uploader
          setDidImageUpload={setDidImageUpload}
          collectionName="galleryImages"
          isImageDeleted={isImageDeleted}
          setIsImageDeleted={setIsImageDeleted}
        />
      )}

      <GalleryDisplay
        galleryData={galleryData}
        setIsImageDeleted={setIsImageDeleted}
        isImageDeleted={isImageDeleted}
        getImageToDisplayOnClick={getImageToDisplayOnClick}
        userIsLoggedIn={userIsLoggedIn}
      />
      {Object.keys(imageToDisplay).length ? (
        <SingleGalleryImage
          galleryData={galleryData}
          image={imageToDisplay}
          setImage={setImageToDisplay}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Gallery;
