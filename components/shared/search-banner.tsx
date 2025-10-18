"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { orderedMonths, durationOptions } from "@/constants";
import { useCategories, useCities } from "@/services/hooks";
import { RotateCcw, Search } from "lucide-react";
import Button from "../ui/button";
import Input from "../ui/input";
import CustomSelect, {
  SelectOption as SelectOptionType,
} from "../ui/custom-select";
import WarningPopup from "../ui/warning-popup";

// Field types
export type FieldType = "select" | "input" | "date";

export interface FieldSelectOption {
  id: number | string;
  title: string;
  value?: string;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  placeholder: string;
  options?: FieldSelectOption[];
  required?: boolean;
  className?: string;
  variant?: "default" | "filled" | "outline";
  size?: "sm" | "md" | "lg";
}

export interface ActionButton {
  type: "submit" | "reset" | "button";
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

interface SearchBannerProps {
  fields?: FieldConfig[];
  actions?: ActionButton[];
  onSubmit?: (data: Record<string, string>) => void;
  onReset?: () => void;
  searchRoute?: string;
  className?: string;
  containerClassName?: string;
  initialValues?: Record<string, string>;
  resetBehavior?: "navigate" | "local"; // 'navigate' for search page, 'local' for other pages
}

// Helper function to create default fields with API data
const createDefaultFields = (
  categories: any[] = [],
  cities: any[] = []
): FieldConfig[] => [
  {
    name: "category_slug",
    type: "select",
    placeholder: "Select Category",
    options: [
      ...categories.map((cat) => ({
        id: cat.slug,
        title: cat.title,
        value: cat.slug,
      })),
    ],
    required: false,
    className: "flex-1 md:flex-[2]",
  },
  {
    name: "city_slug",
    type: "select",
    placeholder: "Select City",
    options: [
      ...cities.map((city) => ({
        id: city.slug,
        title: city.title,
        value: city.slug,
      })),
    ],
    required: false,
    className: "flex-1",
  },
  {
    name: "month",
    type: "select",
    placeholder: "Select Month",
    options: [
      ...orderedMonths.map((month) => ({
        id: month.value,
        title: month.label,
        value: month.value,
      })),
    ],
    required: false,
    className: "flex-1",
  },
  {
    name: "duration",
    type: "select",
    placeholder: "Select Duration",
    options: [
      ...durationOptions.map((option) => ({
        id: option.value,
        title: option.label,
        value: option.value.toString(),
      })),
    ],
    required: false,
    className: "flex-1",
  },
];

// Default action buttons
const defaultActions: ActionButton[] = [
  {
    type: "reset",
    label: "Clear",
    icon: <RotateCcw size={14} />,
    variant: "outline",
  },
  // {
  //   type: 'submit',
  //   label: 'Search',
  //   icon: <Search size={14} />,
  //   variant: 'primary'
  // }
];

export default function SearchBanner({
  fields,
  actions = defaultActions,
  onSubmit,
  onReset,
  searchRoute = "/search",
  className = "",
  containerClassName = "",
  initialValues = {},
  resetBehavior = "navigate",
}: SearchBannerProps) {
  const router = useRouter();

  // Fetch categories and cities from API
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: cities, isLoading: citiesLoading } = useCities();

  // Create dynamic fields based on API data
  const dynamicFields = fields || createDefaultFields(categories, cities);

  // Initialize form data based on provided fields and initial values
  const initialFormData = dynamicFields.reduce((acc, field) => {
    acc[field.name] = initialValues[field.name] || "";
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] =
    useState<Record<string, string>>(initialFormData);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [navigationParams, setNavigationParams] = useState<string>("");
  const [showWarning, setShowWarning] = useState(false);

  // Update form data when initialValues change
  useEffect(() => {
    const updatedFormData = dynamicFields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] || "";
      return acc;
    }, {} as Record<string, string>);

    // Only update if the values have actually changed
    const hasChanged = Object.keys(updatedFormData).some(
      (key) => updatedFormData[key] !== formData[key]
    );

