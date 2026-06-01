const CACHE_PREFIX = 'sac-cache:';
const CACHE_TTL_MS = 10 * 60 * 1000;

const localUrl = (fileName) => new URL(`../data/${fileName}`, import.meta.url).toString();

function cacheKey(key) {
  return `${CACHE_PREFIX}${key}`;
}

function readCache(key) {
  try {
    const cached = localStorage.getItem(cacheKey(key));
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.cachedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(
      cacheKey(key),
      JSON.stringify({
        cachedAt: Date.now(),
        data
      })
    );
  } catch {
    // localStorage can fail in private modes; silently continue
  }
}

export async function fetchJsonWithCache(key, url, fallbackUrl) {
  const cached = readCache(key);
  if (cached) return cached;

  const sources = [url, fallbackUrl].filter(Boolean);
  let lastError = null;

  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      writeCache(key, data);
      return data;
    } catch (error) {
      lastError = error;
    }
  }

  const staleCache = (() => {
    try {
      const stale = localStorage.getItem(cacheKey(key));
      return stale ? JSON.parse(stale).data : null;
    } catch {
      return null;
    }
  })();

  if (staleCache) return staleCache;
  throw lastError ?? new Error(`Unable to fetch ${key}`);
}

export async function loadConfig() {
  const localConfigUrl = localUrl('config.json');
  return fetchJsonWithCache('config', localConfigUrl, null);
}

export async function loadDataset(config, key, fileName) {
  const remoteUrl = config?.dataSources?.[key];
  return fetchJsonWithCache(key, remoteUrl, localUrl(fileName));
}
