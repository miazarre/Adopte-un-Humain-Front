import './styles.scss'
import { React, useEffect, useState } from 'react';
import AnimalFav from './AnimalFav';
import axios from 'axios';

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const Favorites = ({favorites, setFavorites, isLogged}) => {

    const [animals, setAnimals] = useState([])

    const getAnimalsData = async (id) => {

        const token = localStorage.getItem('token');
        const newToken = JSON.parse(token);
        const animalExists = animals.find((animal) => animal.id === id);

        if (!animalExists) {

          const response = await axios.get(`${baseUrl}/animal/${id}`,
          { headers: { Authorization: `Bearer ${newToken}` } }
          );
          setAnimals(prevAnimals => [...prevAnimals, response.data]);
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