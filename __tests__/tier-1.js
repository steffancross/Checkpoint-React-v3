import { render, screen } from '@testing-library/react';
import SinglePet from '../src/components/SinglePet';
import React from 'react';
import userEvent from '@testing-library/user-event';

/**
 * Tier 1 is about
 * - rendering data from props
 * - handling a click event from a button
 * - setting state (boolean)
 * - rendering text conditionally from state
 * - changing css class based on state
 */

/** Instructions:
 * Edit the SinglePet component in src/components/SinglePet.js
 * It will be passed a pet object as props.pet
 * A pet object looks like this:
 * {
 *   id: 1,
 *   name: "Some Pet Name",
 *   description: "Describing the pet",
 *   species: either "dog" or "cat"
 * }
 *
 * By default, every pet is not adopted. NOTE: The pet provided on props
 * DOES NOT have an adopted status. You are expected to handle that data as
 * component's state.
 *
 * Add a button that, when clicked, toggles the pet's adoption status. The
 * component should render "Available" when adopted is false, and "Adopted!"
 * when adopted is true.
 *
 * When the pet is adopted, the containing div should have
 * the classes single-pet and adopted. When the pet is not adopted, it should
 * only have the class single-pet.
 */

describe('Tier 1 Tests:', () => {
  const rigatoni = {
    id: 1,
    name: 'Rigatoni',
    description: 'A flaming hot cheetoh in feline form',
    species: 'cat',
  };

  const cody = {
    id: 2,
    name: 'Cody',
    description: 'Adorable pug who loves to hug',
    species: 'dog',
  };

  const user = userEvent.setup();

  test("renders a pet's name, description, and species passed in as props", () => {
    render(<SinglePet pet={rigatoni} />);
    expect(screen.queryByText(/Rigatoni/i)).toBeTruthy();
    expect(
      screen.queryByText(/A flaming hot cheetoh in feline form/i)
    ).toBeTruthy();
    expect(screen.queryByText(/cat/i)).toBeTruthy();
  });

  test('renders different name, description, and species if passed different props', () => {
    render(<SinglePet pet={cody} />);
    expect(screen.queryByText(/Cody/i)).toBeTruthy();
    expect(screen.queryByText(/Adorable pug who loves to hug/i)).toBeTruthy();
    expect(screen.queryByText(/dog/i)).toBeTruthy();
  });

  test("renders a 'Toggle Status' button'", () => {
    render(<SinglePet pet={cody} />);
    const button = screen.queryByRole('button', { name: 'Toggle Status' });
    expect(button).toBeTruthy();
  });

  test("the 'Toggle Status' button toggles 'Available' to 'Adopted!'", async () => {
    render(<SinglePet pet={rigatoni} />);
    const toggleAdoptedButton = screen.queryByText(/Toggle Status/i);

    // The component should render "Available for adoption" and not "Adopted!"
    expect(screen.queryByText(/Available/i)).toBeTruthy();
    expect(screen.queryByText(/Adopted/i)).not.toBeTruthy();

    // Click the button!
    await user.click(toggleAdoptedButton);

    // NOW the component should render "Adopted!"
    expect(screen.queryByText(/Adopted/i)).toBeTruthy();
    expect(screen.queryByText(/Available/i)).not.toBeTruthy();
  });

  test("the 'Toggle Status' button toggles 'Adopted!' to 'Available'", async () => {
    const user = userEvent.setup();
    render(<SinglePet pet={rigatoni} />);
    const toggleAdoptedButton = screen.queryByText(/Toggle Status/i);

    // Click the button!
    await user.click(toggleAdoptedButton);

    // The component should render "Adopted!"
    expect(screen.queryByText(/Adopted/i)).toBeTruthy();
    expect(screen.queryByText(/Available/i)).not.toBeTruthy();

    // Click the button again!
    await user.click(toggleAdoptedButton);

    // The component should render "Available for adoption" and not "Adopted!"
    expect(screen.queryByText(/Available/i)).toBeTruthy();
    expect(screen.queryByText(/Adopted/i)).not.toBeTruthy();
  });

  test("the 'Toggle Status' button toggles the 'adopted' css class", async () => {
    const { container } = render(<SinglePet pet={rigatoni} />);
    const toggleAdoptedButton = screen.queryByText(/Toggle Status/i);

    // At first, the container div should not have the adopted class applied
    expect(container.querySelector('.single-pet')).toBeTruthy();
    expect(container.querySelector('.adopted')).toBeFalsy();

    // Click the button once
    await user.click(toggleAdoptedButton);

    // // We should see both single-pet AND adopted class applied now

    expect(container.querySelector('.single-pet')).toBeTruthy();
    expect(container.querySelector('.adopted')).toBeTruthy();

    // // Click the button a second time
    await user.click(toggleAdoptedButton);

    // // No adopted class anymore
    expect(container.querySelector('.single-pet')).toBeTruthy();
    expect(container.querySelector('.adopted')).toBeFalsy();
  });
});
