import React, { useEffect, useState } from "react";
import { db, auth } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Landing from "../components/Landing";
import Carousel from "../components/Carousel";
import CarouselEdit from "../components/CarouselEdit";
import Rating from "../components/Rating";

function Index() {
  const [carouselData, setCarouselData] = useState([]);
  const [isEditCarouselActive, setIsEditCarouselActive] = useState(false);
  const [didImageUpload, setDidImageUpload] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const fetchCarouselData = async () => {
    const carouselDataQuery = query(collection(db, "carouselImages"));
    try {
      const carouselDataSnapshot = await getDocs(carouselDataQuery);
      const filteredCarouselData = carouselDataSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCarouselData(filteredCarouselData);
    } catch (err) {
      console.error("error: ", err);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, [carouselData, didImageUpload, isImageDeleted]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserIsLoggedIn(true);
      }
    });
  }, [userIsLoggedIn]);

  return (
    <>
      <Landing userIsLoggedIn={userIsLoggedIn} />
      {!isEditCarouselActive ? (
        <Carousel
          carouselData={carouselData}
          isEditCarouselActive={isEditCarouselActive}
          setIsEditCarouselActive={setIsEditCarouselActive}
          userIsLoggedIn={userIsLoggedIn}
        />
      ) : (
        <CarouselEdit
          carouselData={carouselData}
          isEditCarouselActive={isEditCarouselActive}
          setIsEditCarouselActive={setIsEditCarouselActive}
          setDidImageUpload={setDidImageUpload}
          isImageDeleted={isImageDeleted}
          setIsImageDeleted={setIsImageDeleted}
        />
      )}

      <Rating />
    </>
  );
}

export default Index;
