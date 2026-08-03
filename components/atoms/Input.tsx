import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border border-secondary/30 bg-white px-3 py-2 text-sm transition-colors placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-foreground/10 dark:bg-foreground/5 dark:placeholder:text-foreground/40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
