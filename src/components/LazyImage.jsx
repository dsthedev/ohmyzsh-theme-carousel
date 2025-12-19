import { useEffect, useRef, useState } from "react";

export default function LazyImage({ src, alt, className = "", placeholder = null, enabled = true }) {
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) {
      // If not enabled, reset state and don't observe
      setVisible(false);
      setLoadedSrc(null);
      setLoaded(false);
      return;
    }

    if (!imgRef.current) return;
    if (!("IntersectionObserver" in window)) {
      // Fallback: load immediately
      setVisible(true);
      setLoadedSrc(src);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            setLoadedSrc(src);
            obs.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: "200px", // start loading a bit earlier
        threshold: 0.01,
      }
    );

    obs.observe(imgRef.current);

    return () => obs.disconnect();
  }, [src, enabled]);

  return (
    <div ref={imgRef} className={`relative w-full h-full ${className}`}>
      {!loaded && placeholder}
      {loadedSrc && (
        <img
          src={loadedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
