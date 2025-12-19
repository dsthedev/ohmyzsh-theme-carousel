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

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (current) result.push(current);
      current = {
        name: line.replace("### ", "").trim(),
        imageUrl: null,
        repoUrl: null,
        content: [],
      };
      continue;
    }

    if (!current) continue;
    if (line.startsWith("## ")) continue;

    const img = line.match(/!\[.*?\]\((.*?)\)/);
    if (img && !current.imageUrl) {
      // Replace URL with local public path.
      // Use Vite's BASE_URL so the path works both in dev ("/") and when deployed under
      // a repo subpath (e.g. "/ohmyzsh-theme-carousel/"). import.meta.env.BASE_URL is
      // injected by Vite at build time and always ends with '/'.
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
