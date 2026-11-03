import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combină clase Tailwind, rezolvând conflictele (convenția shadcn/ui). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
