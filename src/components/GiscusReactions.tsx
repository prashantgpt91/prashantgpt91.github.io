import React, { useEffect, useRef } from 'react';

interface GiscusReactionsProps {
  theme?: 'light' | 'dark';
  mapping?: 'pathname' | 'url' | 'title';
}

/**
 * Renders only the Giscus reactions bar (no comments, no input box).
 * Works by constraining the Giscus iframe height to show only the top
 * reactions section, hiding everything below via overflow: hidden.
 */
export const GiscusReactions: React.FC<GiscusReactionsProps> = ({
  theme = 'dark',
  mapping = 'pathname',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'prashantgpt91/prashantgpt91.github.io');
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnk4NzczMjkyMw==');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOBTqyu84Cr7SZ');
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    containerRef.current.appendChild(script);
  }, [theme, mapping]);

  return (
    <div
      className="giscus-reactions-only"
      style={{
        maxHeight: '105px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div ref={containerRef} />
    </div>
  );
};

export default GiscusReactions;
