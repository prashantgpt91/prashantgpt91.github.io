import React, { useEffect, useRef, useState } from 'react';

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
  theme?: 'light' | 'dark';
  lang?: 'en' | 'fr' | 'es' | 'de' | 'ja' | 'ko' | 'zh-CN' | 'zh-TW' | 'ru';
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
  theme = 'dark',
  lang = 'en',
}) => {
  const scriptContainerRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const initialThemeRef = useRef(theme);

  // Load Giscus script once on mount
  useEffect(() => {
    if (!scriptContainerRef.current) return;

    // Clear only the script container (not React-managed DOM)
    while (scriptContainerRef.current.firstChild) {
      scriptContainerRef.current.removeChild(scriptContainerRef.current.firstChild);
    }
    setLoadState('loading');

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    if (term) script.setAttribute('data-term', term);
    script.setAttribute('data-strict', strict);
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', initialThemeRef.current);
    script.setAttribute('data-lang', lang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    script.onerror = () => {
      setLoadState('error');
    };

    scriptContainerRef.current.appendChild(script);

    // Timeout: if iframe doesn't appear in 15s, show error
    const timeout = setTimeout(() => {
      const iframe = scriptContainerRef.current?.querySelector('iframe.giscus-frame');
      if (!iframe) setLoadState('error');
    }, 15000);

    // Listen for Giscus messages
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      if (event.data?.giscus) {
        setLoadState('loaded');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('message', handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo, repoId, category, categoryId, mapping, term, strict, reactionsEnabled, emitMetadata, inputPosition, lang]);

  // Theme switching via postMessage (no remount)
  useEffect(() => {
    const iframe = scriptContainerRef.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
      );
    }
  }, [theme]);

  return (
    <div className="mt-2">
      {/* Script injection target - not managed by React */}
      <div ref={scriptContainerRef} />
      {/* React-managed status UI */}
      {loadState === 'loading' && (
        <div className="space-y-3 py-4">
          <div className="shimmer h-8 w-48 rounded-full" />
          <div className="shimmer h-24 w-full rounded-lg" />
        </div>
      )}
      {loadState === 'error' && (
        <div className="text-center text-gray-600 dark:text-gray-400 p-4 text-sm">
          Comments unavailable.{' '}
          <a
            href={`https://github.com/${repo}/discussions`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
};
