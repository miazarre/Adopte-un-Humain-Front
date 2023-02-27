import './styles.scss'
import { React, useEffect, useState } from 'react';
import AnimalFav from './AnimalFav';
import axios from 'axios';

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const Favorites = ({favorites, setFavorites, isLogged}) => {

    const [animals, setAnimals] = useState([])

    const getAnimalsData = async (id) => {
        const animalExists = animals.find((animal) => animal.id === id);
        if (!animalExists) {
          console.log(id);
          const response = await axios.get(`${baseUrl}/animal/${id}`);
          setAnimals(prevAnimals => [...prevAnimals, response.data]);
        }

        return
    }

    useEffect(() => {

        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));

        if (storedFavorites) {
          setFavorites(storedFavorites);

          favorites.forEach(element => {
            console.log(element)
            getAnimalsData(element)
          });

        }
      }, []);

    return(
        <div className='favorites-page__container'>
        {isLogged
            ? <> Favorites
            {
                animals.map((animal) => (
                    <AnimalFav
                    key={Math.random()}
                    animal={animal}
                    />
                ))
            }
            </>

            : <p className='profil-user__connexion-message'> Il faut te connecter ! </p> 
            
        } 
        </div>
    )
}

export default Favorites ;