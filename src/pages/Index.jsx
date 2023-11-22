import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import Landing from "../components/Landing";
import Carousel from "../components/Carousel";
import CarouselEdit from "../components/CarouselEdit";
import Rating from "../components/Rating";

function Index() {
  const [carouselData, setCarouselData] = useState([]);
  const [isEditCarouselActive, setIsEditCarouselActive] = useState(false);
  const [didImageUpload, setDidImageUpload] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);

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

  return (
    <>
      <Landing />
      {!isEditCarouselActive ? (
        <Carousel
          carouselData={carouselData}
          isEditCarouselActive={isEditCarouselActive}
          setIsEditCarouselActive={setIsEditCarouselActive}
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
