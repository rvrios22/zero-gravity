import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import Uploader from "./Uploader";
import "../css/indexPage.css";
import DeletePhoto from "./DeletePhoto";

function Landing() {
  const [landingImage, setLandingImage] = useState([]);
  const [isLandingImageLoaded, setIsLandingImageLoaded] = useState(false);
  const [didImageUpload, setDidImageUpload] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const fetchLandingImage = async () => {
    const landingImageRef = collection(db, "landingImage");
    const landingImageQuery = query(landingImageRef);
    try {
      const landingDataSnapshot = await getDocs(landingImageQuery);
      const filteredLandingData = landingDataSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLandingImage(filteredLandingData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLandingImage();
  }, []);

  if (didImageUpload) {
    fetchLandingImage();
  }

  if (!landingImage) {
    setIsLandingImageLoaded(true);
  }

  if (isImageDeleted) {
    setIsLandingImageLoaded(false);
  }

  return (
    <div className="landing-container">
      <h1 className="landing-header">
        Welcome to Zero Gravity Aerial Photography
      </h1>
      {landingImage.map((img) => (
        <div key={img.id}>
          <DeletePhoto
            collectionName="landingImage"
            photoId={img.id}
            photoName={img.name}
            setIsImageDeleted={setIsImageDeleted}
          />
          {!isLandingImageLoaded ? (
            <img src={img.source} alt={img.alt} className="landing-image" />
          ) : (
            <img src="" alt="" />
          )}
        </div>
      ))}

      <Uploader
        setDidImageUpload={setDidImageUpload}
        collectionName="landingImage"
      />
    </div>
  );
}

export default Landing;
