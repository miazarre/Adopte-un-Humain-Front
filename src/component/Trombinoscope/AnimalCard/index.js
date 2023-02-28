import './styles.scss'
import { Link } from 'react-router-dom';
import React from 'react';
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'


const AnimalCard = ({animal, toggleFavorite, favorites}) => {

    return(
        <div className='animal-card__card'>
            <div className='animal-card__card--heart' onClick={e => toggleFavorite(animal.id)}>
            {favorites.includes(animal.id)
            ?   <BsSuitHeartFill size={'30px'}/>
            :  <BsSuitHeart  size={'30px'} />
            }
            
            </div>
            <div className='animal-card__card--gradient'>
                <div 
                style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo1})`}} 
                className='animal-card__card--image'
                >
                </div>
            </div>
            <h2 className='animal-card__card--name'>{animal.name}</h2>
            <p className='animal-card__card--resume'>{animal.resume}</p>
            <p className='animal-card__card--points'>10 points communs</p>
            <Link to={`/trombinoscope/${animal.id}`} className='animal-card__card--bouton'><span>Profil</span></Link>
        </div>
    )
}

export default AnimalCard ;