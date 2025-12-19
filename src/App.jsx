import { useEffect, useState } from "react";
import { useThemes } from "./hooks/useThemes";
import Carousel from "./components/Carousel";
import ThemeSelect from "./components/ThemeSelect";
// import "./App.css";

export default function App() {
  const { themes, loading } = useThemes();
  const [index, setIndex] = useState(0);

  // Initialize index from URL hash, falling back to localStorage
  useEffect(() => {
    if (!themes.length) return;

    const hash = window.location.hash.slice(1);
    const idxFromHash = themes.findIndex((t) => t.name === hash);
    if (idxFromHash !== -1) {
      setIndex(idxFromHash);
      return;
    }

    const last = localStorage.getItem("ohmyzsh:last_theme");
    if (last) {
      const idxFromStorage = themes.findIndex((t) => t.name === last);
      if (idxFromStorage !== -1) {
        setIndex(idxFromStorage);
      }
    }
  }, [themes]);

  // Update URL hash and persist last viewed theme when index changes
  useEffect(() => {
    if (themes.length && index >= 0 && index < themes.length) {
      const name = themes[index].name;
      window.location.hash = name;
      try {
        localStorage.setItem("ohmyzsh:last_theme", name);
      } catch (e) {
        // ignore storage errors
      }
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
