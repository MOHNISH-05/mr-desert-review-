"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen, Shield, Globe } from "lucide-react";

const businesses = [
  { icon: "🏜️", name: "Mr. Desert Jaisalmer", desc: "Main tourism brand with hotels, camps & safaris", slug: "mr-desert" },
  { icon: "🏨", name: "Elite Castle Jaisalmer", desc: "Luxury heritage hotel near Jaisalmer Fort", slug: "elite-castle" },
  { icon: "🏕️", name: "Happy Adventure Camp", desc: "Luxury desert camping in the Thar Desert", slug: "happy-adventure" },
  { icon: "🚙", name: "Elite India Tour Planner", desc: "Customized Rajasthan tour packages", slug: "tour-planner" },
];

const values = [
  { icon: Globe, title: "Local perspective", desc: "Useful context from people who know Jaisalmer intimately" },
  { icon: BookOpen, title: "Rich stories", desc: "Travel inspiration beyond a simple listing or rating" },
  { icon: Shield, title: "Official & trusted", desc: "Book directly with the businesses you discover here" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-background">
      {/* Hero */}
      <div className="relative mb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/dheeraj/dheeraj-purohit.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" aria-hidden="true" />
        <div className="container relative max-w-4xl py-12 text-center">
          <ScrollReveal>
            <p className="eyebrow justify-center flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Our story
            </p>
            <h1 className="section-heading mb-5">
              About <span className="text-gradient-gold italic">Mr. Desert</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your trusted source for discovering Jaisalmer — where authentic guest experiences meet editorial storytelling.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container max-w-4xl space-y-8">
        <ScrollReveal>
          <div className="glass-card p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-5">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Mr. Desert Jaisalmer is the official tourism content hub for the Golden City. We publish destination knowledge, premium travel stories and curated guest experiences to help travelers plan a richer journey through Jaisalmer and Rajasthan — curated by Dheeraj Purohit and his team.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">Our Businesses</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Four premier travel and hospitality brands, united under one golden city:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businesses.map((item) => (
                <Link
                  key={item.slug}
                  href={`/business/${item.slug}`}
                  className="group flex items-start gap-4 p-5 rounded-xl bg-background border border-desert-100 hover:border-desert-300 hover:shadow-luxury transition-all duration-300"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold group-hover:text-desert-700 transition-colors">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-card p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8 text-center">
              A better way to plan your journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((item) => (
                <div key={item.title} className="text-center p-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-desert-50 text-desert-600 mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] p-10 md:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-desert-900/40 to-transparent" aria-hidden="true" />
            <div className="relative">
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                Ready to explore the Golden City?
              </h3>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Read authentic guest stories or share your own Jaisalmer experience.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/all-reviews">
                  <Button variant="gold" size="lg" className="group">
                    Read guest stories
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/write-review">
                  <Button variant="glass" size="lg">Write a review</Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
