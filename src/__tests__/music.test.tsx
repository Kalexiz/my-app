import React from 'react';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import Home from '../app/home';
import Detail from '../app/detail';
import { getMusicData } from '../services/api-client';

jest.mock('../services/api-client', () => ({ getMusicData: jest.fn() }));
jest.mock('expo-router', () => {
  const mockRouter = { push: jest.fn() };
  return {
    router: mockRouter,
    useRouter: () => mockRouter,
    useLocalSearchParams: () => ({ id: 'artist-1', name: 'Artista de prueba', image: 'https://example.com/artist.jpg' }),
  };
});

const loadMusic = jest.mocked(getMusicData);
const artists = [{ id: 'artist-1', name: 'Artista de prueba', image: '' }];

beforeEach(() => { jest.clearAllMocks(); });
afterEach(() => { jest.restoreAllMocks(); });

describe('Música', () => {
  it('carga artistas y abre su detalle', async () => {
    loadMusic.mockResolvedValueOnce(artists);
    const screen = render(<Home />);
    expect(screen.getByLabelText('Cargando música')).toBeTruthy();
    await waitFor(() => expect(screen.getByText('Artista de prueba')).toBeTruthy());
    fireEvent.press(screen.getByTestId('artist-box-Artista de prueba'));
    expect(router.push).toHaveBeenCalledWith({ pathname: '/detail', params: artists[0] });
  });

  it('muestra el error de red y permite reintentar', async () => {
    loadMusic.mockRejectedValueOnce(new Error('Sin conexión')).mockResolvedValueOnce(artists);
    const screen = render(<Home />);
    await waitFor(() => expect(screen.getByText('No se pudo cargar la música. Revisa tu conexión.')).toBeTruthy());
    fireEvent.press(screen.getByRole('button', { name: 'Reintentar' }));
    await waitFor(() => expect(screen.getByText('Artista de prueba')).toBeTruthy());
    expect(loadMusic).toHaveBeenCalledTimes(2);
  });

  it('muestra un mensaje cuando no hay artistas', async () => {
    loadMusic.mockResolvedValueOnce([]);
    const screen = render(<Home />);
    await waitFor(() => expect(screen.getByText('No hay artistas disponibles')).toBeTruthy());
  });

  it('muestra el nombre y la imagen recibidos en la pantalla de detalle', () => {
    const screen = render(<Detail />);
    expect(screen.getByText('Artista de prueba')).toBeTruthy();
    expect(screen.getByTestId('artist-image').props.source).toEqual({ uri: 'https://example.com/artist.jpg' });
  });
});
