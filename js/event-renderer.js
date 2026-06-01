import { escapeHtml, formatDate } from './utils.js';

export function renderEvents(events, selector = '#events-list') {
  const target = document.querySelector(selector);
  if (!target) return;

  target.innerHTML = events
    .map(
      (event) => `<article class="card stack">
        <h3>${escapeHtml(event.title)}</h3>
        <p><strong>Date:</strong> ${escapeHtml(formatDate(event.date))}</p>
        <p>${escapeHtml(event.description || '')}</p>
      </article>`
    )
    .join('');
}
