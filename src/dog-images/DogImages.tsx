import React, { useEffect, useState } from 'react';
import Card from '../Card';
import './DogImages.scss';
import { myFetch } from '../utils';

export default function DogImages() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [breed, setBreed] = useState<string>('collie');
  const [breedLinks, setBreedLinks] = useState<string[]>([]);
  const [picIndex, setPicIndex] = useState<number>(0);
  const imageURL = breedLinks ? breedLinks[picIndex] : null;

  useEffect(() => {
    const url = 'https://dog.ceo/api/breeds/list/all';
    myFetch(url, (msg: Object) => setBreeds(Object.keys(msg)));
    myFetch(`https://dog.ceo/api/breed/${breed}/images`, setBreedLinks);
  }, []);

  const breedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = event.target.value;
    setBreed(breed);
    setPicIndex(0);
    setBreedLinks([]);
    myFetch(`https://dog.ceo/api/breed/${breed}/images`, setBreedLinks);
  };

  return (
    <Card header='DogImages'>
      <section className='DogImages'>
        <p>Pick a dog breed to see a pic.</p>
        <p>
          Credit to <a href='https://dog.ceo/dog-api/'>the dog api</a> for the backend.
        </p>
        <p className='todo'>use index-db</p>
        <p className='todo'>handle throw better</p>
        <br />
        Select a breed:
        {breeds ? (
          <select onChange={breedChange} value={breed}>
            {breeds.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        ) : null}
        {breed ? (
          <>
            <br />
            <br />
            {picIndex + 1} / {breedLinks.length}
            &nbsp;
            <button onClick={() => setPicIndex(Math.max(0, picIndex - 1))}>Prev</button>
            <button onClick={() => setPicIndex(Math.min(breedLinks.length - 1, picIndex + 1))}>
              Next
            </button>
            <br />
            <br />
            <br />
            <br />
          </>
        ) : null}
        {imageURL ? <img src={imageURL} alt={`Random pic: ${imageURL}`} /> : null}
      </section>
    </Card>
  );
}
