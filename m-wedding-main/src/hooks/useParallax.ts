import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useParallax(speed: number = 0.15): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `-${speed * 100}px`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  return { ref: ref as React.RefObject<HTMLDivElement>, y, opacity };
}
