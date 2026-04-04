/**
 * Update document title and meta tags for SEO and social sharing.
 * Since this is an SPA, we need to update these dynamically per page.
 */
export function updatePageMeta(opts: {
  title: string;
  description: string;
  path?: string;
}) {
  const { title, description, path } = opts;
  const fullTitle = `${title} | Prashant Gupta`;
  const url = path ? `https://prashant.sh${path}` : window.location.href;

  document.title = fullTitle;

  // Update or create meta tags
  setMeta('description', description);
  setMeta('og:title', fullTitle, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:url', url, 'property');
  setMeta('twitter:title', fullTitle, 'property');
  setMeta('twitter:description', description, 'property');
  setMeta('twitter:url', url, 'property');

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (canonical) {
    canonical.href = url;
  } else {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    document.head.appendChild(canonical);
  }
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (el) {
    el.content = content;
  } else {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    el.content = content;
    document.head.appendChild(el);
  }
}
