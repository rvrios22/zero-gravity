import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import Uploader from "./Uploader";
import "../css/indexPage.css";
import DeletePhoto from "./DeletePhoto";

function Landing({ userIsLoggedIn }) {
  const [landingImage, setLandingImage] = useState([]);
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
  }, [didImageUpload, isImageDeleted]);

  return (
    <div className="landing-container">
      <h1 className="landing-header">
        Welcome to Zero Gravity Aerial Photography
      </h1>
      {landingImage.map((image) => (
        <div key={image.id}>
          {userIsLoggedIn && (
            <DeletePhoto
              collectionName="landingImage"
              photoId={image.id}
              photoName={image.name}
              isImageDeleted={isImageDeleted}
              setIsImageDeleted={setIsImageDeleted}
            />
          )}

          <img src={image.source} alt={image.alt} className="landing-image" />
        </div>
      ))}
      {userIsLoggedIn && (
        <Uploader
          setDidImageUpload={setDidImageUpload}
          isImageDeleted={isImageDeleted}
          collectionName="landingImage"
          setIsImageDeleted={setIsImageDeleted}
        />
      )}
    </div>
  );
}

export default Landing;
