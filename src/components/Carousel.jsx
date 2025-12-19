import { useState } from "react";
import ThemeSlide from "./ThemeSlide";

export default function Carousel({ themes }) {
  const [index, setIndex] = useState(0);

  function go(i) {
    setIndex((i + themes.length) % themes.length);
  }

  function copy(name) {
    navigator.clipboard.writeText(name);
  }

  return (
    <div className="relative w-[90vw] max-w-5xl h-[70vh] overflow-hidden rounded-xl bg-black shadow-2xl">
      <div
        className="flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {themes.map((t) => (
          <ThemeSlide key={t.name} theme={t} onCopy={copy} />
        ))}
      </div>

      <button
        onClick={() => go(index - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
      >
        ◀
      </button>

      <button
        onClick={() => go(index + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
      >
        ▶
      </button>
    </div>
  );
}
