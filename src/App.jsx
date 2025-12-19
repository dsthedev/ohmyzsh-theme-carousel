import { useThemes } from "./hooks/useThemes";
import Carousel from "./components/Carousel";
import ThemeSelect from "./components/ThemeSelect";

import "./App.css";

export default function App() {
  const { themes, loading } = useThemes();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-neutral-400">
        loading themes…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">
      <div className="absolute top-4 left-4 z-50">
        <ThemeSelect themes={themes} onSelect={() => {}} />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Carousel themes={themes} />
      </div>

      <footer className="text-xs text-neutral-500 text-center py-3">
        built by [REDACTED] w/ 💙
      </footer>
    </div>
  );
}
