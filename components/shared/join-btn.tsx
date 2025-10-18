"use client";
import { ChevronRight } from "lucide-react";
import { usePopupStore } from "@/store/popup-store";

export default function JoinBtn() {
  const { openJoin } = usePopupStore();
  const handleJoinTeam = () => {
    openJoin();
  };

  return (
    <>
      <button
        onClick={handleJoinTeam}
        className="bg-[#3E5EC0] hover:bg-[#2d4aa7] !mt-0 mx-auto md:mx-0 text-white px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform cursor-pointer flex items-center gap-3 group"
        suppressHydrationWarning={true}
      >
        <span>Join To Our Team</span>
        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </>
  );
}
