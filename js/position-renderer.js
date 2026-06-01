import { escapeHtml } from './utils.js';

export function renderPositions(groups, selector = '#positions-directory') {
  const target = document.querySelector(selector);
  if (!target) return;

  target.innerHTML = groups
    .map(
      (group) => `<section class="card stack">
        <h2>${escapeHtml(group.body)}</h2>
        <div class="grid grid-cards">
          ${(group.positions || [])
            .map(
              (position) => `<article class="card">
                <h3>${escapeHtml(position.title)}</h3>
                <p>${escapeHtml(position.name)}</p>
                <p><a href="mailto:${escapeHtml(position.email || '')}">${escapeHtml(position.email || 'No email listed')}</a></p>
              </article>`
            )
            .join('')}
        </div>
      </section>`
    )
    .join('');
}
