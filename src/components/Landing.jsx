import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import Uploader from "./Uploader";
import "../css/indexPage.css";
import DeletePhoto from "./DeletePhoto";

function Landing() {
  const [landingImage, setLandingImage] = useState();
  const [isLandingImageLoaded, setIsLandingImageLoaded] = useState(false);
  const [didImageUpload, setDidImageUpload] = useState(false);

  const fetchLandingImage = async () => {
    const landingImageRef = collection(db, "landingImage");
  };

  useEffect(() => {
    fetchLandingImage();
  }, []);

  console.log(landingImage);

  if (didImageUpload) {
    fetchLandingImage();
  }

  return (
    <div className="landing-container">
      <h1 className="landing-header">
        Welcome to Zero Gravity Aerial Photography
      </h1>
      <DeletePhoto collectionName="landingImage" photoId="" photoName="" />
      <img src="" alt="" className="landing-image" />
      <Uploader
        setDidImageUpload={setDidImageUpload}
        collectionName="landingImage"
      />
    </div>
  );
}

export default Landing;
