import { escapeHtml, isValidEmail } from './utils.js';

export function renderPositions(groups, selector = '#positions-directory') {
  const target = document.querySelector(selector);
  if (!target) return;

  target.innerHTML = groups
    .map(
      (group) => `<section class="card stack">
        <h2>${escapeHtml(group.body)}</h2>
        <div class="grid grid-cards">
          ${(group.positions || [])
            .map((position) => {
              const email = typeof position.email === 'string' ? position.email.trim() : '';
              const safeEmail = isValidEmail(email) ? email : '';
              const contactMarkup = safeEmail
                ? `<a href="mailto:${safeEmail}">${escapeHtml(safeEmail)}</a>`
                : 'No email listed';

              return `<article class="card">
                <h3>${escapeHtml(position.title)}</h3>
                <p>${escapeHtml(position.name)}</p>
                <p>${contactMarkup}</p>
              </article>`;
            })
            .join('')}
        </div>
      </section>`
    )
    .join('');
}
