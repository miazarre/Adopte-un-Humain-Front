import './styles.scss';
import data from '../../data/fake_animals.json';

import AnimalDetail from './AnimalDetail';
import AnimalTable from './AnimalTable';

import { useEffect, useState } from 'react';
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

    const animal = animalSelected.map((animal) => (
        <AnimalDetail
        key={animal.id}
        animal={animal}
        />
    ))

    const animalTable = animalSelected.map((animal) => (
        <AnimalTable
        key={animal.id}
        animal={animal}
        />
    ))

    return(
        <div className='adoptionsdetail'>
            <div className='adoptionsdetail__container'>
                <div className='adoptionsdetail__container__detail'>
                    {animal}
                </div>
                <div className='adoptionsdetail__container__detail-table'>
                    {animalTable}
                </div> 
            </div>
        </div>
    )
}

export default AdoptionsDetail ;