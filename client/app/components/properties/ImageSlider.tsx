"use client";
import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  active: boolean;
  small?: boolean;
}

const Image: React.FC<ImageProps> = ({ src, alt, active, small }) => {
  return (
    <div
      className="duration-700 ease-in-out transition-opacity"
      data-carousel-item
    >
      <img
        src={src}
        className={`absolute z-20 w-full h-full object-cover ${
          active ? "opacity-100 block" : "opacity-0 hidden"
        }
        ${small ? "h-48" : "w-full h-full"}
        `}
        alt={alt}
      />
    </div>
  );
};

interface ImageSliderProps {
  images: string[];
  name: string;
  small?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, name, small }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      id="default-carousel"
      className={`object-cover ${
        small ? "w-full rounded-t-lg max-h-48" : "rounded-lg w-full h-full"
      }`}
      data-carousel="slide"
    >
      {/* Carousel wrapper */}
      <div
        className={`relative overflow-hidden ${
          small ? "h-48 rounded-t-lg" : " w-full h-full rounded-lg"
        }`}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={name}
            active={index === currentIndex}
            small={small ? true : false}
          />
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-current={index === currentIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      {/* previous button */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50 ">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* next button */}
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 ">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default ImageSlider;
