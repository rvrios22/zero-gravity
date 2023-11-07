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

  return (
    <main>
      <h2>About Me</h2>
      {carouselData.map(data => (
        <div key={data.id} className="carousel-grid-container">
          <div className="carousel-text-container">
            <p>{data.desc}</p>
          </div>
          <div className="carousel-image-conatiner">
            <img src={data.source} alt={data.alt} />
          </div>
        </div>
      ))}
    </main>
    );
}

export default Carousel;
