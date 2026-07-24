import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "secondary" | "outline" | "success";

const variants: Record<BadgeVariant, string> = {
  default: "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900",
  secondary: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  outline: "border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
