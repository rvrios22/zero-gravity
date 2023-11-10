import React, { useEffect, useState } from "react";
import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";
import '../index.css'

function Landing() {
  const [landingImage, setLandingImage] = useState();
  const [isLandingImageLoaded, setIsLandingImageLoaded] = useState(false);

  const fetchLandingImage = async () => {
    const imageRef = doc(db, "landingImage", "SY7egs2730L0mZkCyoqB");
    try {
      const imageSnap = await getDoc(imageRef);
      if (imageSnap) {
        const imageData = imageSnap.data();
        setLandingImage(imageData);
        setIsLandingImageLoaded(true);
      }
    } catch (err) {
      console.error("error: ", err);
    }
  };

  useEffect(() => {
    fetchLandingImage();
  }, []);

  return (
    <div className="landing-container">
      <h1 className="landing-header">Welcome to Zero Gravity Aerial Photography</h1>
      <img
        src={isLandingImageLoaded ? landingImage.source : ""}
        alt={isLandingImageLoaded ? landingImage.alt : ""}
        className="landing-image"
      />
    </div>
  );
}

export default Landing;
