import { useEffect, useState } from "react";

export default function BlobImage({ src, alt, className }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    if (!src) return;

    let active = true;

    fetch(src)
      .then((r) => r.blob())
      .then((blob) => {
        if (!active) return;
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      });

    return () => {
      active = false;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src]);

  if (!blobUrl)
    return (
      <div className="bg-black flex items-center justify-center text-sm text-neutral-500">
        loading image...
      </div>
    );

  return <img src={blobUrl} alt={alt} className={className} />;
}
