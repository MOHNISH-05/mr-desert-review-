"use client";

import Link from "next/link";
import {
  MapPin, Phone, Mail, MessageCircle,
  Instagram, Facebook, Youtube, Award, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const businesses = [
  { name: "Mr. Desert Jaisalmer", slug: "mr-desert", url: "https://mrdesertjaisalmer.in" },
  { name: "Elite Castle Jaisalmer", slug: "elite-castle", url: "https://elitecastlejaisalmer.com" },
  { name: "Happy Adventure Camp", slug: "happy-adventure", url: "https://happyadventurecampjaisalmer.com" },
  { name: "Elite India Tour Planner", slug: "tour-planner", url: "https://eliteindiatourplanner.com" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/all-reviews", label: "Guest Stories" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blogs", label: "Travel Journal" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/write-review", label: "Write a Review" },
];

const awards = [
  "TripAdvisor Excellence",
  "Rajasthan Tourism Partner",
  "Verified Guest Stories",
];

export function Footer() {
  return (
    <footer className="relative bg-[#1A1A1A] text-white overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/dheeraj/camel-safari.webp')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/95 to-[#1A1A1A]" aria-hidden="true" />
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-desert-500/50 to-transparent" aria-hidden="true" />

      <div className="container relative py-20 md:py-24">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/mr-desert-logo.png"
                alt="Mr. Desert Jaisalmer"
                className="h-14 w-14 rounded-full object-cover ring-2 ring-desert-500/40"
              />
              <div>
                <span className="font-serif text-2xl font-bold text-gradient-gold block">
                  Mr. Desert
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Jaisalmer · Rajasthan
                </span>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-sm">
              The official review journal for four premier Jaisalmer hospitality brands. Guest experiences presented as editorial travel stories with photography and context.
            </p>

            {/* Awards */}
            <div className="flex flex-wrap gap-2">
              {awards.map((award) => (
                <span
                  key={award}
                  className="inline-flex items-center gap-1.5 rounded-full border border-desert-500/25 bg-desert-500/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-desert-300"
                >
                  <Award className="h-3 w-3" />
                  {award}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-base font-semibold mb-5 text-desert-400">
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-desert-300 transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Businesses */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-semibold mb-5 text-desert-400">
              Our Businesses
            </h4>
            <ul className="space-y-3">
              {businesses.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/business/${b.slug}`}
                    className="text-white/50 hover:text-desert-300 transition-colors text-sm flex items-start gap-2 group"
                  >
                    <span className="text-desert-500 mt-0.5">✦</span>
                    <span>
                      {b.name}
                      <span className="block text-[10px] text-white/30 group-hover:text-desert-400/60 transition-colors mt-0.5">
                        View stories →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-semibold mb-5 text-desert-400">
              Stay Connected
            </h4>
            <ul className="space-y-3 text-sm text-white/50 mb-6">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-desert-500 shrink-0 mt-0.5" />
                Jaisalmer, Rajasthan, India
              </li>
              <li>
                <a href="tel:+918854808196" className="flex items-center gap-2.5 hover:text-desert-300 transition-colors">
                  <Phone className="h-4 w-4 text-desert-500" />
                  +91-8854808196
                </a>
              </li>
              <li>
                <a href="mailto:mrdesertjaisalmer@gmail.com" className="flex items-center gap-2.5 hover:text-desert-300 transition-colors">
                  <Mail className="h-4 w-4 text-desert-500" />
                  mrdesertjaisalmer@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918854808196"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs text-white/60 mb-3">Get travel stories from the Golden City</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/15 text-white placeholder:text-white/30 text-sm h-9"
                />
                <Button variant="gold" size="sm" className="shrink-0">
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/35 text-sm">
            &copy; {new Date().getFullYear()} Mr. Desert Jaisalmer. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Youtube, href: "#", label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-desert-300 hover:border-desert-500/40 transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm text-white/35">
            <Link href="/privacy" className="hover:text-desert-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-desert-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
