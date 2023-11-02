import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";

function Carousel() {
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
  }, [])

  console.log(carouselData);

  return (
    <>
      {carouselData.map(data => (
        <div>{data.desc}</div>
      ))}
    </>
    );
}

export default Carousel;
