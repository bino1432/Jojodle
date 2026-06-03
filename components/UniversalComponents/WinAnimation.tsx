"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const GIF_URL = "/images/image/Menacing.gif"; // 👈 troque pelo caminho do seu GIF
const GIF_SIZE = 168;            // tamanho em px de cada gif
const GIFS_PER_CHAIN = 6;       // quantos gifs em cada coluna
const GAP = 8;                  // gap em px entre os gifs
const ANIMATION_DURATION = 8;   // duração total em segundos
// ──────────────────────────────────────────────────────────────────────────────

interface WinAnimationProps {
  winGame: boolean;
}

function GifChain({ side }: { side: "left" | "right" }) {
  const totalHeight = GIFS_PER_CHAIN * (GIF_SIZE + GAP);

  return (
    <motion.div
      className="absolute flex flex-col gap-2 pointer-events-none"
      style={{
        bottom: 0,
        [side]: 16,
        width: GIF_SIZE,
      }}
      initial={{ y: totalHeight + 100 }}
      animate={{ y: -(totalHeight + 100) }}
      transition={{
        duration: ANIMATION_DURATION,
        ease: "linear",
      }}
    >
      {Array.from({ length: GIFS_PER_CHAIN }).map((_, i) => (
        <img
          key={i}
          src={GIF_URL}
          alt=""
          width={GIF_SIZE}
          height={GIF_SIZE}
          style={{ imageRendering: "pixelated" }}
        />
      ))}
    </motion.div>
  );
}

export default function WinAnimation({ winGame }: WinAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!winGame) return;

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), ANIMATION_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [winGame]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="win-animation"
          className="fixed inset-0 overflow-hidden z-50 pointer-events-none mx-40"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GifChain side="left" />
          <GifChain side="right" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}