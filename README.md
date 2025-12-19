# OhMyZsh Theme Carousel

[Live Demo](https://dsthedev.github.io/ohmyzsh-theme-carousel/)

A small React + Vite app that fetches the Oh My Zsh themes index and presents a dark-themed, swipeable carousel of themes. Each slide shows the theme preview image (downloaded to `public/images/`), theme name, and a link to the official repository. The app is optimized for performance with lazy-loading and favorites persisted to `localStorage`.

**Who it's for**

- Developers and tinkerers who browse Oh My Zsh themes and want a quick visual way to preview and copy theme names.
- People who want a small demo of Vite + React + Tailwind v4 with a practical UI (carousel, lazy images, favorites).

**Features**

- Dark, centered carousel with fade transitions between slides.
- Touch/swipe and keyboard navigation (arrow keys).
- Copy theme name to clipboard from slide or header control.
- Image lazy-loading (IntersectionObserver) and a spinning emoji placeholder while loading.
- Favorites: add/remove favorites; favorites persisted in `localStorage` and available in a favorites dropdown.
- Persists last-viewed theme and restores it on load (URL hash takes precedence).
- Tailwind v4 + custom font (`Source Code Pro`) loaded via Google Fonts.

**Project structure (important files)**

- `src/components/Carousel.jsx` — carousel layout and navigation
- `src/components/ThemeSlide.jsx` — slide layout and copy/favorite UI
- `src/components/ThemeSelect.jsx` — header select + copy + favorite controls
- `src/components/LazyImage.jsx` — IntersectionObserver-based image loader
- `src/hooks/useThemes.jsx` — fetches and parses the Oh My Zsh Themes.md
- `download_images.py` — helper script (included) to download preview images into `public/images/`

**Quick start**

1. Install dependencies:

```bash
cd /home/d11z/Sandbox/ohmyzsh-theme-carousel
npm install
```

2. Download images (optional but recommended to avoid CORS at runtime):

```bash
python3 ./download_images.py
```

3. Run dev server:

```bash
npm run dev
```

**Build / Publish**

- Build for production: `npm run build`.
- Serve the `dist/` output (or publish to GitHub Pages). When published, replace `[LIVE_URL]` above with your GitHub Pages URL.

**Environment / customizations**

- `VITE_PROJECT_NAME` — set a custom project name (shown in header). Example in `.env`:
  ```env
  VITE_PROJECT_NAME="My Theme Carousel"
  ```

**Notes & tips**

- The app expects preview images to live under `public/images/`. Use `download_images.py` to fetch and name them consistently with the Markdown source.
- Favorites are stored as an array of theme indices in `localStorage` under the key `ohmyzsh:favorites`.
- Last-viewed theme is stored under `ohmyzsh:last_theme` and restored on load unless a URL hash is present.

**Contributing**

- Open an issue or PR with improvements — suggestions welcome (better markdown rendering, smoother transitions, performance tweaks).

**License**

¯\\_(ツ)\_/¯
