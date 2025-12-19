import { useState } from "react";

export default function ThemeSelect({ themes, index, setIndex }) {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="relative inline-flex items-center space-x-2">
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

      <button
        onClick={copyCurrent}
        aria-label="Copy theme name"
        className="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 hover:bg-neutral-700"
      >
        Copy
      </button>
      {copied && (
        <span
          className="absolute -top-6 right-0 text-sm text-green-400 px-2 py-1 bg-black/60 rounded"
          aria-live="polite"
        >
          Copied
        </span>
      )}
    </div>
  );
}
