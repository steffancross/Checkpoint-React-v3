import { render, screen } from '@testing-library/react';
import PetList from '../src/components/PetList';
import React from 'react';
import userEvent from '@testing-library/user-event';

/**
 * Tier 2 is about
 * - rendering a list
 * - handling a change event from a select
 * - setting state (string)
 * - filter a list of rendered components
 */

/** Instructions:
 * Edit the PetList component in src/components/PetList.js
 * It will be passed an array of pet objects as props.pets
 * Pass each pet to a SinglePet component as a prop called `pet`
 * Create a dropdown that allows the user to select between three options:
 * - all (the default option)
 * - cats
 * - dogs
 * When the user selects a new option, set state accordingly
 * If the selected option is "all", render all the pets
 * If the selected option is "cats", render only the cats
 * If the selected option is "dogs", render only the dogs
 */

describe('Tier 2: PetList component', () => {
  const pets = [
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
    {
      id: 3,
      name: 'Frankie',
      description: 'The snuggliest kitty',
      species: 'cat',
    },
    {
      id: 4,
      name: 'Anabelle',
      description: 'Might eat your couch',
      species: 'dog',
    },
  ];

  const user = userEvent.setup();

  test('renders a list of SinglePets', () => {
    render(<PetList pets={pets} />);
    expect(screen.queryByText('Rigatoni')).toBeTruthy();
    expect(screen.queryByText('Cody')).toBeTruthy();
    expect(screen.queryByText('Frankie')).toBeTruthy();
    expect(screen.queryByText('Anabelle')).toBeTruthy();
  });

  test('renders a select dropdown with three options: all, cats, dogs', () => {
    const { container } = render(<PetList pets={pets} />);
    const options = container.querySelectorAll('option');
    expect(options.length).toBe(3);

    const optionValues = [...options].map((option) => option.value);

    expect(optionValues).toContain('all', 'cats', 'dogs');
  });

  test("when the filter is set to 'cats', only render SinglePets with cats", async () => {
    const { container } = render(<PetList pets={pets} />);

    const select = container.querySelector('select');

    // simulate user selecting filter by "cats"
    await user.selectOptions(select, 'cats');

    expect(screen.queryByText('Rigatoni')).toBeTruthy();
    expect(screen.queryByText('Frankie')).toBeTruthy();
    expect(screen.queryByText('Cody')).toBeFalsy();
    expect(screen.queryByText('Anabelle')).toBeFalsy();
  });

  test("when the filter is set to 'dogs', only render SinglePets with dogs", async () => {
    const { container } = render(<PetList pets={pets} />);

    const select = container.querySelector('select');

    // simulate user selecting filter by "dogs"
    await user.selectOptions(select, 'dogs');

    expect(screen.queryByText('Cody')).toBeTruthy();
    expect(screen.queryByText('Anabelle')).toBeTruthy();
    expect(screen.queryByText('Frankie')).toBeFalsy();
    expect(screen.queryByText('Rigatoni')).toBeFalsy();
  });
});
