export function renderMarkdown(md) {
  if (typeof md !== "string") return null;

  const lines = md.split("\n");
  const out = [];
  let paraBuffer = [];
  let listBuffer = [];

  const flushPara = () => {
    if (!paraBuffer.length) return;
    out.push(
      <p key={`p-${out.length}`} className="mb-2">
        {paraBuffer.join(" ")}
      </p>
    );
    paraBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) return;
    out.push(
      <ul key={`ul-${out.length}`} className="list-disc ml-5 mb-2">
        {listBuffer.map((it, k) => (
          <li key={k}>{it}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("- ")) {
      // list item
      listBuffer.push(line.slice(2).trim());
      continue;
    }

    if (line.trim() === "") {
      // blank line -> flush paragraph and list buffers
      flushPara();
      flushList();
      continue;
    }

    // normal paragraph line
    paraBuffer.push(line.trim());
  }

  flushPara();
  flushList();

  return out;
}
