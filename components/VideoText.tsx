
"use client";

import React, {
  ElementType,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "../lib/utils";

export interface VideoTextProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  children: ReactNode;
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
  as?: ElementType;
  maskPadding?: number;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
  maskPadding = 0.05,
}: VideoTextProps) {
  const content = useMemo(
    () =>
      React.Children.toArray(children)
        .map((child) =>
          typeof child === "string" || typeof child === "number"
            ? child.toString()
            : ""
        )
        .join(""),
    [children]
  );

  const createSvgMask = useCallback(() => {
    const responsiveFontSize =
      typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
    return `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'>${content}</text></svg>`;
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);
  const [svgMask, setSvgMask] = useState(() =>
    typeof window !== "undefined" ? createSvgMask() : ""
  );
  const maskContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setSvgMask(createSvgMask());

    const updateSvgMask = () => {
      setSvgMask(createSvgMask());
    };

    window.addEventListener("resize", updateSvgMask);

    const observer = new ResizeObserver(updateSvgMask);
    if (maskContainerRef.current) {
      observer.observe(maskContainerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateSvgMask);
      observer.disconnect();
    };
  }, [createSvgMask]);

  const dataUrlMask = useMemo(
    () => (svgMask ? `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")` : undefined),
    [svgMask]
  );

  const maskSizeValue = useMemo(() => {
    if (!dataUrlMask) return undefined;
    const padded = Math.max(0, maskPadding);
    const maskScale = 1 + padded * 2;
    const widthPercent = `${maskScale * 100}%`;
    return `${widthPercent} 100%`;
  }, [dataUrlMask, maskPadding]);

  return (
    <Component className={cn("relative size-full", className)}>
      <div
        ref={maskContainerRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: maskSizeValue ?? "100% 100%",
          WebkitMaskSize: maskSizeValue ?? "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          opacity: dataUrlMask ? 1 : 0,
          transition: "opacity 150ms ease",
        }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>
      <span className="sr-only">{content}</span>
    </Component>
  );
}
