export default function ThemeSelect({ themes, onSelect }) {
  return (
    <select
      onChange={(e) => onSelect(+e.target.value)}
      className="bg-neutral-800 text-sm text-white px-3 py-2 rounded border border-neutral-700"
    >
      {themes.map((t, i) => (
        <option key={t.name} value={i}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
