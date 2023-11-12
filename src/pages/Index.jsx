import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import Landing from "../components/Landing";
import Carousel from "../components/Carousel";
import Rating from "../components/Rating";

function Index() {
  const [carouselData, setCarouselData] = useState([]);

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
  }, []);
  return (
    <>
      <Landing />
      <Carousel carouselData={carouselData}/>
      <Rating />
    </>
  );
}

export default Index;
