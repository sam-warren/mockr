import React from "react";

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridBackground({ className, children }: GridBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className || ''}`}>
      <div
        className="absolute inset-0 dark:opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "57px 57px",
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "57px 57px",
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)",
        }}
      />
      {children}
    </div>
  );
} 