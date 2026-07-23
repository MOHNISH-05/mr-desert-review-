import Link from "next/link";
import { Search, Compass, BookOpen, Star, Home, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Mr. Desert Jaisalmer",
  description: "The page you are looking for does not exist. Explore guest reviews, desert blogs, and destination guides for Jaisalmer.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
      <div className="container max-w-4xl">
        <div className="glass-card p-10 md:p-14 text-center border border-desert-200/60 shadow-luxury">
          <p className="eyebrow justify-center flex items-center gap-2 mb-3">
            <Compass className="h-4 w-4 animate-spin-slow text-desert-600" />
            404 — Lost in the dunes
          </p>

          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Page Not <span className="text-gradient-gold italic">Found</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            The page or story you were looking for seems to have shifted with the winds of the Thar Desert. Explore popular guest stories and travel guides below.
          </p>

          <form action="/all-reviews" method="GET" className="max-w-md mx-auto mb-12">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="search"
                placeholder="Search guest reviews or topics..."
                className="w-full rounded-full border border-desert-200 bg-white/80 py-3.5 pl-12 pr-28 text-sm focus:border-desert-400 focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 rounded-full bg-dark px-5 py-2 text-xs font-medium text-white hover:bg-dark/90 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 text-left">
            <Link
              href="/all-reviews"
              className="group p-5 rounded-2xl bg-white border border-desert-100 hover:border-desert-300 hover:shadow-luxury transition-all duration-300"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-desert-50 text-desert-600 mb-3 group-hover:bg-desert-100 transition-colors">
                <Star className="h-5 w-5" />
              </div>
              <h3 className="font-serif font-semibold text-lg mb-1 group-hover:text-desert-700 transition-colors">
                Popular Reviews
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Authentic ratings and guest stories for desert camps and hotels.
              </p>
            </Link>

            <Link
              href="/blogs"
              className="group p-5 rounded-2xl bg-white border border-desert-100 hover:border-desert-300 hover:shadow-luxury transition-all duration-300"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-desert-50 text-desert-600 mb-3 group-hover:bg-desert-100 transition-colors">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-serif font-semibold text-lg mb-1 group-hover:text-desert-700 transition-colors">
                Travel Journal
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Articles on the best time to visit Jaisalmer and safari tips.
              </p>
            </Link>

            <Link
              href="/guides"
              className="group p-5 rounded-2xl bg-white border border-desert-100 hover:border-desert-300 hover:shadow-luxury transition-all duration-300"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-desert-50 text-desert-600 mb-3 group-hover:bg-desert-100 transition-colors">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="font-serif font-semibold text-lg mb-1 group-hover:text-desert-700 transition-colors">
                Destination Guides
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Guides for Jaisalmer Fort, Sam Sand Dunes & Gadisar Lake.
              </p>
            </Link>
          </div>

          <Link href="/">
            <button className="inline-flex items-center gap-2 rounded-full bg-dark px-7 py-3.5 text-sm font-medium text-white hover:bg-dark/90 transition-all shadow-luxury">
              <Home className="h-4 w-4" /> Return to Homepage <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
