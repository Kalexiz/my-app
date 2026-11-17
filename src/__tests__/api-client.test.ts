import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { getMusicData } from '../services/api-client';

const originalFetch = global.fetch;
afterEach(() => { global.fetch = originalFetch; });

describe('API de música', () => {
  it('usa HTTPS y acepta artistas sin mbid o sin imágenes', async () => {
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({ topartists: { artist: [
        { mbid: '', name: 'Artista', image: [] },
        { mbid: 'id-2', name: 'Otro', image: [{ '#text': 'small' }, { '#text': 'large' }] },
      ] } }),
    } as Response);
    await expect(getMusicData()).resolves.toEqual([
      { id: 'Artista', name: 'Artista', image: '' },
      { id: 'id-2', name: 'Otro', image: 'large' },
    ]);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/^https:\/\//), expect.any(Object));
  });

  it('rechaza errores HTTP', async () => {
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({ ok: false } as Response);
    await expect(getMusicData()).rejects.toThrow('No se pudo cargar la música');
  });

  it('rechaza respuestas de error de la API', async () => {
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
      ok: true, json: async () => ({ error: 6, message: 'Invalid parameters' }),
    } as Response);
    await expect(getMusicData()).rejects.toThrow('La respuesta de música no es válida');
  });
});
