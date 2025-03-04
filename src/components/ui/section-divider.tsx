import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface SectionDividerProps {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

export function SectionDivider({
  className,
  variant = "primary",
}: SectionDividerProps) {
  const gradientStyles = {
    primary: {
      background: "radial-gradient(circle at center, var(--primary)/5% 0%, transparent 70%)",
    },
    secondary: {
      background: "radial-gradient(circle at center, var(--secondary)/5% 0%, transparent 70%)",
    },
    tertiary: {
      background: "radial-gradient(circle at center, var(--muted)/10% 0%, transparent 70%)",
    },
  };

  return (
    <div className={cn("relative py-4 md:py-6", className)}>
      <div
        className="absolute inset-0 opacity-30"
        style={gradientStyles[variant]}
      />
      <Separator className="relative z-10 max-w-[90%] mx-auto opacity-50" />
    </div>
  );
} 