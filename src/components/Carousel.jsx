import { useEffect, useRef } from "react";
import ThemeSlide from "./ThemeSlide";

export default function Carousel({ themes, index, setIndex }) {
  const ref = useRef(null);
  const startXRef = useRef(null);

  // Handle keyboard navigation
  useEffect(() => {
    if (!themes.length) return;

    function onKey(e) {
      if (e.key === "ArrowLeft") {
        setIndex((prev) => ((prev - 1) % themes.length + themes.length) % themes.length);
      }
      if (e.key === "ArrowRight") {
        setIndex((prev) => ((prev + 1) % themes.length + themes.length) % themes.length);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [themes.length, setIndex]);

  // Touch/swipe support
  function onTouchStart(e) {
    startXRef.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    const startX = startXRef.current;
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) {
      setIndex((prev) => ((prev - 1) % themes.length + themes.length) % themes.length);
    }
    if (dx < -50) {
      setIndex((prev) => ((prev + 1) % themes.length + themes.length) % themes.length);
    }
    startXRef.current = null;
  }

  function go(i) {
    if (!themes.length) return;
    const newIndex = ((i % themes.length) + themes.length) % themes.length;
    setIndex(newIndex);
  }

  return (
    <div
      ref={ref}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-[90vw] max-w-5xl h-[70vh] overflow-hidden rounded-xl bg-black shadow-2xl"
    >
      {/* Slides: absolutely positioned and fade between them */}
      {themes.map((t, i) => {
        const isActive = i === index;
        return (
          <div
            key={t.name}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <ThemeSlide theme={t} isActive={isActive} />
          </div>
        );
      })}

      {/* Navigation arrows */}
      <button
        onClick={() => go(index - 1)}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-6xl z-20 p-4 bg-black/30 rounded-full hover:bg-black/50"
      >
        ◀
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-6xl z-20 p-4 bg-black/30 rounded-full hover:bg-black/50"
      >
        ▶
      </button>
    </div>
  );
}
