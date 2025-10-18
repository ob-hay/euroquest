import { Calendar, Euro, MapPin } from "lucide-react";
import Link from "next/link";
import { usePopupStore } from "@/store/popup-store";

interface SearchTimingCardProps {
  timing: SearchTiming;
  formatDate: (date: string) => string;
}

export default function SearchTimingCard({
  timing,
  formatDate,
}: SearchTimingCardProps) {
  const { openRegister, openInquire, openDownload } = usePopupStore();
  return (
    <Link
      href={`/training-course/${timing.course_slug}`}
      className="bg-white rounded-xl border border-gray-200 shadow-[1px_1px_17px_0_rgba(62,94,192,0.22)] transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden relative group h-max"
    >
      {/* Hover Effect Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#314EA9] to-[#446AE1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card Content */}
      <div className="bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] p-4">
        {/* Course Title */}
        <div className="mb-4">
          <h3
            className="text-sm font-semibold text-[#253a7b] mb-2 h-[60px] hover:text-[#3E5EC0] transition-colors cursor-pointer"
            title={timing.course_title}
          >
            {timing.course_title}
          </h3>
        </div>

        {/* Location and Price */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#3E5EC0]" />
            <h4 className="text-sm font-semibold text-[#253a7b] m-0">
              {timing.city_title}
            </h4>
          </div>
          <div className="price text-[#253a7b] font-semibold text-sm flex items-center gap-1">
            Fees: {Number(timing.fees) + 0} <Euro size={14} />
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-gray-500" />
            <span className="label text-xs whitespace-nowrap text-gray-600 font-medium">
              From:
            </span>
            <span className="value text-[11px] whitespace-nowrap text-[#253a7b] font-semibold">
              {formatDate(timing.start_date)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="label text-xs whitespace-nowrap text-gray-600 font-medium">
              To:
            </span>
            <span className="value text-[11px] whitespace-nowrap text-[#253a7b] font-semibold">
              {formatDate(timing.end_date)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex gap-2 p-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openDownload({
              courseTitle: timing.course_title,
              timingId: timing.id.toString(),
            });
          }}
          className="flex-1 h-6.5 text-[11px] bg-[#3E5EC0] text-white cursor-pointer rounded-full font-semibold hover:bg-gradient-to-r hover:from-[#4E71D4] hover:to-[#324B9A] transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1"
        >
          PDF
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openRegister({
              courseTitle: timing.course_title,
              timingId: timing.id.toString(),
            });
          }}
          className="flex-1 h-6.5 text-[11px] bg-white text-[#3E5EC0] border border-[#3E5EC0] cursor-pointer rounded-full font-semibold hover:bg-gradient-to-r hover:from-[#4E71D4] hover:to-[#324B9A] hover:text-white transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1"
        >
          Register
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openInquire({
              courseTitle: timing.course_title,
              timingId: timing.id.toString(),
            });
          }}
          className="flex-1 h-6.5 text-[11px] bg-white text-[#3E5EC0] border border-[#3E5EC0] cursor-pointer rounded-full font-semibold hover:bg-gradient-to-r hover:from-[#4E71D4] hover:to-[#324B9A] hover:text-white transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1"
        >
          Enquire
        </button>
      </div>
    </Link>
  );
}
