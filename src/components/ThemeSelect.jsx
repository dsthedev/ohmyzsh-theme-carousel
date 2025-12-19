import { useState } from "react";

export default function ThemeSelect({ themes, index, setIndex, favorites = [], toggleFavorite, isFavorite }) {
  const [copied, setCopied] = useState(false);
  const [favSaved, setFavSaved] = useState(false);

  function handleChange(e) {
    const newIndex = parseInt(e.target.value, 10);
    if (!isNaN(newIndex)) {
      setIndex(newIndex);
    }
  }

  function copyCurrent() {
    const name = themes?.[index]?.name;
    if (!name) return;
    navigator.clipboard
      .writeText(name)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  function toggleCurrentFavorite() {
    const idx = index;
    if (typeof idx !== 'number' || !toggleFavorite) return;
    toggleFavorite(idx);
    setFavSaved(true);
    setTimeout(() => setFavSaved(false), 1800);
  }

  const currentName = themes?.[index]?.name;

  return (
    <div className="w-full relative flex flex-col items-center">
      <div className="inline-flex items-center space-x-2">
        <select
          value={index}
          onChange={handleChange}
          className="bg-neutral-800 text-sm text-white px-3 py-2 rounded border border-neutral-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {themes.map((t, i) => (
            <option key={t.name} value={i}>
              {t.name}
            </option>
          ))}
        </select>

        <div className="relative inline-flex items-center space-x-2">
          <button
            onClick={copyCurrent}
            aria-label="Copy theme name"
            className="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 hover:bg-neutral-700"
          >
            Copy
          </button>

          <button
            onClick={toggleCurrentFavorite}
            aria-label={isFavorite && isFavorite(index) ? "Remove favorite" : "Add favorite"}
            className="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 hover:bg-neutral-700"
          >
            {isFavorite && isFavorite(index) ? "★" : "☆"}
          </button>

          {copied && (
            <span
              className="absolute top-1/1 left-0 text-sm text-green-400 px-2 py-1 bg-black/60 rounded"
              aria-live="polite"
            >
              Copied!
            </span>
          )}

          {favSaved && (
            <span
              className="absolute top-1/1 right-0 text-sm text-yellow-300 px-2 py-1 bg-black/60 rounded"
              aria-live="polite"
            >
              Saved!
            </span>
          )}
        </div>
      </div>

      {Array.isArray(favorites) && favorites.length > 0 && (
        <div className="mt-3 w-1/2 flex flex-col items-center mb-4">
          <label className="text-xs text-neutral-400 mb-1">Favorites</label>
          <select
            onChange={(e) => {
              const idx = parseInt(e.target.value, 10);
              if (!isNaN(idx) && idx >= 0 && idx < themes.length) setIndex(idx);
            }}
            className="w-1/3 bg-neutral-800 text-sm text-white px-3 py-2 rounded border border-neutral-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={index}
          >
            {favorites.map((favIdx) => {
              const name = themes?.[favIdx]?.name || `#${favIdx}`;
              return (
                <option key={favIdx} value={favIdx}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
}
