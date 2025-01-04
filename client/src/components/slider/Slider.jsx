import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function Slider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full">
      <div className="w-full aspect-[4/3] relative overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="property"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        <button
          onClick={prevSlide}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          aria-label="Previous image"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          aria-label="Next image"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Slider;
