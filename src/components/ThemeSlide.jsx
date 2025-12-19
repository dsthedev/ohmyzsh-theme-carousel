import { useState } from "react";
import BlobImage from "./BlobImage";

export default function ThemeSlide({ theme }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(theme.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative w-full h-full flex-shrink-0">
      <BlobImage
        src={theme.imageUrl}
        alt={theme.name}
        className="absolute inset-0 w-full h-full object-contain bg-black"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-6 space-y-3">
        <div className="flex items-center gap-3 relative">
          <h2
            onClick={copy}
            className="text-xl font-semibold cursor-pointer relative"
          >
            {theme.name}
            {copied && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-xs px-2 py-1 rounded">
                copied
              </span>
            )}
          </h2>

          {theme.repoUrl && (
            <a
              href={theme.repoUrl}
              target="_blank"
              className="text-sm text-sky-400 hover:underline"
            >
              Official Repo
            </a>
          )}
        </div>

        {theme.renderedContent}
      </div>
    </div>
  );
}
