import React, { useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../css/indexPage.css";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselDataCache, setCarouselDataCache] = useState({});
  const [carouselData, setCarouselData] = useState([]);

  const imageSources = carouselData.map((obj) => obj.source);

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

  useEffect(() => {
    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      setCarouselDataCache((prevCache) => ({ ...prevCache, [src]: img }));
    }, []);
    return () => {
      Object.values(carouselDataCache).forEach((img) =>
        URL.revokeObjectURL(img.src)
      );
    };
  }, [carouselData, setCarouselDataCache]);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === carouselData.length - 1 ? 0 : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? carouselData.length - 1 : currentSlide - 1
    );
  };

  const getCurrentImage = () => {
    const currentImageSrc = imageSources[currentSlide];
    return carouselDataCache[currentImageSrc]
      ? carouselDataCache[currentImageSrc].src
      : "";
  };
  return (
    <main>
      <h2 className="carousel-header">About Me</h2>
        {carouselData.map((data, idx) => (
          <div
            key={data.id}
            className={idx === currentSlide ? "slide active" : "slide"}
          >
            {idx === currentSlide && (
              <img
                className="carousel-image"
                src={data.source}
                alt={data.alt}
              />
            )}
            {idx === currentSlide && (
              <p className="carousel-text">{data.desc}</p>
            )}
          </div>
        ))}
      <div className="arrow-container">
        <button onClick={prevSlide}>
          <KeyboardArrowLeftIcon />
        </button>
        <button onClick={nextSlide}>
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </main>
  );
}

export default Carousel;
