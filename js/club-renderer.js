import { escapeHtml } from './utils.js';

export function renderClubDirectory(clubs, selector = '#club-directory') {
  const target = document.querySelector(selector);
  if (!target) return;

  target.innerHTML = clubs
    .map(
      (club) => `<article class="card">
        <h3>${escapeHtml(club.name)}</h3>
        <p>${escapeHtml(club.description || '')}</p>
        <p><strong>Category:</strong> ${escapeHtml(club.category || 'General')}</p>
        <a class="button button-secondary" href="[club-id].html?id=${encodeURIComponent(club.id)}">View details</a>
      </article>`
    )
    .join('');
}

export function renderClubDetail(club, selector = '#club-detail') {
  const target = document.querySelector(selector);
  if (!target) return;

  if (!club) {
    target.innerHTML = '<p class="card">Club not found in current dataset.</p>';
    return;
  }

  target.innerHTML = `<article class="card stack">
    <h1>${escapeHtml(club.name)}</h1>
    <p>${escapeHtml(club.description || '')}</p>
    <section>
      <h2>Manifesto</h2>
      <p>${escapeHtml(club.manifesto || 'Details will be updated soon.')}</p>
    </section>
    <section>
      <h2>Office Bearer</h2>
      <p>${escapeHtml(club.officeBearer?.name || 'TBA')} — ${escapeHtml(club.officeBearer?.role || 'Role pending')}</p>
    </section>
  </article>`;
}
