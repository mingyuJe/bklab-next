/**
 * Client-safe utilities (no Node.js APIs).
 * Used in both server and client components.
 */

// Render **bold** to <em> (styled as accent in CSS)
export function renderAuthors(authors: string): string {
  return authors.replace(/\*\*(.+?)\*\*/g, '<em>$1</em>');
}

// Format date "2026-05-08" → "2026 · 05 · 08"
export function formatDate(date: string): string {
  if (!date) return '';
  const [y, m, d] = date.split('-');
  if (!y) return date;
  if (!m) return y;
  if (!d) return `${y} · ${m}`;
  return `${y} · ${m} · ${d}`;
}
