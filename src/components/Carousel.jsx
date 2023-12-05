import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../css/indexPage.css";

function Carousel({ carouselData, setIsEditCarouselActive }) {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handleCarouselEdit = () => {
    setIsEditCarouselActive(true);
  };

  return (
    <main>
      <h2 className="carousel-header">About Me</h2>
      <button className="carousel-activate-edit" onClick={handleCarouselEdit}>
        Edit
      </button>
      {carouselData.map((data, idx) => (
        <div
          key={data.id}
          className={idx === currentSlide ? "slide active" : "slide"}
        >
          {idx === currentSlide && (
            <img className="carousel-image" src={data.source} alt={data.alt} />
          )}
          {idx === currentSlide && <p className="carousel-text">{data.desc}</p>}
        </div>
      ))}
      <div className="arrow-container">
        <button onClick={prevSlide}>
          <KeyboardArrowLeftIcon sx={{ fontSize: '1.75em'}}/>
        </button>
        <button onClick={nextSlide}>
          <KeyboardArrowRightIcon sx={{ fontSize: '1.75em'}}/>
        </button>
      </div>
    </main>
  );
}

export default Carousel;
