import SearchTimingCard from "./search-timing-card";

interface SearchGridProps {
  items: SearchTiming[];
  formatDate: (date: string) => string;
}

export default function SearchGrid({
  items,
  formatDate,
}: SearchGridProps) {
  // Always render all items in a responsive grid without scrolling
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {items.map((timing) => (
        <SearchTimingCard
          key={timing.id}
          timing={timing}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
}
