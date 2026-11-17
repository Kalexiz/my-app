import * as React from 'react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import Index from '../app/index';

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Index (Login Screen)', () => {
  it('renders correctly', () => {
    const { getByRole, getByPlaceholderText } = render(<Index />);
    expect(getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('abre Register al presionar Registrarse', () => {
    const { getByRole } = render(<Index />);
    fireEvent.press(getByRole('button', { name: 'Registrarse' }));
    expect(router.push).toHaveBeenCalledWith('/register');
  });

  it('abre la música después de un login válido', () => {
    const originalAlert = global.alert;
    global.alert = jest.fn<typeof alert>();
    try {
      const { getByRole, getByPlaceholderText } = render(<Index />);
      fireEvent.changeText(getByPlaceholderText('Email'), 'alumno@correo.com');
      fireEvent.changeText(getByPlaceholderText('Contraseña'), 'Abcdefg!');
      fireEvent.press(getByRole('button', { name: 'Iniciar sesión' }));
      expect(router.push).toHaveBeenCalledWith('/home');
    } finally {
      global.alert = originalAlert;
    }
  });
});
