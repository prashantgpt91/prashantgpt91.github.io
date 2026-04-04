const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format "2024-03-01" to "Mar'24"
 */
export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 2) return dateStr;
  const year = parts[0].slice(2); // "24"
  const month = MONTH_SHORT[parseInt(parts[1], 10) - 1] || '';
  return `${month}'${year}`;
}

/**
 * Format date range: "Mar'24 - May'24" or "Mar'24 - Present"
 */
export function formatDateRange(start: string, end?: string): string {
  const startFormatted = formatShortDate(start);
  if (!end) return `${startFormatted} - Present`;
  return `${startFormatted} - ${formatShortDate(end)}`;
}
