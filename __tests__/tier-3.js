import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { getPets } from '../petdata';
import { render, act, screen } from '@testing-library/react';
import Root from '../src/components/Root';
import React from 'react';

describe('Tier 3: Root component', () => {
  afterEach(() => mockAxios.reset());

  const mockAxios = new MockAdapter(axios);

  test('fetches data from /api/pets once after Root first mounts', async () => {
    mockAxios.onGet('/api/pets').reply(200, getPets());
    await act(async () => {
      render(<Root />);
    });
    expect(mockAxios.history.get).toEqual(
      expect.arrayContaining([expect.objectContaining({ url: '/api/pets' })])
    );
  });

  test('renders PetList with data retrieved from /api/pets', async () => {
    const samplePets = [
      {
        id: 1,
        name: 'Rigatoni',
        description: 'A flaming hot cheetoh in feline form',
        species: 'cat',
      },
      {
        id: 2,
        name: 'Cody',
        description: 'Adorable pug who loves to hug',
        species: 'dog',
      },
    ];

    mockAxios.onGet('/api/pets').reply(200, samplePets);
    await act(() => {
      render(<Root />);
    });
    expect(screen.queryByText('Rigatoni')).toBeTruthy();
    expect(screen.queryByText('Cody')).toBeTruthy();
    expect(screen.queryByText('Frankie')).toBeFalsy();
    expect(screen.queryByText('Anabelle')).toBeFalsy();
  });

  test('displays loading message while waiting for the data', async () => {
    const samplePets = [
      {
        id: 1,
        name: 'Frankie',
        description: 'The snuggliest kitty',
        species: 'cat',
      },
      {
        id: 2,
        name: 'Anabelle',
        description: 'Might eat your couch',
        species: 'dog',
      },
    ];

    mockAxios.onGet('/api/pets').reply(200, samplePets);

    const { rerender } = render(<Root />);
    expect(screen.queryByText(/Loading/i)).toBeTruthy();

    await act(() => {
      rerender(<Root />);
    });

    expect(screen.queryByText('Frankie')).toBeTruthy();
  });

  test('displays error message if the server responds with status code 500', async () => {
    mockAxios.onGet('/api/pets').reply(500);

    await act(() => {
      render(<Root />);
    });

    expect(screen.queryByText(/Error/i)).toBeTruthy();
    expect(screen.queryByText('Frankie')).toBeFalsy();
  });
});
