import React, { useEffect, useState } from 'react';
import './styles.scss'
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import {RiLinksFill} from 'react-icons/ri'
import {AiOutlineUser} from 'react-icons/ai'

const token = localStorage.getItem('token');
const newToken = JSON.parse(token);
const baseUrl=process.env.REACT_APP_BASE_URL;

const Home = () => {
    const [profiles, setProfiles] = useState([])

    const filteredProfiles = async () => {
        const response = await axios.get(`${baseUrl}/animals`,
        { headers: { Authorization: `Bearer ${newToken}` } });
        setProfiles(response.data.slice(0, 4))
    }

    useEffect(() => {
        filteredProfiles()
    }, []);

    return(

        <div className='container'>
             <div className='container--top-part'>
                <div>
                    <h1>J'adopte un humain</h1>
                    <p>Rencontrez votre nouveau meilleur ami sur J'adopte un humain, où les animaux et les humains se rencontrent pour une vie remplie d'amour et de bonheur.</p>
                    <div className='container--top-part--button'><span>Nous rejoindre</span></div>
                </div>
                <Player
                    autoplay
                    loop
                    className='animation--player'
                    src="https://assets10.lottiefiles.com/packages/lf20_UVSHM30NlL.json"
                />
            </div>
            
            <div className='container--animal_profiles'>
                <h3 className='container--animal_profiles--titre'>Les derniers arrivés</h3>
                <div className='profiles'>
                    {profiles.map((profile) => (
                            <div className='container--animal_profiles--card'>
                                <div className='container--animal_profiles--image' style={{backgroundImage:`url(${baseUrl}/images/animal/${profile.photo1})`}}>
                                </div>
                                <p className='container--animal_profiles--name'>{profile.name}</p>
                            </div>
                    ))}
                </div>
            </div>

            <div className='container--concept'>
                        <div>   
                            <RiLinksFill className='container--concept--icons' size={'30px'}/>
                            Vous cherchez le compagnon idéal mais cela peut être décourageant. C'est pourquoi nous avons créé un système de matching pour vous aider à trouver votre parfait compagnon. Grâce à ce système, nous sommes en mesure de vous mettre en relation avec des animaux qui correspondent à votre personnalité et à vos préférences. Nous voulons que vous puissiez trouver un compagnon qui vous convient parfaitement !                        
                        </div>
                        <div>
                            <AiOutlineUser className='container--concept--icons' size={'30px'}/>
                            Chez nous, il n'y a pas le choix quant au type d'animal que vous recherchez, car nous croyons que le caractère et la personnalité de l'animal sont bien plus importants que sa race ou son espèce. Notre système de matching est conçu pour se concentrer sur ce qui compte vraiment, vous aider à trouver un compagnon qui vous convient parfaitement en termes de personnalité et de comportement. Ici pas de shopping , mais plutôt la recherche d'un ami pour la vie.
                        </div>
            </div>
        </div>

)
}

export default Home;