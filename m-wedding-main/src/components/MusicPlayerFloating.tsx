import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerFloatingProps {
  musicUrl: string;
  autoplay?: boolean;
}

export default function MusicPlayerFloating({ musicUrl, autoplay = false }: MusicPlayerFloatingProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Attempt to play on mount if autoplay is enabled
  useEffect(() => {
    if (autoplay && audioRef.current && !hasInteracted) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Autoplay was blocked. It's fine, we wait for user interaction.
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [autoplay, hasInteracted, musicUrl]);

  // Global listener: If autoplay was blocked, play on first user layout interaction
  useEffect(() => {
    if (!autoplay || isPlaying || hasInteracted) return;

    const handleFirstInteraction = () => {
      setHasInteracted(true);
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      // Remove listeners after first interaction
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction, { passive: true });
    document.addEventListener("scroll", handleFirstInteraction, { once: true, passive: true });
    document.addEventListener("touchstart", handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [autoplay, isPlaying, hasInteracted]);

  const togglePlay = () => {
    setHasInteracted(true);
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={togglePlay}
          className="relative group flex items-center justify-center outline-none transition-transform hover:scale-105 active:scale-95"
          aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        >
          {/* Soft shadow/glow */}
          <div className="absolute inset-0 rounded-full bg-black/15 blur-md transition-opacity group-hover:bg-black/25" />

          {/* Vinyl Record */}
          <div
            className="relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center animate-spin"
            style={{
              background: "linear-gradient(135deg, #111, #333)",
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.15), 0 4px 10px rgba(0,0,0,0.3)",
              animationDuration: "3.5s",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-[4px] rounded-full border border-white/10" />
            <div className="absolute inset-[10px] rounded-full border border-white/5" />

            {/* Center soft label (champagne/rose colored) */}
            <div className="relative w-[18px] h-[18px] rounded-full bg-[#e8cdb2] border border-gray-700 flex items-center justify-center shadow-inner">
              {/* Spindle hole */}
              <div className="w-[4px] h-[4px] rounded-full bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" />
            </div>
            
            {/* Glossy reflection effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Floating Music Note Animation when Playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: [0, 1, 0], y: -30, scale: 1, rotate: 15 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute -top-1 -right-1 pointer-events-none"
              >
                <Music className="w-3.5 h-3.5 text-[#d4af37]" fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Paused Tooltip/Indicator (Optional, for clarity) */}
          {!isPlaying && (
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-400 border-2 border-white pointer-events-none" />
          )}
        </button>
      </div>
    </>
  );
}
