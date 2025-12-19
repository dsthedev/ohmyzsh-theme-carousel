export default function ThemeSelect({ themes, index, setIndex }) {
  function handleChange(e) {
    const newIndex = parseInt(e.target.value, 10);
    if (!isNaN(newIndex)) {
      setIndex(newIndex);
    }
  }

  return (
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
  );
}
