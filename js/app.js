import { renderClubDetail, renderClubDirectory } from './club-renderer.js';
import { renderEvents } from './event-renderer.js';
import { loadConfig, loadDataset } from './fetcher.js';
import { renderPositions } from './position-renderer.js';
import { getRouteContext } from './router.js';
import { initTheme } from './theme.js';

function renderBodies(bodies, selector = '#sac-bodies-directory') {
  const target = document.querySelector(selector);
  if (!target) return;

  target.innerHTML = bodies
    .map(
      (body) => `<article class="card stack">
        <h3>${body.name}</h3>
        <p>${body.description}</p>
      </article>`
    )
    .join('');
}

async function initPage() {
  initTheme();

  const route = getRouteContext();
  const config = await loadConfig();

  if (route.page === 'home' || route.page === 'events') {
    const events = await loadDataset(config, 'events', 'events.json');
    renderEvents(events.filter((event) => event.featured || route.page === 'events'));
  }

  if (route.page === 'clubs') {
    const clubs = await loadDataset(config, 'clubs', 'clubs.json');
    renderClubDirectory(clubs);
  }

  if (route.page === 'club-detail') {
    const clubs = await loadDataset(config, 'clubs', 'clubs.json');
    const club = clubs.find((entry) => entry.id === route.clubId) ?? clubs[0];
    renderClubDetail(club);
  }

  if (route.page === 'positions') {
    const positions = await loadDataset(config, 'positions', 'positions.json');
    renderPositions(positions);
  }

  if (route.page === 'sac-bodies' || route.page === 'home') {
    const bodies = await loadDataset(config, 'sacBodies', 'sac-bodies.json');
    renderBodies(bodies, route.page === 'home' ? '#sac-bodies-list' : '#sac-bodies-directory');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPage().catch((error) => {
    console.error('SAC app initialization failed', error);
  });
});
