export const MONTH_NAMES = [
  "January",
  "February", 
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const MONTH_NAMES_LOWERCASE = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

export const DATE_FORMAT_OPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric",
} as const;

export const SORT_OPTIONS = {
  DATE: "date",
  PRICE: "price",
} as const;

export const GRID_CLASSES = "grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3";

export const NO_RESULTS_CLASSES = "col-span-full text-center py-12 text-gray-500";
