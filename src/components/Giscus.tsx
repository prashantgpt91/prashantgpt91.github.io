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
  theme = 'light',
  lang = 'en',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create and configure the script
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
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // Add error handling
    script.onerror = () => {
      console.error('Failed to load Giscus script');
    };

    script.onload = () => {
      console.log('Giscus script loaded successfully');
    };

    containerRef.current.appendChild(script);

    // Listen for Giscus messages
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      
      console.log('Giscus message received:', event.data);
      
      // Handle successful login/interaction
      if (event.data?.giscus?.discussion || event.data?.giscus?.type === 'login') {
        console.log('User interacted with Giscus, scrolling to comments');
        setTimeout(() => {
          containerRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 1000);
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [repo, repoId, category, categoryId, mapping, term, strict, reactionsEnabled, emitMetadata, inputPosition, theme, lang]);

  return (
    <div ref={containerRef} className="mt-10">
      {/* Fallback content while loading */}
      <div className="text-center text-gray-500 p-4">
        Loading comments...
      </div>
    </div>
  );
};
