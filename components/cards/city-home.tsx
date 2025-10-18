"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CityHomeCardProps {
  city: City;
}

export default function CityHomeCard({ city }: CityHomeCardProps) {
  // Calculate course count once to avoid hydration issues
  const courseCount = ((city.id * 37) % 300) + 200;

  return (
    <Link href={`/training-cities/${city.slug}`} className="px-2">
      <div
        className="city-card block group cursor-pointer"
      >
        <div>
          {/* City Image */}
          <div className="city-image relative h-48 overflow-hidden">
            <Image
              src={city.image}
              alt={city.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-500 group-hover:scale-105"
              priority={false}
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* City Info */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#2B2B2B] group-hover:text-[#3E5EC0] transition-colors duration-300">
                  {city.title}
                  <span className="block text-xs font-normal text-[#7C7B7B] mt-1">
                    +{courseCount} course
                  </span>
                </h3>
              </div>
              <div className="arrow-icon w-8 h-8 bg-[#3E5EC0] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#2B4A9E] group-hover:scale-110">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