    if (hasChanged) {
      setFormData(updatedFormData);
    }
  }, [initialValues, dynamicFields, formData]);

  // Handle navigation after state update
  useEffect(() => {
    if (shouldNavigate && navigationParams) {
      router.push(`${searchRoute}?${navigationParams}`);
      setShouldNavigate(false);
      setNavigationParams("");
    }
  }, [shouldNavigate, navigationParams, router, searchRoute]);

  // Validation function to check if only duration is selected
  const validateForm = useCallback((data: Record<string, string>): boolean => {
    // Check all possible field variations
    const hasKeyword = data.keyword && data.keyword.trim().length > 0;
    const hasCategory = data.category_slug && data.category_slug !== "";
    const hasCity = (data.city_slug && data.city_slug !== "") || (data.city && data.city !== "");
    const hasMonth = data.month && data.month !== "";
    const hasDuration = data.duration && data.duration !== "";

    // Prevent submission if nothing is filled
    if (!hasKeyword && !hasCategory && !hasCity && !hasMonth && !hasDuration) {
      return false;
    }

    // Prevent if only duration is selected
    if (hasDuration && !hasKeyword && !hasCategory && !hasCity && !hasMonth) {
      setShowWarning(true);
      return false;
    }

    return true;
  }, []);

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      setFormData((prev) => {
        const newFormData = {
          ...prev,
          [name]: value,
        };

        // Validate form before proceeding with setTimeout to avoid render issues
        setTimeout(() => {
          if (!validateForm(newFormData)) {
            return; // Don't proceed with search if validation fails
          }

          // Trigger search immediately when any field changes
          if (onSubmit) {
            onSubmit(newFormData);
          } else {
            // Auto-navigate to search with current form data
            const searchParams = new URLSearchParams();
            Object.entries(newFormData).forEach(([key, val]) => {
              if (val) {
                // Map form data to API parameters
                if (key === "category_slug") {
                  searchParams.append("category_slug", val);
                } else if (key === "city_slug") {
                  searchParams.append("city_slug", val);
                } else if (key === "month") {
                  // Extract year from the selected month label
                  const selectedMonth = orderedMonths.find(
                    (month) => month.value === val
                  );
                  if (selectedMonth) {
                    const yearMatch = selectedMonth.label.match(/- (\d{4})$/);
                    const year = yearMatch
                      ? yearMatch[1]
                      : new Date().getFullYear();
                    const monthFormatted = `${year}-${val.padStart(2, "0")}`;
                    searchParams.append("month", monthFormatted);
                  }
                } else {
                  searchParams.append(key, val);
                }
              }
            });

            // Only navigate if there are search parameters
            if (searchParams.toString()) {
              setNavigationParams(searchParams.toString());
              setShouldNavigate(true);
            }
          }
        }, 0);

        return newFormData;
      });
    },
    [onSubmit, router, searchRoute, validateForm]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form before submission with setTimeout to avoid render issues
      setTimeout(() => {
        if (!validateForm(formData)) {
          return;
        }

        if (onSubmit) {
          onSubmit(formData);
        } else {
          // Default behavior: navigate to search route
          const searchParams = new URLSearchParams();
          Object.entries(formData).forEach(([key, value]) => {
            if (value) {
              searchParams.set(key, value);
            }
          });
          router.push(`${searchRoute}?${searchParams.toString()}`);
        }
      }, 0);
    },
    [formData, onSubmit, router, searchRoute, validateForm]
  );

  const handleReset = useCallback(() => {
    const resetData = dynamicFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>);

    setFormData(resetData);

    // Handle reset behavior based on resetBehavior prop
    if (resetBehavior === "navigate") {
      // Navigate to search page without any parameters (clear all filters)
      router.push(searchRoute);
    }
    // For 'local' behavior, we only reset the form data without navigation

    if (onReset) {
      onReset();
    }
  }, [dynamicFields, onReset, router, searchRoute, resetBehavior]);

  const handleButtonClick = (action: ActionButton) => {
    if (action.type === "reset") {
      handleReset();
    } else if (action.href) {
      router.push(action.href);
    } else if (action.onClick) {
      action.onClick();
    }
  };

  // Convert FieldSelectOption to SelectOptionType
  const convertOptions = (options: FieldSelectOption[]): SelectOptionType[] => {
    return options.map((option) => ({
      value: option.value !== undefined ? option.value : option.id.toString(),
      label: option.title,
      disabled: false,
    }));
  };

  const renderField = (field: FieldConfig) => {
    const commonProps = {
      key: field.name,
      name: field.name,
      value: formData[field.name] || "",
      required: field.required,
      className: "w-full",
      variant: field.variant || "default",
      fullWidth: true,
    };

    const wrapperClass = `${field.className || "flex-1"} min-w-0`;

    let fieldElement;

    switch (field.type) {
      case "select":
        fieldElement = (
          <CustomSelect
            {...commonProps}
            key={field.name}
            size={
              field.size === "sm"
                ? "sm"
                : field.size === "lg"
                ? "lg"
                : "default"
            }
            placeholder={field.placeholder}
            options={field.options ? convertOptions(field.options) : []}
            value={formData[field.name] || ""}
            onValueChange={(value) =>
              handleInputChange(field.name, value.toString())
            }
          />
        );
        break;

      case "input":
        fieldElement = (
          <Input
            {...commonProps}
            type="text"
            inputSize={field.size || "md"}
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
        break;

      case "date":
        fieldElement = (
          <Input
            {...commonProps}
            type="date"
            inputSize={field.size || "md"}
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
        break;

      default:
        return null;
    }

    return (
      <div key={field.name} className={wrapperClass}>
        {fieldElement}
      </div>
    );
  };

  return (
    <>
      <div
        className={`relative z-50 w-full mx-auto bg-white rounded-xl md:rounded-full p-3 md:pb-3 pb-[30px] shadow-[1px_1px_37px_0_rgba(62,94,192,0.35)] transform -translate-y-9 ${containerClassName}`}
      >
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-2 ${className}`}
        >
          {/* Dynamic Fields */}
          {dynamicFields.map((field) => renderField(field))}

          {/* Dynamic Action Buttons */}
          {actions.length > 0 && (
            <div className="flex items-center gap-1 flex-shrink-0 md:gap-2 mt-4 md:mt-0 justify-center md:justify-start md:static left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 -bottom-[17px] md:bottom-auto absolute">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  type={action.type}
                  variant={action.variant || "primary"}
                  size={action.size || "md"}
                  loading={action.loading}
                  icon={action.icon}
                  onClick={() => handleButtonClick(action)}
                  className={`${action.className || ""} ${
                    actions.length > 1 && index === 0
                      ? "absolute md:static -bottom-6 md:bottom-auto left-1/2 md:left-auto transform -translate-x-full md:translate-x-0"
                      : actions.length > 1 && index === 1
                      ? "absolute md:static -bottom-6 md:bottom-auto left-1/2 md:left-auto transform translate-x-1/4 md:translate-x-0"
                      : ""
                  }`}
                  title={action.label}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Warning Popup */}
      <WarningPopup
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        title="Warning"
        message="Please select training type, city, or month as well to search"
        buttonText="OK"
      />
    </>
  );
}
