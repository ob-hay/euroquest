import CityCard from "@/components/cards/city";
import AnimatedCitiesGrid from "@/components/shared/animated";
import SearchBanner from "@/components/shared/search-banner";

interface CitiesSectionProps {
  cities: City[];
}

export default function CitiesSection({ cities }: CitiesSectionProps) {
  return (
    <>
      {/* Search Banner */}
        <SearchBanner resetBehavior="local" />

      {/* Display Cities */}
      <section>
        <AnimatedCitiesGrid>
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </AnimatedCitiesGrid>
      </section>
    </>
  );
}

