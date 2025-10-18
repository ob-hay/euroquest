import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <Link
      href={`/training-cities/${city.slug}`}
      className="w-full h-[200px] relative shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden cursor-pointer block text-white p-0 group"
    >
      {/* City Image */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={city.image}
          alt={city.title}
          className="w-full !h-full object-cover rounded-2xl"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl pointer-events-none" />

      {/* City Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white flex items-center justify-between gap-2 z-10">
        <div className="flex flex-col">
          <h3 className="font-extrabold text-3xl text-white leading-[38px]">
            {city.title}
          </h3>
          {city.courses_count && (
            <span className="text-sm font-semibold">
              +{city.courses_count} courses
            </span>
          )}
        </div>

        <div className="text-white flex items-center justify-center">
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
