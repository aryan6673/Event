
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

import { cn } from "../lib/utils";

type AnimatedThemeTogglerProps = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const applyTheme = useCallback((nextDark: boolean) => {
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    setIsDark(nextDark);
  }, []);

  const toggleTheme = useCallback(async () => {
    if (typeof document === "undefined" || !buttonRef.current) {
      return;
    }

    const nextDark = !isDark;
    const startViewTransition = (document as any).startViewTransition?.bind(document);

    const runToggle = () => {
      flushSync(() => {
        applyTheme(nextDark);
      });
    };

    if (startViewTransition) {
      try {
        const transition = startViewTransition(runToggle);
        await transition.ready;
      } catch {
        runToggle();
      }
    } else {
      runToggle();
    }

    if (!startViewTransition) {
      return;
    }

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [applyTheme, isDark]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-800 transition-all duration-300 hover:scale-105 hover:border-gray-400 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-600",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
};
