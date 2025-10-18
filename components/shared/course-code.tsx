"use client";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { CheckCircle, Copy } from "lucide-react";

export default function CourseCode({ code }: { code: string }) {
  const { copy, isCopied } = useCopyToClipboard(2000);

  const handleCopyCode = async (code: string) => {
    await copy(code);
  };

  return (
    <div
      className={`text-gray-700 text-[13px] font-medium flex items-center min-w-[80px] min-h-[20px] gap-2 px-1.5 py-0.5 cursor-pointer transition-all duration-300 border border-gray-300 rounded-lg hover:text-[#3E5EC0]`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCopyCode(code);
      }}
    >
      {isCopied(code) ? (
        <>
          <span>Copied</span>
          <CheckCircle size={12} />
        </>
      ) : (
        <>
          <span>{code}</span>
          <Copy size={12} />
        </>
      )}
    </div>
  );
}
