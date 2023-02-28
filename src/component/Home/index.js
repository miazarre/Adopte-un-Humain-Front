import React, { useEffect, useState } from 'react';
import './styles.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
<<<<<<< HEAD
<<<<<<< HEAD
import AnimalFav from '../Favorites/AnimalFav';
=======
>>>>>>> update Home with Axios
=======
import AnimalFav from '../Favorites/AnimalFav';
>>>>>>> add server on home

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const Home = () => {
    const [profiles, setProfiles] = useState([])

    const filteredProfiles = async () => {
        const response = await axios.get(`${baseUrl}/animals`);
<<<<<<< HEAD
<<<<<<< HEAD
        setProfiles(response.data.slice(0, 4))
=======
        setProfiles(response.data)
>>>>>>> update Home with Axios
=======
        setProfiles(response.data.slice(0, 4))
>>>>>>> add server on home
    }
     useEffect(() => {
        filteredProfiles()
     },
     [] );

    return(
    <>
    <div className='container'>
        <h1 className='title'> J'adopte un humain </h1>
            <div className='intro'>
                   <p>Trouver le compagnon idéal peut être une tâche décourageante...C'est pourquoi nous avons créé un système de matching qui vous met en relation avec des animaux qui correspondent à votre personnalité.
                    Notre système prend en compte trois types de caractères différents, afin que vous puissiez trouver un animal qui vous corresponde vraiment. 
                    Que vous soyez extraverti et aventureux, calme et posé, ou quelque part entre les deux, nous avons un animal qui correspondra à votre niveau d'énergie et à votre personnalité.
                    Notre objectif est de rendre le processus d'adoption aussi facile et sans stress que possible. Grâce à notre système de matching, vous pouvez être sûr que vous adoptez un animal qui correspondra parfaitement à votre style de vie et à votre personnalité.
                    </p> 
                <h3>Alors, qu'attendez-vous ? Venez rencontrer votre futur ami dès aujourd'hui !</h3>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
        <div className='animal_profiles'>
            <div className='profiles'>
                {profiles.map((profile) => (
                    <AnimalFav animal={profile}/>
=======
        <div className='animal-profiles'>
            <div className='profiles'>
                {profiles.map((profile) => (
                    <div key={profile.name} className='profile'>
                        <div 
                            style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${profile.photo1})`}} 
                            className='animal-card__card--image'>
                        </div>
                        <h3 className='name'>{profile.name}</h3>
                    </div>
>>>>>>> update Home with Axios
=======
        <div className='animal_profiles'>
            <div className='profiles'>
                {profiles.map((profile) => (
                    <AnimalFav animal={profile}/>
>>>>>>> add server on home
                ))}
                </div>
        </div>
    </div>
    </>
    );
}

export default Home