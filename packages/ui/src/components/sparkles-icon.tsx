"use client";

// AnimateIcons registry: https://animateicons.in/r/lu-sparkles.json
// MIT (c) 2025 Avijit Dey; Lucide/Feather notices: packages/ui/ANIMATED_ICONS_LICENSE.md.
// Adapted only for strict types, accessibility and reduced-motion resets.

import { cn } from "@edge-stack/ui/lib/utils";
import type { Variants } from "motion/react";
import {
  domMin,
  LazyMotion,
  m,
  useAnimation,
  useReducedMotion,
} from "motion/react";
import {
  type HTMLAttributes,
  type Ref,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
export interface SparklesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SparklesIconProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    | "color"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
  > {
  color?: string;
  duration?: number;
  isAnimated?: boolean;
  ref?: Ref<SparklesIconHandle>;
  size?: number;
}

function SparklesIcon({
  onMouseEnter,
  onMouseLeave,
  className,
  size = 24,
  duration = 1,
  isAnimated = true,
  color,
  ref,
  ...props
}: SparklesIconProps) {
  const controls = useAnimation();
  const reduced = useReducedMotion();
  const isControlled = useRef(false);

  useImperativeHandle(ref, () => {
    isControlled.current = true;
    return {
      startAnimation: () =>
        reduced || !isAnimated
          ? controls.set("normal")
          : controls.start("animate"),
      stopAnimation: () =>
        reduced ? controls.set("normal") : controls.start("normal"),
    };
  });

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isAnimated || reduced) {
        return;
      }
      if (isControlled.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, reduced, isAnimated, onMouseEnter]
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlled.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
      }
    },
    [controls, onMouseLeave]
  );

  const bigVariants: Variants = {
    animate: {
      rotate: [0, 14, -8, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: {
        duration: 0.8 * duration,
        ease: "easeInOut",
        times: [0, 0.35, 0.7, 1],
      },
    },
    normal: { rotate: 0, scale: 1 },
  };

  const plusVariants: Variants = {
    animate: {
      rotate: [0, 45, 0],
      scale: [1, 1.3, 1],
      transition: {
        delay: 0.12 * duration,
        duration: 0.6 * duration,
        ease: "easeInOut",
      },
    },
    normal: { rotate: 0, scale: 1 },
  };

  const dotVariants: Variants = {
    animate: {
      scale: [1, 1.4, 0.9, 1],
      transition: {
        delay: 0.25 * duration,
        duration: 0.5 * duration,
        ease: "easeInOut",
        times: [0, 0.35, 0.7, 1],
      },
    },
    normal: { scale: 1 },
  };

  return (
    <LazyMotion features={domMin} strict>
      <div
        aria-hidden={props["aria-label"] ? undefined : true}
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        role="img"
        {...props}
        style={{ color, ...props.style }}
      >
        <m.svg
          animate={controls}
          aria-hidden="true"
          fill="none"
          focusable="false"
          height={size}
          initial="normal"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <m.path
            d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
            style={{
              originX: "12px",
              originY: "12px",
              transformBox: "view-box",
            }}
            variants={bigVariants}
          />
          <m.g
            style={{
              originX: "20px",
              originY: "4px",
              transformBox: "view-box",
            }}
            variants={plusVariants}
          >
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
          </m.g>
          <m.circle
            cx="4"
            cy="20"
            r="2"
            style={{
              originX: "4px",
              originY: "20px",
              transformBox: "view-box",
            }}
            variants={dotVariants}
          />
        </m.svg>
      </div>
    </LazyMotion>
  );
}

export { SparklesIcon };
