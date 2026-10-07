"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Renders the real value by default (server HTML, no-JS, link previews, numbers already on screen),
 * and counts up from 0 only when the number starts below the fold and is scrolled into view.
 */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  // on mount: arm the animation only if the number is still off-screen
  useEffect(() => {
    const el = ref.current;
    if (reduce || !el || el.getBoundingClientRect().top < window.innerHeight) return;
    setDisplay(0);
    setArmed(true);
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [armed, inView, value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display}{suffix}</span>
      <span className="sr-only">{value}{suffix}</span>
    </span>
  );
}
