import BlobImage from "./BlobImage";

export default function ThemeSlide({ theme, onCopy }) {
  return (
    <div className="relative w-full h-full flex-shrink-0">
      <BlobImage
        src={theme.imageUrl}
        alt={theme.name}
        className="absolute inset-0 w-full h-full object-contain bg-black"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-6 space-y-3">
        <div className="flex items-center gap-3">
          <h2
            onClick={() => onCopy(theme.name)}
            className="text-xl font-semibold cursor-pointer relative"
          >
            {theme.name}
          </h2>

          {theme.repoUrl && (
            <a
              href={theme.repoUrl}
              target="_blank"
              className="text-sm text-sky-400 hover:underline"
            >
              repo
            </a>
          )}
        </div>

        <blockquote className="text-sm text-neutral-300 whitespace-pre-line border-l-2 border-neutral-600 pl-4">
          {theme.content}
        </blockquote>
      </div>
    </div>
  );
}
