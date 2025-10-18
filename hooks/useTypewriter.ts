"use client";
import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  enabled?: boolean;
  speed?: number;
  delay?: number;
  loop?: boolean;
  pauseOnComplete?: number;
}

interface UseTypewriterReturn {
  displayedText: string;
  isTyping: boolean;
  isComplete: boolean;
  reset: () => void;
}

export function useTypewriter({
  text,
  enabled = true,
  speed = 100,
  delay = 0,
  loop = false,
  pauseOnComplete = 0,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Reset function
  const reset = useCallback(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsTyping(false);
    setIsComplete(false);
    setHasStarted(false);
  }, []);

  // Get random typing speed for more realistic effect
  const getRandomSpeed = useCallback(() => {
    const variation = speed * 0.3; // 30% variation
    return Math.random() * variation + (speed - variation / 2);
  }, [speed]);

  // Initialize typewriter effect
  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      setIsTyping(false);
      return;
    }

    reset();

    if (delay > 0) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
        setIsTyping(true);
      }, delay);

      return () => clearTimeout(startTimeout);
    } else {
      setHasStarted(true);
      setIsTyping(true);
    }
  }, [text, enabled, delay, reset]);

  // Typewriter effect
  useEffect(() => {
    if (!enabled || !hasStarted) {
      return;
    }

    if (currentIndex < text.length) {
      const char = text[currentIndex];
      let currentSpeed = getRandomSpeed();

      // Slower typing for punctuation and spaces for more realistic effect
      if ([".", ",", "!", "?", ":", ";"].includes(char)) {
        currentSpeed *= 2.5;
      } else if (char === " ") {
        currentSpeed *= 1.5;
      }

      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, currentSpeed);

      return () => clearTimeout(timeout);
    } else {
      // Typing complete
      setIsTyping(false);
      setIsComplete(true);

      // Handle looping
      if (loop) {
        const loopTimeout = setTimeout(() => {
          if (pauseOnComplete > 0) {
            setTimeout(() => {
              reset();
              setHasStarted(true);
              setIsTyping(true);
            }, pauseOnComplete);
          } else {
            reset();
            setHasStarted(true);
            setIsTyping(true);
          }
        }, pauseOnComplete || 500);

        return () => clearTimeout(loopTimeout);
      }
    }
  }, [
    currentIndex,
    text,
    enabled,
    hasStarted,
    getRandomSpeed,
    loop,
    pauseOnComplete,
    reset,
  ]);

  return {
    displayedText,
    isTyping,
    isComplete,
    reset,
  };
}

// Cursor hook for blinking effect
interface UseCursorOptions {
  enabled?: boolean;
  blinkSpeed?: number;
  fastBlinkWhileTyping?: boolean;
  isTyping?: boolean;
}

interface UseCursorReturn {
  showCursor: boolean;
  cursorChar: string;
}

export function useCursor({
  enabled = true,
  blinkSpeed = 530,
  fastBlinkWhileTyping = true,
  isTyping = false,
}: UseCursorOptions): UseCursorReturn {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setShowCursor(false);
      return;
    }

    let currentBlinkSpeed = blinkSpeed;

    // Faster blinking while typing
    if (fastBlinkWhileTyping && isTyping) {
      currentBlinkSpeed = blinkSpeed * 0.6; // 60% of normal speed
    }

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, currentBlinkSpeed);

    return () => clearInterval(interval);
  }, [enabled, blinkSpeed, fastBlinkWhileTyping, isTyping]);

  return {
    showCursor,
    cursorChar: "|",
  };
}

// Combined hook for convenience
interface UseTypewriterWithCursorOptions extends UseTypewriterOptions {
  cursorBlinkSpeed?: number;
  fastCursorWhileTyping?: boolean;
}

interface UseTypewriterWithCursorReturn extends UseTypewriterReturn {
  showCursor: boolean;
  cursorChar: string;
}

export function useTypewriterWithCursor(
  options: UseTypewriterWithCursorOptions
): UseTypewriterWithCursorReturn {
  const {
    cursorBlinkSpeed = 530,
    fastCursorWhileTyping = true,
    ...typewriterOptions
  } = options;

  const typewriter = useTypewriter(typewriterOptions);
  const cursor = useCursor({
    enabled: options.enabled,
    blinkSpeed: cursorBlinkSpeed,
    fastBlinkWhileTyping: fastCursorWhileTyping,
    isTyping: typewriter.isTyping,
  });

  return {
    ...typewriter,
    ...cursor,
  };
}
