"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

function parseValue(value: string): { num: number; prefix: string; suffix: string; decimals: number } {
  const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: value, decimals: 0 };
  const numStr = match[2].replace(/,/g, "");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { num: parseFloat(numStr), prefix: match[1], suffix: match[3], decimals };
}

export function AnimatedCounter({ value, duration = 2, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");
  const parsed = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.num * eased;

      const formatted =
        parsed.decimals > 0
          ? current.toFixed(parsed.decimals)
          : Math.round(current).toLocaleString();

      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, parsed.num, parsed.prefix, parsed.suffix, parsed.decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {isInView ? display : value}
    </span>
  );
}
