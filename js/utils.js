export function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function normalizeSlug(value = '') {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}
