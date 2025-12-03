// src/components/splash/BackgroundPattern.jsx
import { useMemo } from 'react';

export default function BackgroundPattern({ fadeOut }) {
  const patternDataUri = useMemo(() => {
    const svg = `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#94A3B8" fill-opacity="0.2"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <div
      className={`absolute inset-0 opacity-40 transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : ''
      }`}
      style={{
        backgroundImage: patternDataUri,
        backgroundRepeat: 'repeat',
      }}
      aria-hidden
    />
  );
}