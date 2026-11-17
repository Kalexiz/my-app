import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import Register from '../app/register';

jest.mock('expo-router', () => ({
  router: { replace: jest.fn(), back: jest.fn() },
}));

const originalAlert = global.alert;

beforeEach(() => {
  jest.clearAllMocks();
  global.alert = jest.fn<typeof alert>();
});

afterEach(() => {
  global.alert = originalAlert;
});

describe('Register', () => {
  it('muestra los campos y oculta las contraseñas', () => {
    const { getByPlaceholderText, getByRole } = render(<Register />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Nombre de usuario')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña').props.secureTextEntry).toBe(true);
    expect(getByPlaceholderText('Confirmar contraseña').props.secureTextEntry).toBe(true);
    expect(getByRole('button', { name: 'Registrarse' })).toBeTruthy();
    expect(getByRole('button', { name: 'Atrás' })).toBeTruthy();
  });

  it.each([
    ['', 'keval', 'Abcdefg!', 'Abcdefg!', 'Los campos no pueden estar vacíos'],
    ['alumno@correo.com', '', 'Abcdefg!', 'Abcdefg!', 'Los campos no pueden estar vacíos'],
    ['alumno@correo.com', 'keval', '', 'Abcdefg!', 'Los campos no pueden estar vacíos'],
    ['alumno@correo.com', 'keval', 'Abcdefg!', '', 'Los campos no pueden estar vacíos'],
    ['correo', 'keval', 'Abcdefg!', 'Abcdefg!', 'El correo electrónico no es válido'],
    ['alumno@correo.com', 'keval', 'Abc!', 'Abc!', 'La contraseña debe tener al menos 8 caracteres'],
    ['alumno@correo.com', 'keval', 'abcdefg!', 'abcdefg!', 'La contraseña debe tener mayúsculas y minúsculas'],
    ['alumno@correo.com', 'keval', 'ABCDEFG!', 'ABCDEFG!', 'La contraseña debe tener mayúsculas y minúsculas'],
    ['alumno@correo.com', 'keval', 'Abcdefgh', 'Abcdefgh', 'La contraseña debe tener al menos un carácter especial'],
    ['alumno@correo.com', 'keval', 'Abcdefg!', 'Abcdefg?', 'Las contraseñas deben coincidir'],
  ])('valida los datos del caso %#', (email, username, password, confirmPassword, message) => {
    const { getByPlaceholderText, getByRole } = render(<Register />);
    fireEvent.changeText(getByPlaceholderText('Email'), email);
    fireEvent.changeText(getByPlaceholderText('Nombre de usuario'), username);
    fireEvent.changeText(getByPlaceholderText('Contraseña'), password);
    fireEvent.changeText(getByPlaceholderText('Confirmar contraseña'), confirmPassword);
    fireEvent.press(getByRole('button', { name: 'Registrarse' }));
    expect(global.alert).toHaveBeenCalledWith(message);
    expect(router.replace).not.toHaveBeenCalled();
  });

  it('regresa al Index y limpia los campos con datos válidos', () => {
    const { getByPlaceholderText, getByRole } = render(<Register />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'alumno@correo.com');
    fireEvent.changeText(getByPlaceholderText('Nombre de usuario'), 'keval');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'Abcdefg!');
    fireEvent.changeText(getByPlaceholderText('Confirmar contraseña'), 'Abcdefg!');
    fireEvent.press(getByRole('button', { name: 'Registrarse' }));
    expect(router.replace).toHaveBeenCalledWith('/');
    expect(global.alert).not.toHaveBeenCalled();
    for (const placeholder of ['Email', 'Nombre de usuario', 'Contraseña', 'Confirmar contraseña']) {
      expect(getByPlaceholderText(placeholder).props.value).toBe('');
    }
  });

  it('regresa al presionar Atrás', () => {
    const { getByRole } = render(<Register />);
    fireEvent.press(getByRole('button', { name: 'Atrás' }));
    expect(router.back).toHaveBeenCalled();
  });
});
