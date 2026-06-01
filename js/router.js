export function getRouteContext() {
  const page = document.body.dataset.page;
  const path = window.location.pathname;

  if (page === 'club-detail') {
    const id = new URLSearchParams(window.location.search).get('id') || null;
    return { page, clubId: id };
  }

  if (page) return { page };

  if (path.includes('/pages/clubs/')) return { page: 'clubs' };
  if (path.includes('/pages/positions/')) return { page: 'positions' };
  if (path.includes('/pages/sac-bodies/')) return { page: 'sac-bodies' };

  return { page: 'home' };
}
