"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, RotateCcw } from "lucide-react";
import { orderedMonths, durationOptions } from "@/constants";
import { useCategories, useCities } from "@/services/hooks";
import Input from "../../../components/ui/input";
import CustomSelect from "../../../components/ui/custom-select";
import Button from "../../../components/ui/button";
import WarningPopup from "../../../components/ui/warning-popup";

interface SearchFormData {
  keyword: string;
  category_id: string;
  city_id: string;
  month: string;
  duration: string;
}


export default function SearchBannerHome() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState<SearchFormData>({
    keyword: "",
    category_id: "",
    city_id: "",
    month: "",
    duration: "",
  });

  // Fetch categories and cities from API
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: cities, isLoading: citiesLoading } = useCities();

  // Use static months - no dynamic year calculation to avoid hydration mismatch
  const monthOptions = orderedMonths.map((month) => ({
    value: month.value,
    label: month.label,
  }));


  const handleReset = () => {
    setFormData({
      keyword: "",
      category_id: "",
      city_id: "",
      month: "",
      duration: "",
    });
  };

  const validateForm = (): boolean => {
    const { keyword, category_id, city_id, month, duration } = formData;

    const hasKeyword = keyword.trim().length > 0;
    const hasCategory = category_id !== "";
    const hasCity = city_id !== "";
    const hasMonth = month !== "";
    const hasDuration = duration !== "";

    // Prevent submission if nothing is filled
    if (!hasKeyword && !hasCategory && !hasCity && !hasMonth && !hasDuration) {
      return false;
    }

    // Prevent if only duration is selected
    if (hasDuration && !hasKeyword && !hasCategory && !hasCity && !hasMonth) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowWarning(true);
      return;
    }

    // Build search query with proper parameter mapping
    const searchParams = new URLSearchParams();

    // Map form data to API parameters
    if (formData.keyword) {
      searchParams.append("keyword", formData.keyword);
    }

    if (formData.category_id) {
      // Find category slug from category_id
      const category = categories?.find(
        (cat) => cat.id.toString() === formData.category_id
      );
      if (category) {
        searchParams.append("category_slug", category.slug);
      }
    }

    if (formData.city_id) {
      // Find city slug from city_id
      const city = cities?.find(
        (city) => city.id.toString() === formData.city_id
      );
      if (city) {
        searchParams.append("city_slug", city.slug);
      }
    }

    if (formData.month) {
      // Extract year from the selected month label
      const selectedMonth = orderedMonths.find(month => month.value === formData.month);
      if (selectedMonth) {
        const yearMatch = selectedMonth.label.match(/- (\d{4})$/);
        const year = yearMatch ? yearMatch[1] : new Date().getFullYear();
        const monthFormatted = `${year}-${formData.month.padStart(
          2,
          "0"
        )}`;
        searchParams.append("month", monthFormatted);
      }
    }

    if (formData.duration) {
      searchParams.append("duration", formData.duration);
    }

    // Navigate to search page
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <>
      <WarningPopup
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        title="Warning"
        message="Please select training type, city, or month as well to search"
        buttonText="OK"
      />
      <div className="relative z-50 w-full mx-auto max-w-5xl md:mt-8 mt-5 bg-white rounded-[20px] md:rounded-[15px] shadow-[1px_1px_37px_0_rgb(62_94_192_/35%)] md:p-[20px_16px] p-4 pb-9 border border-gray-100 transform translate-y-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex items-start justify-between gap-2.5 flex-col"
        >
          {/* Top Row */}
          <div className="flex justify-between gap-2 w-full flex-col md:flex-row">
            {/* Keyword Input */}
            <div className="flex-1 max-w-full md:max-w-[50%]">
              <Input
                name="keyword"
                type="text"
                placeholder="Search By Keyword .."
                value={formData.keyword}
                onChange={(e) => setFormData(prev => ({ ...prev, keyword: e.target.value }))}
                inputSize="lg"
                className="h-[45px] text-sm"
                suppressHydrationWarning={true}
              />
            </div>

            {/* Category Select */}
            <div className="flex-1">
              <CustomSelect
                value={formData.category_id ? Number(formData.category_id) : ""}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value.toString() }))}
                placeholder="Select Category"
                size="lg"
                className="h-[45px] text-sm min-w-[calc(100%/6)]"
                options={
                  categories?.map((cat) => ({
                    value: cat.id,
                    label: cat.title,
                  })) || []
                }
                suppressHydrationWarning={true}
              />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between gap-2 w-full flex-col md:flex-row">
            {/* City Select */}
            <div className="flex-1">
              <CustomSelect
                value={formData.city_id ? Number(formData.city_id) : ""}
                onValueChange={(value) => setFormData(prev => ({ ...prev, city_id: value.toString() }))}
                placeholder="Select City"
                size="lg"
                className="h-[45px] text-sm min-w-[calc(100%/6)]"
                options={
                  cities?.map((city) => ({
                    value: city.id,
                    label: city.title,
                  })) || []
                }
                suppressHydrationWarning={true}
              />
            </div>

            {/* Month Select */}
            <div className="flex-1">
              <CustomSelect
                value={formData.month}
                onValueChange={(value) => setFormData(prev => ({ ...prev, month: value.toString() }))}
                placeholder="Select Month"
                size="lg"
                className="h-[45px] text-sm min-w-[calc(100%/6)]"
                options={monthOptions}
                suppressHydrationWarning={true}
              />
            </div>

            {/* Duration Select */}
            <div className="flex-1">
              <CustomSelect
                value={formData.duration}
                onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value.toString() }))}
                placeholder="Select Duration"
                size="lg"
                className="h-[45px] text-sm min-w-[calc(100%/6)]"
                options={durationOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                suppressHydrationWarning={true}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 md:static absolute md:left-auto left-1/2 md:bottom-auto -bottom-6 -translate-x-1/2 md:translate-x-0">
              {/* Reset Button */}
              <Button
                type="reset"
                onClick={handleReset}
                variant="secondary"
                size="lg"
                icon={<RotateCcw size={16} />}
                iconPosition="right"
                className="h-[45px] px-5 text-sm font-semibold min-w-fit bg-white cursor-pointer border border-[#3E5EC0] text-[#3E5EC0]"
                title="Reset"
                suppressHydrationWarning={true}
              >
                Clear
              </Button>

              {/* Search Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Search size={16} />}
                iconPosition="right"
                className="h-[45px] px-5 text-sm font-semibold bg-[#3E5EC0] hover:bg-[#314ea9] text-white rounded-[60px] min-w-fit flex items-center justify-center gap-2 border-none transition-all duration-200"
                title="Search"
                suppressHydrationWarning={true}
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
