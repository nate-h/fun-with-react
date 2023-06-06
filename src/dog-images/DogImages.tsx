import React, { ChangeEventHandler, useEffect, useState } from 'react';
import clsx from 'clsx';
import Card from '../Card';
import './DogImages.scss';

// Use virtualized list?
// Show random pic by default

export default function DogImages() {
  // https://dog.ceo/api/breeds/image/random Fetch!

  const [breeds, setBreeds] = useState<string[]>([]);
  const [breed, setBreed] = useState<string>('');
  const [breedLinks, setBreedLinks] = useState<string[]>([]);
  const [picIndex, setPicIndex] = useState<number>(0);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((j) => {
        console.log('fetched');
        setBreeds(Object.keys(j.message));
      });
  }, []);

  const breedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = event.target.value;
    setBreed(breed);
    setPicIndex(0);

    if (breed === 'Random') {
      console.log('Random');
    } else {
      fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((j) => {
          setBreedLinks(j.message);
        });
    }
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
        <select onChange={breedChange}>
          <optgroup>
            <option>Random</option>
          </optgroup>
          <optgroup label='_________'>
            {breeds.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </optgroup>
        </select>
        {breed ? (
          <>
            <br />
            <br />
            {picIndex + 1} / {breedLinks.length}
            <br />
            <br />
            <button onClick={() => setPicIndex(Math.max(0, picIndex - 1))}>Prev</button>
            <button onClick={() => setPicIndex(Math.min(breedLinks.length - 1, picIndex + 1))}>
              Next
            </button>
            <br />
            <br />
            <img src={breedLinks[picIndex]} alt={`Pic of ${breed}`} />
          </>
        ) : null}
      </section>
    </Card>
  );
}
