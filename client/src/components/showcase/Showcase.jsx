// Showcase.jsx
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import EthIcon from "./EthIcon";
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
    image: "/houses.png",
    price: 235.8,
  },
  {
    id: 3,
    name: "Mountain Retreat",
    description: "Chicago",
    image: "/houses.png",
    price: 189.2,
  },
  {
    id: 4,
    name: "Urban Loft",
    description: "Paris",
    image: "/houses.png",
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
      className="bg-white rounded-2xl p-4 transition-all duration-300 cursor-pointer w-full group"
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
        <div className="flex items-center gap-1">
          <EthIcon className="w-4 h-4" />
          <span className="font-mona_sans font-semibold">{property.price}</span>
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-mona_sans text-2xl font-bold">Recently Listed</h2>
        </div>
        <p className="text-gray-600 text-sm">
          The NFT marketplace with everything for everyone
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={15}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
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
  );
};

export default Showcase;
