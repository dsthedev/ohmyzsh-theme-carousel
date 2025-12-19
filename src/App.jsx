import { useEffect, useState } from "react";
import { useThemes } from "./hooks/useThemes";
import Carousel from "./components/Carousel";
import ThemeSelect from "./components/ThemeSelect";
// import "./App.css";

export default function App() {
  const { themes, loading } = useThemes();
  const [index, setIndex] = useState(0);

  // Initialize index from URL hash
  useEffect(() => {
    if (!themes.length) return;

    const hash = window.location.hash.slice(1);
    const idx = themes.findIndex((t) => t.name === hash);
    if (idx !== -1) setIndex(idx);
  }, [themes]);

  // Update URL hash when index changes
  useEffect(() => {
    if (themes.length && index >= 0 && index < themes.length) {
      window.location.hash = themes[index].name;
    }
  }, [themes, index]);

  // Defensive: ensure index is always valid
  useEffect(() => {
    if (themes.length && (index < 0 || index >= themes.length)) {
      setIndex(0);
    }
  }, [themes, index]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-neutral-400">
        loading themes…
      </div>
    );
  }

  const PROJECT_NAME =
    import.meta.env.VITE_PROJECT_NAME || "OhMyZsh Theme Carousel";

  return (
    <div className="dark min-h-screen bg-neutral-900 text-neutral-100 flex flex-col relative">
      <header className="w-full flex flex-col items-center z-50 pt-6">
        <h1 className="text-4xl text-center p-6">{PROJECT_NAME}</h1>
        <ThemeSelect themes={themes} index={index} setIndex={setIndex} />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        {themes.length > 0 && (
          <Carousel themes={themes} index={index} setIndex={setIndex} />
        )}
      </div>

      <footer className="text-xs text-neutral-500 text-center p-3">
        built by <a href="https://github.com/dsthedev" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">d11z</a> w/ 💙
      </footer>
    </div>
  );
}
