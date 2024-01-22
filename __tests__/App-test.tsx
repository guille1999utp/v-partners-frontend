import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';


describe('Testing react aplication', () => {
  test('renderiza la pagina principal', async () => {
    render(<App />);
  });
});