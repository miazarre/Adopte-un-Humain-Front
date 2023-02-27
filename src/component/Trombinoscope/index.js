import './styles.scss'
// import data from '../../data/fake_animals.json'
import AnimalCard from './AnimalCard'
import { useEffect, useState } from 'react'
import React from 'react';
import axios from 'axios';
import {BsSuitHeart} from 'react-icons/bs'

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const Trombinoscope = ({isLogged}) => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
          setFavorites(storedFavorites);
        }
      }, []);

     const toggleFavorite = (animal) => {
        if (favorites.includes(animal)) {
        const newFavorites = favorites.filter((fav) => fav !== animal);
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        } else {
        const newFavorites = [...favorites, animal];
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }
    };
    
    const [animals, setAnimals] = useState([])

    const getAnimals = async () => {
        const response = await axios.get(`${baseUrl}/animals`) ;
        setAnimals(response.data)
    }

    useEffect(() => {
        getAnimals()
        }, 
      []);

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
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
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