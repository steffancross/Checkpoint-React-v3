import React, { useState, useEffect } from 'react';
import PetList from './PetList';
import axios from 'axios';

// We'll render these sample pets for now. Later, we'll instead fetch the list
// of pets from the server! We won't need samplePets after that.
import samplePets from '../petdata';

const Root = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/pets');
        setPets(data);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>{loading ? <p>loading</p> : ''}</div>
      <div>{error ? <p>error loading</p> : ''}</div>
      <h1>Adoption Center</h1>
      <PetList pets={pets} />
    </>
  );
};

export default Root;
