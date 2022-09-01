import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import DeletePet from '../src/components/DeletePet';
import userEvent from '@testing-library/user-event/';
import { spy } from 'sinon';
import SinglePet from '../src/components/SinglePet';
import Root from '../src/components/Root';

describe('EXTRA CREDIT: Tier 4: DeletePet component', () => {
  const user = userEvent.setup();
  const mockAxios = new MockAdapter(axios);
  afterEach(() => mockAxios.reset());

  test("renders a 'Delete' button with delete-pet class", () => {
    const { container } = render(
      <DeletePet petId={1} handleDelete={() => {}} />
    );
    expect(container.querySelector('button.delete-pet')).toBeTruthy();
  });

  test('sends a delete request to /api/pets/:petId when user clicks the button', async () => {
    mockAxios.onDelete('/api/pets/1').reply(204);
    render(<DeletePet petId={1} handleDelete={() => {}} />);

    const deletePetButton = screen.queryByText(/Delete/i);

    await user.click(deletePetButton);

    expect(mockAxios.history.delete).toEqual(
      expect.arrayContaining([expect.objectContaining({ url: '/api/pets/1' })])
    );
  });

  test('calls props.handleDelete if the delete request is successful', async () => {
    mockAxios.onDelete('/api/pets/2').reply(204);
    const handleDeleteSpy = spy();
    render(<DeletePet petId={2} handleDelete={handleDeleteSpy} />);

    const deletePetButton = screen.queryByText(/Delete/i);

    await user.click(deletePetButton);

    expect(mockAxios.history.delete).toEqual(
      expect.arrayContaining([expect.objectContaining({ url: '/api/pets/2' })])
    );
    expect(handleDeleteSpy.callCount).toBe(1);
  });

  it('does not call props.handleDelete if the delete request fails', async () => {
    mockAxios.onDelete('/api/pets/2').reply(500);
    const handleDeleteSpy = spy();
    render(<DeletePet petId={2} handleDelete={handleDeleteSpy} />);

    const deletePetButton = screen.queryByText(/Delete/i);

    await user.click(deletePetButton);

    expect(mockAxios.history.delete).toEqual(
      expect.arrayContaining([expect.objectContaining({ url: '/api/pets/2' })])
    );
    expect(handleDeleteSpy.callCount).toBe(0);
  });

  /** Integration Instructions:
   * Edit the SinglePet, Root, and PetList components
   * SinglePet should render DeletePet (remember to pass the correct petId)
   * Add a handleDelete function to Root
   * Root's handleDelete function should do one of two things -- you decide:
   *   1. Re-fetch the data from the server (e.g. GET /api/pets)
   *   2. Remove the provided pet from state (without making a network request)
   * Pass handleDelete to DeletePet (through PetList and each SinglePet)
   *
   * If everything works correctly, you should be able to click "Delete" and the
   * pet will disappear from the list.
   */

  describe('Integration', () => {
    test('SinglePet renders DeletePet', async () => {
      const anabelle = {
        id: 4,
        name: 'Anabelle',
        description: 'Might eat your couch',
        species: 'dog',
      };
      render(<SinglePet pet={anabelle} />);

      expect(screen.queryByText(/Delete/i)).toBeTruthy();
    });
  });

  test('DeletePet removes the deleted pet when clicked', async () => {
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
    /**
     * The mockAxios setup below is only relevant if you've taken the
     * "refetch after delete" approach. The first time you make a GET request
     * to /api/pets, you'll get both sample pets (above). If you make a DELETE
     * request to /api/pets/1, it'll respond with 204 (success!). Then, on a
     * second GET request, you'll get only the second pet.
     */
    mockAxios.resetHandlers();
    mockAxios
      .onGet('/api/pets')
      .replyOnce(200, samplePets)
      .onDelete('/api/pets/1')
      .reply(204)
      .onGet('/api/pets')
      .replyOnce(200, samplePets.slice(1));

    await act(() => {
      render(<Root />);
    });

    expect(screen.queryByText('Rigatoni')).toBeTruthy();
    expect(screen.queryByText('Cody')).toBeTruthy();

    const deletePetButton = screen.queryAllByText(/Delete/i)[0];

    await user.click(deletePetButton);

    expect(mockAxios.history.delete.length).toBe(1);
    expect(screen.queryByText('Rigatoni')).toBeFalsy();
    expect(screen.queryByText('Cody')).toBeTruthy();
  });
});
