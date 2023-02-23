import './styles.scss'
import data from '../../data/fake_animals.json'
import AnimalCard from './AnimalCard'
import { useEffect, useState } from 'react'
import React from 'react';

const Trombinoscope = () => {

    const [animals, setAnimals] = useState([])

    useEffect(() => {
        setAnimals(data)
        }, 
      [animals]);

    return(
        <div className='trombinoscope'>
            <div className='animal-card__container'>
            {
            animals.map((animal) => (
                <AnimalCard
                key={animal.id}
                animal={animal}
                />
            ))
            }
            </div>
        </div>
    )
}

export default Trombinoscope ;