const THEME_STORAGE_KEY = 'sac-theme';

export function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function initTheme() {
  const toggleButton = document.querySelector('[data-theme-toggle]');
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (!toggleButton) return;

  toggleButton.setAttribute('aria-pressed', String(initialTheme === 'dark'));
  toggleButton.textContent = initialTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  toggleButton.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    toggleButton.setAttribute('aria-pressed', String(next === 'dark'));
    toggleButton.textContent = next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  });
}
