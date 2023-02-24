import './styles.scss'
import data from '../../data/fake_animals.json'
import AnimalCard from './AnimalCard'
import { useEffect, useState } from 'react'
import React from 'react';

const Trombinoscope = ({isLogged}) => {

    const [animals, setAnimals] = useState([])

    useEffect(() => {
        setAnimals(data)
        }, 
      [animals]);

    return(
        <div className='trombinoscope'>
        {isLogged
            ? <>
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
            </>
            : <p className='profil-user__connexion-message'> Il faut te connecter ! </p>
                    
        }
        </div>
    )
}

export default Trombinoscope ;