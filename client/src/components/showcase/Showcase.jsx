// Showcase.jsx
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./showcase.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: 1,
    name: "A3 Penthouse Suite",
    description: "London",
    image: "/houses.png",
    price: 145.5,
  },
  {
    id: 2,
    name: "Waterfront Villa",
    description: "Amsterdam",
    image: "/house1.jpeg",
    price: 235.8,
  },
  {
    id: 3,
    name: "5 Bedroom Villa",
    description: "Chicago",
    image: "/house4.jpeg",
    price: 189.2,
  },
  {
    id: 4,
    name: "Urban Loft",
    description: "Paris",
    image: "/loginimg.jpeg",
    price: 87.5,
  },
  {
    id: 5,
    name: "A1 Townhouse",
    description: "New York",
    image: "/modernhouse.jpg",
    price: 167.3,
  },
];

const PropertyCard = ({ property }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl transition-all duration-300 cursor-pointer w-full group"
    >
      <div className="aspect-square w-full h-[450px] mb-4 overflow-hidden rounded-xl">
        <img
          src={property.image}
          alt={property.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between px-1">
        <div>
          <h3 className="font-mona_sans text-lg font-semibold">
            {property.name}
          </h3>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <p className="text-sm text-gray-600 mt-0.5">
              {property.description}
            </p>
          </div>
        </div>
        <div>
          <span className="font-mona_sans font-semibold">
            {property.price} ETH
          </span>
        </div>
      </div>
    </div>
  );
};

const Showcase = () => {
  const showcaseRef = useRef(null);

  useEffect(() => {
    const showcase = showcaseRef.current;

    gsap.fromTo(
      showcase.querySelectorAll(".property-card"),
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: showcase,
          start: "top center+=100",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div ref={showcaseRef} className="px-4 md:px-8 sm:px-6 lg:px-8 pt-20 pb-32">
      {/* Header section with navigation */}
      <div className="relative mb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
          <div>
            <h2 className="font-mona_sans text-2xl font-bold">
              Recently Listed
            </h2>
          </div>
          <div className="flex-1 md:text-right md:pr-28">
            <p className="text-gray-600 text-md">
              The smart real estate marketplace with something for everyone
            </p>
          </div>
        </div>

        {/* Navigation container outside of slider */}
        <div className="navigation-container hidden md:flex absolute right-0 top-1/2 -translate-y-1/2">
          <div className="custom-navigation-prev" />
          <div className="custom-navigation-next" />
        </div>
      </div>

      {/* Slider section */}
      <div className="slider-container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={1}
          navigation={{
            prevEl: ".custom-navigation-prev",
            nextEl: ".custom-navigation-next",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="property-slider"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <div className="property-card">
                <PropertyCard property={property} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Showcase;
