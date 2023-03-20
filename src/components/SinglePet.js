import React, { useState } from 'react';

const SinglePet = (props) => {
  const [status, setStatus] = useState(props.pet.adopted || false);

  function changeStatus() {
    setStatus(!status);
  }

  return (
    <>
      <div className={`single-pet ${status ? 'adopted' : ''}`}>
        <p>{props.pet.name}</p>
        <p>{props.pet.description}</p>
        <p>{props.pet.species}</p>
        <p>{status ? 'Adopted' : 'Available'}</p>
        <button onClick={changeStatus}>Toggle Status</button>
      </div>
    </>
  );
};

export default SinglePet;
