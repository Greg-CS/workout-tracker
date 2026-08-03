import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "default" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  default: "bg-primary text-white hover:bg-primary/90 shadow-sm shadow-primary/20",
  outline: "border border-secondary/40 bg-white text-foreground/70 hover:bg-secondary/10 hover:border-secondary/60 dark:bg-transparent dark:text-foreground/70 dark:hover:bg-secondary/10",
  ghost: "bg-transparent text-foreground/60 hover:bg-secondary/15 dark:text-foreground/60 dark:hover:bg-secondary/10",
  destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/20",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-9 w-9",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
