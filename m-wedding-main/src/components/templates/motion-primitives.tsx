/**
 * ═══════════════════════════════════════════════════════════════
 *  MOTION PRIMITIVES — Premium Wedding Animation Library
 * ───────────────────────────────────────────────────────────────
 *  Reusable Framer Motion wrappers for elegant, cinematic
 *  wedding invitation animations. Designed for subtlety,
 *  romance, and a premium feel.
 * ═══════════════════════════════════════════════════════════════
 */

import React from "react";
import { motion, type Variants, type Transition } from "framer-motion";

/* ── Shared Easing Curves ── */
const EASE_LUXURY: Transition["ease"] = [0.22, 1, 0.36, 1];
const EASE_SOFT: Transition["ease"]   = [0.25, 0.46, 0.45, 0.94];
const EASE_CINEMATIC: Transition["ease"] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════════════
   1. FadeInSection — fade + slide up on scroll
   ═══════════════════════════════════════════════════════════════ */
interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export function FadeInSection({
  children, className = "", style, delay = 0, duration = 0.7, y = 30, once = true
}: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE_LUXURY }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. StaggerContainer — stagger children entrance
   ═══════════════════════════════════════════════════════════════ */
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

export function StaggerContainer({ children, className = "", style, once = true }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. RevealText — elegant text entrance
   ═══════════════════════════════════════════════════════════════ */
interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

// Pre-create motion components to avoid remounting on every render
const motionTagMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

export function RevealText({ children, className = "", style, delay = 0, as: Tag = "div" }: RevealTextProps) {
  const MotionTag = motionTagMap[Tag];
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8, delay, ease: EASE_CINEMATIC }}
    >
      {children}
    </MotionTag>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. ScaleInView — subtle scale entrance
   ═══════════════════════════════════════════════════════════════ */
export function ScaleInView({
  children, className = "", style, delay = 0, duration = 0.65
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number; duration?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. FloatingElement — continuous gentle float
   ═══════════════════════════════════════════════════════════════ */
export function FloatingElement({
  children, className = "", style, amplitude = 6, duration = 4
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; amplitude?: number; duration?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [-amplitude / 2, amplitude / 2, -amplitude / 2] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. GlowPulse — soft breathing glow effect
   ═══════════════════════════════════════════════════════════════ */
export function GlowPulse({
  children, className = "", style, glowColor = "rgba(212,168,67,0.3)", duration = 2.5
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; glowColor?: string; duration?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        boxShadow: [
          `0 0 12px 2px ${glowColor}`,
          `0 0 24px 6px ${glowColor}`,
          `0 0 12px 2px ${glowColor}`,
        ],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. ParallaxSection — subtle parallax on scroll
   ═══════════════════════════════════════════════════════════════ */
export function ParallaxBg({
  children, className = "", style, speed = 0.3
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; speed?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{ ...style, willChange: "transform" }}
      initial={{ y: 0 }}
      whileInView={{ y: `${speed * -30}px` }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0, type: "tween" }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. AnimatedDivider — scale-in gold line
   ═══════════════════════════════════════════════════════════════ */
export function AnimatedDivider({
  color = "rgba(212,168,67,0.6)", width = "5rem", className = "", delay = 0.2
}: {
  color?: string; width?: string; className?: string; delay?: number;
}) {
  return (
    <motion.div
      className={`mx-auto ${className}`}
      style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, width }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: EASE_LUXURY }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   9. ShimmerButton — cinematic button with shimmer
   ═══════════════════════════════════════════════════════════════ */
export function ShimmerButton({
  children, onClick, className = "", style
}: {
  children: React.ReactNode; onClick?: () => void; className?: string; style?: React.CSSProperties;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      style={style}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   10. RotateSlow — continuous slow rotation (for Song Hy icon)
   ═══════════════════════════════════════════════════════════════ */
export function RotateSlow({
  children, className = "", style, duration = 20
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; duration?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   11. CountdownFlip — countdown number with pop animation
   ═══════════════════════════════════════════════════════════════ */
export function CountdownPop({
  children, className = "", style, delay = 0
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: EASE_LUXURY, type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   12. CSS Keyframes (injected once)
   ═══════════════════════════════════════════════════════════════ */
const styleId = "wedding-motion-primitives";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes weddingFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes weddingGlow {
      0%, 100% { box-shadow: 0 0 8px 2px rgba(212,168,67,0.15); }
      50% { box-shadow: 0 0 20px 6px rgba(212,168,67,0.3); }
    }
    @keyframes weddingShimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes weddingSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes weddingPulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }
    @keyframes weddingBreath {
      0%, 100% { transform: scale(1); opacity: 0.85; }
      50% { transform: scale(1.02); opacity: 1; }
    }
    .wedding-float { animation: weddingFloat 4s ease-in-out infinite; }
    .wedding-glow { animation: weddingGlow 2.5s ease-in-out infinite; }
    .wedding-pulse { animation: weddingPulse 2s ease-in-out infinite; }
    .wedding-breath { animation: weddingBreath 3s ease-in-out infinite; }
    .wedding-spin-slow { animation: weddingSpin 20s linear infinite; }
  `;
  document.head.appendChild(style);
}
