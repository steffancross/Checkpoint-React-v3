import React from 'react';
import SinglePet from './SinglePet';

const cody = {
  id: 2,
  name: 'Cody',
  description: 'Adorable pug who loves to hug',
  species: 'dog',
};

// PetList only renders one SinglePet. We'd like it to render a list of pets,
// passed in as props.pets. Don't forget to add a unique key to each one!

const PetList = () => {
  return (
    <>
      <div className="pet-list">
        <SinglePet pet={cody} />
      </div>
    </>
  );
};

export default PetList;
