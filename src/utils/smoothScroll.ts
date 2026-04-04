/**
 * Smooth scroll with ease-in-out easing.
 * Much gentler on the eyes than native scrollIntoView.
 */
export function smoothScrollTo(targetY: number, duration = 800) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime: number | null = null;

  // Ease-in-out cubic
  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + diff * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function smoothScrollToElement(id: string, offset = 0, duration = 800) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const targetY = window.scrollY + rect.top - offset;
  smoothScrollTo(targetY, duration);
}

export function smoothScrollToTop(duration = 600) {
  smoothScrollTo(0, duration);
}
