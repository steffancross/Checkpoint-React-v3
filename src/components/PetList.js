import React, { useState } from 'react';
import SinglePet from './SinglePet';

const cody = {
  id: 2,
  name: 'Cody',
  description: 'Adorable pug who loves to hug',
  species: 'dog',
};

// PetList only renders one SinglePet. We'd like it to render a list of pets,
// passed in as props.pets. Don't forget to add a unique key to each one!

const PetList = (props) => {
  const [species, setSpecies] = useState('all');

  const selectPets =
    species === 'all'
      ? props.pets
      : props.pets.filter((pet) => pet.species === species);

  function selectChange(event) {
    setSpecies(event.target.value);
  }

  return (
    <>
      <select defaultValue={species} onChange={selectChange}>
        <option value="all">all</option>
        <option value="dog">dogs</option>
        <option value="cat">cats</option>
      </select>
      <div className="pet-list">
        {selectPets.map((pet) => (
          <SinglePet key={pet.id} pet={pet} />
        ))}
      </div>
    </>
  );
};

export default PetList;
