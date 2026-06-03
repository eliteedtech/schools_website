import { useEffect, useState } from "react";
import images from "./stories.js";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function StorySlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  // const nextSlide = () => {
  //   setIndex((prev) => (prev + 1) % images.length);
  // };

  // const prevSlide = () => {
  //   setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  return (
    <div className="relative max-w-7xl mx-auto h-[500px]  md:h-[600px] overflow-hidden rounded-xl shadow-xl">
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={images[index].image}
         
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              Featured Story
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
            {images[index].title}
          </h2>
          <p className="text-gray-200 text-base md:text-lg mb-6 line-clamp-2">
            {images[index].description}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View Full Gallery <FiArrowRight />
            </Link>
            <span className="text-gray-300 text-sm">
              {index + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === index
                ? "bg-blue-950 dark:bg-yellow-400 w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800/30">
        <div
          className="h-full bg-blue-950 dark:bg-yellow-400 transition-all duration-5000 ease-linear"
          style={{ width: `${((index + 1) / images.length) * 100}%` }}
        />
      </div>
    </div>
  );
}