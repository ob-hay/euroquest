"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import Button from "./button";

interface WarningPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export default function WarningPopup({
  isOpen,
  onClose,
  title = "Warning",
  message = "Please add a keyword, topic, venue, or month in addition to duration.",
  buttonText = "OK"
}: WarningPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-[9999] animate-in">
      <div className="bg-white rounded-xl max-w-md w-[90%] p-6 text-center shadow-[0_8px_20px_rgba(0,0,0,0.2)] border-t-[6px] border-t-[#dc2626]">
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-[#dc2626] mr-2" />
          <h3 className="m-0 text-[#dc2626] text-xl font-semibold">
            {title}
          </h3>
        </div>
        <p className="m-0 mb-6 text-[15px] text-[#444] leading-relaxed">
          {message}
        </p>
        <Button
          onClick={onClose}
          className="bg-[#dc2626] hover:bg-[#b91c1c] text-white border-none py-2.5 px-[18px] rounded-lg cursor-pointer text-sm transition-all duration-200"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
