# Design System — prashant.sh

Last updated: April 4, 2026

---

## Typography

| Element | Classes | Size | Weight |
|---------|---------|------|--------|
| Page title (hero) | `text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight` | 30→48px | 600 |
| Page title (detail) | `text-3xl md:text-4xl font-bold` | 30→36px | 600 |
| Page title (listing) | `text-3xl md:text-4xl font-bold` | 30→36px | 600 |
| Section heading | `text-lg font-semibold` | 18px | 600 |
| Card title | `text-lg font-medium` | 18px | 500 |
| Body text | `text-base leading-relaxed` | 16px | 400 |
| Secondary text | `text-sm text-muted-foreground` | 14px | 400 |
| Caption / meta | `text-xs text-muted-foreground` | 12px | 400 |
| Skill tags | `text-sm text-muted-foreground` | 14px | 400 |

**Font:** Inter (400, 500, 600) via Google Fonts with system fallback.
**Never use:** font-light (300), font-bold (700) — not loaded.

---

## Colors

### Semantic Tokens (always prefer these over raw Tailwind colors)

| Token | Usage | Light | Dark |
|-------|-------|-------|------|
| `bg-background` | Page backgrounds | white | slate-950 |
| `text-foreground` | Primary text | dark navy | near-white |
| `text-muted-foreground` | Secondary text, labels, meta | medium gray | slate-400 |
| `bg-muted` | Subtle backgrounds | light gray | dark slate |
| `bg-card` | Card backgrounds | white | dark navy |
| `border-border` | All borders | light gray | dark slate |
| `text-primary` | Interactive elements | navy | near-white |
| `bg-primary` | Primary buttons | navy | near-white |
| `text-destructive` | Errors | red | dark red |

### Brand Colors (hardcoded, intentional)

| Usage | Value |
|-------|-------|
| Brand gradient | `from-blue-600 to-purple-600` |
| Accent hover | `text-blue-600`, `hover:text-blue-600` |
| Blog card border | `border-l-blue-500` |
| Project card border | `border-l-purple-500` |
| Paper card border | `border-l-teal-500` |
| Featured badge | `bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300` |
| Focus ring | `#3b82f6` (blue-500) |

### Rules
- **Never use raw gray/slate classes for text** — use `text-foreground` or `text-muted-foreground`
- **Never use `bg-white dark:bg-slate-*`** — use `bg-background` or `bg-card`
- **Never use `border-gray-* dark:border-slate-*`** — use `border-border`
- **Exception:** MarkdownRenderer internals (code blocks, tables) may use specific colors for syntax

---

## Spacing

| Context | Value | Tailwind |
|---------|-------|----------|
| Page horizontal padding | 16px mobile, 24px desktop | `px-4 sm:px-6` |
| Page vertical padding | 32px (listing), 48px (detail) | `py-8` / `py-12` |
| Section gap | 48px | `mt-12` |
| Card padding | 24px | `p-6` |
| Card gap (grid) | 24px mobile, 32px desktop | `gap-6 md:gap-8` |
| Element gap (flex) | 4-8px | `gap-1` to `gap-2` |
| Badge gap | 6px | `gap-1.5` |
| Content max-width | 896px | `max-w-4xl` |
| Listing max-width | 1152px | `max-w-6xl` |
| Hero max-width | 768px | `max-w-3xl` |

---

## Components

### Buttons
- Primary action: `variant="default"` (solid)
- Secondary action: `variant="outline"` (bordered)
- Inline/subtle: `variant="ghost"` (no border)
- Icon-only: `size="icon"` — always add `aria-label`

### Badges
- Category/status: `variant="outline"` with `text-xs`
- Featured: `bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs`
- Tags (clickable): `variant="secondary"` with `cursor-pointer`
- Tags (non-clickable): `variant="outline"` with `cursor-default`

### Cards (Listing)
- Container: `bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer`
- Left accent border: `border-l-2 border-l-{color}-500`
- Content padding: `p-6`

### Engagement Bar
- Position: bottom of article content only (not top)
- Container: `border-y border-border py-1`
- Buttons: ghost, `text-muted-foreground hover:text-foreground`

### Navigation
- Active link: `text-blue-600 font-medium`
- Inactive link: default text with `hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10`
- Logo: gradient `from-blue-600 to-purple-600` — links to home

---

## Layout Patterns

### Detail Pages
```
Header (sticky)
ReadingProgressBar (fixed, under header)
  Back link
  <header> title, metadata </header>
  Article content (MarkdownRenderer)
  Engagement bar (bottom only)
  Author footer (blog only)
  Related posts (blog only)
  Comments (Giscus)
  Back to top
```

### Listing Pages
```
Header (sticky)
  Page title + description
  Search + Filters
  Card grid
  Pagination
```

### Homepage
```
Header (sticky)
  Hero (full viewport height minus header)
  Featured content ("Recent work")
  Footer
```

---

## Dark Mode

- Default: dark
- Toggle: localStorage-persisted, class-based (`dark` on `<html>`)
- Inline `<head>` script prevents flash (FOUWT)
- Giscus theme syncs via `postMessage`
- Code blocks: `oneDark` (dark) / `oneLight` (light) — switches automatically

---

## Accessibility

- Focus ring: `outline: 2px solid #3b82f6; outline-offset: 2px`
- Skip-to-content link in App.tsx
- All icon-only buttons must have `aria-label`
- Mobile menu: `aria-expanded`, `aria-controls`, Escape dismiss, outside-click close
- Reduced motion: all animations disabled via `prefers-reduced-motion: reduce`
- Semantic HTML: `<main>`, `<article>`, `<header>`, `<footer>`, `<nav>`, `<section>`
