import { useEffect, useState } from "react";

const SRC =
  "https://raw.githubusercontent.com/ohmyzsh/wiki/refs/heads/main/Themes.md";

export function useThemes() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SRC)
      .then((r) => r.text())
      .then(parseThemes)
      .then((data) => {
        setThemes(data);
        setLoading(false);
      });
  }, []);

  return { themes, loading };
}

function parseThemes(md) {
  const lines = md.split("\n");
  const result = [];
  let current = null;

  // Only parse the content that lives between the
  // header "## Themes" and the following "## More themes" header.
  let inThemesSection = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inThemesSection) {
      if (trimmed === "## Themes") {
        inThemesSection = true;
      }
      continue;
    }

    // Stop parsing once we hit the next top-level heading for more themes.
    if (trimmed === "## More themes") break;

    // Completely ignore lines that are just YAML/markdown separators like '---'.
    if (trimmed === "---") continue;

    if (trimmed.startsWith("### ")) {
      if (current) result.push(current);
      current = {
        name: trimmed.replace("### ", "").trim(),
        imageUrl: null,
        repoUrl: null,
        content: [],
      };
      continue;
    }

    if (!current) continue;

    // ignore other top-level '## ' headings inside the section (defensive),
    // though we break earlier on the specific '## More themes'.
    if (trimmed.startsWith("## ")) continue;

    const img = line.match(/!\[.*?\]\((.*?)\)/);
    if (img && !current.imageUrl) {
      const base = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
        ? import.meta.env.BASE_URL
        : '/';
      current.imageUrl = base + 'images/' + img[1].split('/').pop();
      continue;
    }

    const repo = line.match(/\[Official repository\]\((.*?)\)/);
    if (repo) {
      current.repoUrl = repo[1];
      continue;
    }

    current.content.push(line);
  }

  if (current) result.push(current);

  return result.map((t) => ({
    ...t,
    content: t.content.join("\n").trim(),
  }));
}
