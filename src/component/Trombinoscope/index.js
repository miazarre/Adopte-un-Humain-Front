// Imports internes
import './styles.scss'
import AnimalCard from './AnimalCard'

// Imports externes
import { useEffect, useState } from 'react'
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Base Url
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);
const baseUrl=process.env.REACT_APP_BASE_URL


const Trombinoscope = ({isLogged, favorites, setFavorites, toggleFavorite, user}) => {

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
          setFavorites(storedFavorites);
        }
      }, []);
    
    const [animals, setAnimals] = useState([]);
    const [animalsId, setAnimalsId] = useState([]);

    const getAnimals = async () => {

        try{
            const response = await axios.get(`${baseUrl}/user/${user.id}/matching`,
            { headers: { Authorization: `Bearer ${newToken}` } }) ;

            setAnimalsId(response.data)

            response.data.forEach(async animal => {
                getOneAnimal(animal)
            });

        }catch(error){
            console.log(error)  
        }
        
    }

    const getOneAnimal = async (animal) => {
        try {
          const response = await axios.get(`${baseUrl}/animal/${animal.id}`, {
            headers: { Authorization: `Bearer ${newToken}` },
          });
      
          setAnimals((prevAnimals) => prevAnimals.concat(response.data));
        } catch (error) {
          console.log(error);
        }
      };


    useEffect(() => {
        if(isLogged){
            getAnimals()
        }
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
                    key={(animal.id*Math.random())}
                    animal={animal}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                    user={user}
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

Trombinoscope.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  favorites: PropTypes.array,
  setFavorites: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
};

export default Trombinoscope ;