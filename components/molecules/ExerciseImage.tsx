"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getExerciseImage } from "@/lib/exerciseImages";

interface ExerciseImageProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-20 w-20",
  lg: "h-32 w-32",
};

export function ExerciseImage({ name, size = "md", className }: ExerciseImageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const imageSrc = getExerciseImage(name);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  if (imageSrc) {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={cn("relative shrink-0 cursor-zoom-in overflow-hidden rounded-lg", sizeClasses[size], className)}
        >
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="80px"
            className="object-cover"
            unoptimized
          />
        </button>

        {modalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-square w-full min-w-[300px]">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 90vw, 672px"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="bg-black/60 px-4 py-3 text-center text-sm font-medium text-white">
                {name}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/5 dark:border-foreground/10 dark:bg-foreground/5",
        sizeClasses[size],
        className,
      )}
    >
      <ImageIcon className="h-6 w-6 text-foreground/30 dark:text-foreground/20" />
    </div>
  );
}
