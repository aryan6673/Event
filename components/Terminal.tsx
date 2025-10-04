
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../lib/utils";

interface TypingAnimationProps {
  text?: string;
  className?: string;
  children?: ReactNode;
}

const TypingAnimation = ({ text, children, className }: TypingAnimationProps) => {
  const textToType = text || (typeof children === 'string' ? children : '');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const typingSpeed = 50;

  useEffect(() => {
    if (isInView && textToType) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < textToType.length) {
          setTypedText((prev) => prev + textToType.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [isInView, textToType]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <p ref={ref} className={cn("font-mono text-left", className)}>
      {typedText}
      <span className={cn("animate-pulse", { 'invisible': !cursorVisible })} >_</span>
    </p>
  );
};

const AnimatedSpan = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    return (
        <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn("font-mono text-left", className)}
        >
            {children}
        </motion.p>
    );
};


export function Terminal() {
  return (
    <div className="w-full max-w-2xl bg-black/70 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl p-4 text-sm text-gray-300 font-mono">
      <div className="flex items-center space-x-2 border-b border-gray-700 pb-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="space-y-1">
        <TypingAnimation>&gt; npx create-ai-app@latest my-awesome-idea</TypingAnimation>

        {/* FIX: Added children to AnimatedSpan to fix missing 'children' prop error. */}
        <AnimatedSpan className="text-green-500">
          ✔ Project setup complete.
        </AnimatedSpan>

        {/* FIX: Added children to AnimatedSpan to fix missing 'children' prop error. */}
        <AnimatedSpan className="text-green-500">
          ✔ Gemini API configured.
        </AnimatedSpan>

        {/* FIX: Added children to AnimatedSpan to fix missing 'children' prop error. */}
        <AnimatedSpan className="text-green-500">
          ✔ Installing dependencies...
        </AnimatedSpan>
        
        {/* FIX: Added children to AnimatedSpan to fix missing 'children' prop error. */}
        <AnimatedSpan className="text-blue-500">
          <span>ℹ Building production app...</span>
        </AnimatedSpan>

        {/* FIX: Added children to TypingAnimation to fix missing 'children' prop error. */}
        <TypingAnimation className="text-gray-400">
          Success! Your AI-powered app is ready.
        </TypingAnimation>

        {/* FIX: Added children to TypingAnimation to fix missing 'children' prop error. */}
        <TypingAnimation className="text-gray-400">
          To start, run `npm run dev`
        </TypingAnimation>
      </div>
    </div>
  );
}