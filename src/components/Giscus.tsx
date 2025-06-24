import { useEffect, useState } from 'react';

interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  term?: string;
  strict?: string;
  reactionsEnabled?: string;
  emitMetadata?: string;
  inputPosition?: string;
  theme?: string;
  lang?: string;
}

export const Giscus = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping,
  term,
  strict = '0',
  reactionsEnabled = '1',
  emitMetadata = '1',
  inputPosition = 'top',
  theme = 'light',
  lang = 'en'
}: GiscusProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
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
      script.setAttribute('data-loading', 'lazy');
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;
      
      const giscusContainer = document.getElementById('giscus-container');
      if (giscusContainer) {
        // Clear the container before appending to avoid duplicates
        giscusContainer.innerHTML = '';
        giscusContainer.appendChild(script);
      }
      
      setMounted(true);

      // Clean up function to remove the script when component unmounts
      return () => {
        const giscusContainer = document.getElementById('giscus-container');
        if (giscusContainer) {
          giscusContainer.innerHTML = '';
        }
      };
    }
    
    // Update theme if it changes
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme
            }
          }
        },
        'https://giscus.app'
      );
    }
  }, [
    mounted,
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    term,
    strict,
    reactionsEnabled, 
    emitMetadata,
    inputPosition,
    theme,
    lang
  ]);

  return <div id="giscus-container" className="mt-10"></div>;
};
