import './styles.scss'
import data from '../../data/fake_animals.json'
import AnimalDetail from './AnimalDetail'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import React from 'react';

const AdoptionsDetail = () => {
    const idAnimal = useParams();
    const [animals, setAnimals] = useState([])
    console.log(idAnimal);
    const animalSelected= animals.filter(x => x.id === 2);
    console.log(animalSelected);

    useEffect(() => {
        setAnimals(data)
        }, 
      [animals]);

    return(
        <div className='trombinoscope'>
            <div className='adoptionsdetail__container'>
            {
            animalSelected.map((animal) => (
                <AnimalDetail
                key={animal.id}
                animal={animal}
                />
            ))
            }
            </div>
        </div>
    )
}

export default AdoptionsDetail ;