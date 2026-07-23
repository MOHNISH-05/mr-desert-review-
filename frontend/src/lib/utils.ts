import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "text-green-600";
  if (rating >= 4) return "text-green-500";
  if (rating >= 3) return "text-yellow-500";
  if (rating >= 2) return "text-orange-500";
  return "text-red-500";
}

export function getRatingBg(rating: number): string {
  if (rating >= 4.5) return "bg-green-600";
  if (rating >= 4) return "bg-green-500";
  if (rating >= 3) return "bg-yellow-500";
  if (rating >= 2) return "bg-orange-500";
  return "bg-red-500";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getCountryFlag(country: string | null): string {
  const flags: Record<string, string> = {
    "India": "🇮🇳",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    "Germany": "🇩🇪",
    "France": "🇫🇷",
    "Australia": "🇦🇺",
    "Italy": "🇮🇹",
    "Spain": "🇪🇸",
    "Canada": "🇨🇦",
    "Japan": "🇯🇵",
  };
  return country ? flags[country] || "🌍" : "🌍";
}

export const BUSINESS_ICONS: Record<string, string> = {
  "mr-desert": "🏜️",
  "elite-castle": "🏨",
  "happy-adventure": "🏕️",
  "tour-planner": "🚙",
};
