// Imports internes
import AnimalFav from './AnimalFav';
import './styles.scss'

// Imports externes
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { RxCrossCircled } from 'react-icons/rx';

// Déclarations contact API
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);
const baseUrl=process.env.REACT_APP_BASE_URL

const Favorites = ({favorites, setFavorites, isLogged}) => {

    const [animals, setAnimals] = useState([])
    const [message, setMessage] = useState('')

// Récupération des données de l'animal
    const getAnimalsData = async (id) => {

        const animalExists = animals.find((animal) => animal.id === id);

        if (!animalExists) {

         try{

          const response = await axios.get(`${baseUrl}/animal/${id}`,
          { headers: { Authorization: `Bearer ${newToken}` }});

          setAnimals(prevAnimals => [...prevAnimals, response.data]);

         }catch(error){
            setMessage('Il y a eu un soucis au moment de récupérer les informations de l\'animal ')
            console.log(error)
         } 
         
        }else{
            setMessage('Cet animal n\'existe pas.')
        }

        return
    }

// Au chargement de la page, on récupère les favoris stockés dans le localStorage
// Puis on récupère chaque animal concerné
    useEffect(() => {

        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
          setFavorites(storedFavorites);

          favorites.forEach(element => {
            getAnimalsData(element)
          });

        }
      }, [isLogged]);

    return(
        <div className='favorites-page__container'>
        {isLogged
            ? <div className='favorites-page__fav--container'>
            {message != '' &&
            <p className='favorites-page__message'>{message} <RxCrossCircled className='cross' onClick={e=>setMessage('')}/></p>
            }
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

Favorites.propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    setFavorites: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
  };

export default Favorites ;