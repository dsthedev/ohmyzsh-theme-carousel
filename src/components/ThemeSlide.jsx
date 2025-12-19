import { useState } from "react";
import { renderMarkdown } from "../utils/renderMarkdown";

export default function ThemeSlide({ theme }) {
  const [copied, setCopied] = useState(false);

  function copyName() {
    navigator.clipboard.writeText(theme.name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2s tooltip
    });
  }

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Image */}
      {theme.imageUrl && (
        <img
          src={theme.imageUrl}
          alt={theme.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      )}

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-4 space-y-2">
        {/* Theme name with copy */}
        <div className="flex items-center space-x-2">
          <h2
            className="text-xl font-bold cursor-pointer hover:text-blue-400"
            onClick={copyName}
          >
            {theme.name}
          </h2>
          {copied && (
            <span className="text-sm text-green-400 animate-fade" aria-live="polite">Copied</span>
          )}
        </div>

        {/* Official repo link */}
        {theme.repoUrl && (
          <a
            href={theme.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline hover:text-blue-300"
          >
            Official repository
          </a>
        )}

        {/* Content */}
        <blockquote className="text-sm text-neutral-300 border-l-2 border-neutral-600 pl-3 space-y-1">
          {renderMarkdown(theme.content)}
        </blockquote>
      </div>

      {/* Optional: Fade animation for tooltip */}
      <style>
        {`
          @keyframes fade {
            0% {opacity:0;}
            10% {opacity:1;}
            90% {opacity:1;}
            100% {opacity:0;}
          }
          .animate-fade {
            animation: fade 2s forwards;
          }
        `}
      </style>
    </div>
  );
}
