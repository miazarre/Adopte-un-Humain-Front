// Imports internes
import AnimalFav from './AnimalFav';
import './styles.scss'

// Imports externes
import { React, useEffect, useState } from 'react';
import axios from 'axios';

// Déclarations contact API
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);
const baseUrl=process.env.REACT_APP_BASE_URL

const Favorites = ({favorites, setFavorites, isLogged}) => {

    const [animals, setAnimals] = useState([])

// Récupération des données 
    const getAnimalsData = async (id) => {

        const animalExists = animals.find((animal) => animal.id === id);

        if (!animalExists) {

         try{
          const response = await axios.get(`${baseUrl}/animal/${id}`,
          { headers: { Authorization: `Bearer ${newToken}` }});
          setAnimals(prevAnimals => [...prevAnimals, response.data]);
         }catch(error){
          console.log(error)
         } 
         
        }

        return
    }

    useEffect(() => {

        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
          setFavorites(storedFavorites);

          favorites.forEach(element => {
            getAnimalsData(element)
          });

        }
      }, []);

    return(
        <div className='favorites-page__container'>
        {isLogged
            ? <div className='favorites-page__fav--container'>
            {
                animals.map((animal) => (
                    <AnimalFav
                    key={Math.random()}
                    animal={animal}
                    />
                ))
            }
            </div>
            : <p className='profil-user__connexion-message'> Il faut te connecter ! </p> 
        } 
        </div>
    )
}

export default Favorites ;