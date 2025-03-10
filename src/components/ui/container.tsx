import * as React from "react";
import { cn } from "@/lib/utils";

// This interface is used to provide type safety while extending HTMLAttributes
type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
