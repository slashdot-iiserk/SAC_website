import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchJsonWithCache, loadConfig } from '../../js/fetcher.js';

const key = 'events';

describe('Phase 1 fetcher', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches JSON and caches it', async () => {
    const payload = [{ id: 'e1' }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload)
    });

    const first = await fetchJsonWithCache(key, 'https://example.org/events.json');
    const second = await fetchJsonWithCache(key, 'https://example.org/events.json');

    expect(first).toEqual(payload);
    expect(second).toEqual(payload);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('falls back to stale cache when network fails', async () => {
    localStorage.setItem(
      'sac-cache:events',
      JSON.stringify({ cachedAt: Date.now() - 999999999, data: [{ id: 'cached-event' }] })
    );

    global.fetch = vi.fn().mockRejectedValue(new Error('network down'));

    const result = await fetchJsonWithCache(key, 'https://example.org/events.json');
    expect(result).toEqual([{ id: 'cached-event' }]);
  });

  it('loadConfig resolves configuration payload', async () => {
    const configPayload = { schemaVersion: '1.0.0', dataSources: {} };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(configPayload)
    });

    const config = await loadConfig();
    expect(config).toEqual(configPayload);
  });
});
