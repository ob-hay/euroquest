import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(className, "mx-auto w-[90%] relative")}>
      {children}
    </div>
  );
}
