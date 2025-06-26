import React, { useEffect, useRef } from 'react';

interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  term?: string;
  strict?: '0' | '1';
  reactionsEnabled?: '0' | '1';
  emitMetadata?: '0' | '1';
  inputPosition?: 'top' | 'bottom';
  theme?: 'light' | 'dark' | 'preferred_color_scheme' | `https://giscus.app/themes/custom/custom.css`;
  lang?: 'en' | 'fr' | 'es' | 'de' | 'ja' | 'ko' | 'zh-CN' | 'zh-TW' | 'ru';
  loading?: 'lazy';
}

export const Giscus: React.FC<GiscusProps> = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping,
  term,
  strict = '0',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'top',
  theme = 'light',
  lang = 'en',
  loading = 'lazy',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const giscusScript = document.createElement('script');
    const attributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': repo,
      'data-repo-id': repoId,
      'data-category': category,
      'data-category-id': categoryId,
      'data-mapping': mapping,
      'data-term': term,
      'data-strict': strict,
      'data-reactions-enabled': reactionsEnabled,
      'data-emit-metadata': emitMetadata,
      'data-input-position': inputPosition,
      'data-theme': theme,
      'data-lang': lang,
      'data-loading': loading,
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      if (value) {
        giscusScript.setAttribute(key, value);
      }
    });

    // Clear the container and append the new script
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(giscusScript);

  }, [repo, repoId, category, categoryId, mapping, term, strict, reactionsEnabled, emitMetadata, inputPosition, lang, loading]);

  // Effect to update Giscus theme when the site's theme changes
  useEffect(() => {
    const iframe = containerRef.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage({ giscus: { setTheme: theme } }, 'https://giscus.app');
    }
  }, [theme]);

  return <div ref={containerRef} className="mt-10" />;
};
