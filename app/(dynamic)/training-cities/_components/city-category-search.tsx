"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

export default function CityCategorySearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("keyword") || ""
  );

  // Debounced search with URL params
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchKeyword) {
        params.set("keyword", searchKeyword);
      } else {
        params.delete("keyword");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKeyword, pathname, searchParams, router]);

  const handleClearSearch = () => {
    setSearchKeyword("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("keyword");
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex transform -translate-y-7">
      <div className="flex items-center gap-3 max-w-md w-full bg-gradient-to-br from-white to-[#f8f9ff] border-2 border-[#e8eaff] rounded-full px-5 py-4 shadow-[0_8px_32px_rgba(62,94,192,0.12)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(62,94,192,0.2)] hover:-translate-y-0.5 focus-within:shadow-[0_12px_40px_rgba(62,94,192,0.2)] focus-within:-translate-y-0.5">
        <Search
          size={16}
          className={`text-[#3E5EC0] transition-all duration-300 ${
            isPending ? "animate-pulse" : ""
          }`}
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search for Course"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border-none outline-none w-full text-sm bg-transparent text-gray-800 font-normal placeholder:text-gray-500 placeholder:font-normal"
          aria-label="Search for courses"
          autoComplete="off"
        />
        {searchKeyword && (
          <button
            onClick={handleClearSearch}
            className="text-gray-400 hover:text-[#3E5EC0] transition-all duration-300 hover:scale-110"
            aria-label="Clear search"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

