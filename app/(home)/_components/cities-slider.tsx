"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CityHomeCard from "../../../components/cards/city-home";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface CitiesSliderProps {
  cities: City[];
}

export default function CitiesSlider({ cities }: CitiesSliderProps) {
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !cities) return;

    // Initialize Swiper
    const citiesSwiper = new Swiper('.cities-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 8,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 800,
      pagination: {
        el: '.cities-swiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.cities-slider .next-btn',
        prevEl: '.cities-slider .prev-btn',
      },
      breakpoints: {
        640: {
          slidesPerView: 'auto',
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
      },
    });

    return () => {
      if (citiesSwiper) citiesSwiper.destroy();
    };
  }, [cities, isClient]);

  return (
    <div className="cities-slider relative pb-4">
      {/* Swiper Container */}
      <div className={`cities-swiper overflow-hidden ${!isClient ? "opacity-0" : "opacity-100"}`}>
        <div className="swiper-wrapper">
          {cities.map((city) => (
            <div key={city.id} className="swiper-slide">
              <CityHomeCard city={city} />
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>

      {/* Navigation Buttons */}
      {isClient && cities && cities.length > 0 && (
        <div className="slider-navigation flex justify-center gap-4">
          <button
            className="nav-btn prev-btn w-9 h-9 cursor-pointer bg-white border border-[#3E5EC0] rounded-full flex items-center justify-center text-[#3E5EC0] hover:bg-[#3E5EC0] hover:text-white active:scale-95 active:bg-[#2E4EA0] active:border-[#2E4EA0] transition-all duration-300"
            type="button"
            aria-label="Previous cities"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="nav-btn next-btn w-9 h-9 cursor-pointer bg-white border border-[#3E5EC0] rounded-full flex items-center justify-center text-[#3E5EC0] hover:bg-[#3E5EC0] hover:text-white active:scale-95 active:bg-[#2E4EA0] active:border-[#2E4EA0] transition-all duration-300"
            type="button"
            aria-label="Next cities"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      )}
    </div>
  );
}
