import SearchBanner from "@/components/shared/search-banner";
import { FieldConfig } from "@/components/shared/search-banner";

interface SearchSectionProps {
  fields: FieldConfig[];
  actions?: any[];
  onSubmit?: (data: Record<string, string>) => void;
  onReset?: () => void;
  initialValues?: Record<string, string>;
  resetBehavior?: "local" | "navigate";
}

export default function SearchSection({
  fields,
  actions,
  onSubmit,
  onReset,
  initialValues,
  resetBehavior = "local",
}: SearchSectionProps) {
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <SearchBanner
        fields={fields}
        actions={actions}
        onSubmit={onSubmit}
        onReset={onReset}
        initialValues={initialValues}
        resetBehavior={resetBehavior}
      />
    </div>
  );
}
