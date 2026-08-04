"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/effects/animated-counter";

const stats = [
  ["4.9", "Guest rating"],
  ["1,200+", "Stories shared"],
  ["06", "Official places"],
  ["2025", "Mr. Desert Jaisalmer"],
];

export function StatsSection() {
  return (
    <section className="relative z-20 bg-[#1A1A1A] border-y border-desert-500/10">
      <div className="absolute inset-0 bg-gradient-to-r from-desert-900/20 via-transparent to-desert-900/20 pointer-events-none" aria-hidden="true" />
      <div className="container relative">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map(([value, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="py-8 md:py-10 px-5 md:px-8 border-r border-white/8 last:border-r-0 group hover:bg-white/[0.02] transition-colors"
            >
              <AnimatedCounter
                value={value}
                className="block text-3xl md:text-4xl font-serif text-desert-400 group-hover:text-desert-300 transition-colors"
              />
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
