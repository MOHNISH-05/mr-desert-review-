"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowUpRight, BookOpen, Map, Camera } from "lucide-react";

import Image from "next/image";

const businesses = [
  {
    href: "/business/mr-desert",
    label: "Mr. Desert Jaisalmer",
    desc: "Hotels, camps & safaris",
    image: "/businesses/mr-desert/6-scaled-e1756826347412.webp",
    external: "https://mrdesertjaisalmer.in",
  },
  {
    href: "/business/elite-castle",
    label: "Elite Castle",
    desc: "Heritage hotel near the fort",
    image: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.40.jpeg",
    external: "https://elitecastlejaisalmer.com",
  },
  {
    href: "/business/happy-adventure",
    label: "Happy Adventure Camp",
    desc: "Luxury desert camping",
    image: "/businesses/happy-adventure-camp/DSC02608_1024x683.webp",
    external: "https://happyadventurecampjaisalmer.com",
  },
  {
    href: "/business/tour-planner",
    label: "Elite India Tour Planner",
    desc: "Custom Rajasthan journeys",
    image: "/businesses/elite-india-tour-planner/dheeraj-purohit.webp",
    external: "https://eliteindiatourplanner.com",
  },
  {
    href: "/business/jaisal-inn",
    label: "Hotel Jaisal Inn",
    desc: "Premium hotel & rooftop pool",
    image: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.43.jpeg",
    external: "https://jaisalinnjaisalmer.com/",
  },
  {
    href: "/business/vijay-bagh",
    label: "Vijay Bagh",
    desc: "Luxury heritage village resort",
    image: "/businesses/mr-desert/6-scaled-e1756826347412.webp",
    external: "https://www.vijaybagh.com/",
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-reviews", label: "Reviews" },
  { href: "/gallery", label: "Gallery", icon: Camera },
  { href: "/blogs", label: "Journal", icon: BookOpen },
  { href: "/guides", label: "Guides", icon: Map },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass shadow-glass py-2.5"
          : transparent
            ? "bg-transparent py-5"
            : "glass-dark py-3"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11">
            <Image
              src="/businesses/mr-desert/logo.png"
              alt="Mr. Desert Reviews"
              fill
              className="rounded-full object-cover ring-2 ring-desert-400/60 group-hover:ring-desert-400 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-desert-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          </div>
          <div className="hidden sm:block">
            <span className={cn(
              "font-serif text-lg font-bold transition-colors duration-300",
              transparent ? "text-gradient-gold" : "text-gradient-gold"
            )}>
              Mr. Desert
            </span>
            <span className={cn(
              "block text-[10px] uppercase tracking-[0.25em] transition-colors",
              transparent ? "text-white/50" : "text-muted-foreground"
            )}>
              Jaisalmer
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link-underline px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname === link.href
                  ? "active text-desert-600"
                  : transparent
                    ? "text-white/85 hover:text-white"
                    : "text-foreground/75 hover:text-desert-600"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Mega menu trigger */}
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                megaOpen
                  ? "text-desert-600"
                  : transparent
                    ? "text-white/85 hover:text-white"
                    : "text-foreground/75 hover:text-desert-600"
              )}
            >
              Our Businesses
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", megaOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] glass rounded-2xl shadow-luxury-lg border p-3"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {businesses.map((biz) => (
                      <Link
                        key={biz.href}
                        href={biz.href}
                        className="group flex gap-3 rounded-xl p-3 hover:bg-desert-50/80 transition-all duration-300"
                      >
                        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={biz.image}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm group-hover:text-desert-700 transition-colors truncate">
                            {biz.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{biz.desc}</p>
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-desert-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Explore <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-desert-100 flex justify-between items-center px-2">
                    <span className="text-xs text-muted-foreground">Four brands · One golden city</span>
                    <Link href="/write-review" className="text-xs font-medium text-desert-600 hover:text-desert-700">
                      Write a review →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link-underline px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "active text-desert-600"
                  : transparent
                    ? "text-white/85 hover:text-white"
                    : "text-foreground/75 hover:text-desert-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/all-reviews">
            <Button variant={transparent ? "glass" : "gold"} size="sm">
              Explore Reviews
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={cn(
            "lg:hidden p-2.5 rounded-xl transition-colors",
            transparent ? "hover:bg-white/10 text-white" : "hover:bg-desert-50"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden glass border-t border-white/10 mt-2"
          >
            <div className="container py-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 text-base rounded-xl transition-colors",
                    pathname === link.href
                      ? "bg-desert-50 text-desert-700 font-medium"
                      : "hover:bg-desert-50/60"
                  )}
                >
                  {link.icon && <link.icon className="h-4 w-4 text-desert-500" />}
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 pb-2">
                <p className="px-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Our Businesses
                </p>
                {businesses.map((biz) => (
                  <Link
                    key={biz.href}
                    href={biz.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-desert-50/60 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0">
                      <img src={biz.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{biz.label}</p>
                      <p className="text-xs text-muted-foreground">{biz.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-4 px-4">
                <Link href="/all-reviews">
                  <Button variant="gold" className="w-full">Explore Reviews</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
