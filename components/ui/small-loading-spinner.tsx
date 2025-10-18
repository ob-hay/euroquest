import { cn } from "@/lib/utils";

interface SmallLoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function SmallLoadingSpinner({ 
  className,
  size = "md",
  text 
}: SmallLoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-blue-500",
          sizeClasses[size]
        )}
      />
      {text && (
        <span className="text-sm text-gray-600 animate-pulse">{text}</span>
      )}
    </div>
  );
}
