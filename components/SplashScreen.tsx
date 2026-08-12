"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUBTITLE = "Rusted AI";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter for subtitle
  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= SUBTITLE.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 45);
      return () => clearInterval(interval);
    }, 700);
    return () => clearTimeout(start);
  }, []);

  // Dismiss after text finishes + short pause
  useEffect(() => {
    const total = 700 + SUBTITLE.length * 45 + 700;
    const timer = setTimeout(() => setVisible(false), total);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{ background: 'rgba(255, 255, 255, 0.98)' }}
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-bold tracking-tight"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: 'var(--foreground)' }}
          >
            <span style={{ color: 'var(--cyan)' }}>r</span>AI
          </motion.h1>

          {/* Subtitle — typewriter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="mt-3 font-mono"
            style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)', color: 'rgba(33, 33, 33, 0.7)', letterSpacing: '0.08em' }}
          >
            — {SUBTITLE.slice(0, charIndex)}
            <span
              className="inline-block w-[2px] h-[1em] ml-0.5 align-middle"
              style={{
                background: 'var(--cyan)',
                opacity: charIndex >= SUBTITLE.length ? 0 : 1,
              }}
            />
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
