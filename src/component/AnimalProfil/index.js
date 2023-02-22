import React from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import data from '../../data/fake_animals.json'
import './styles.scss'
import {TiArrowBack} from 'react-icons/ti'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AnimalProfil = () => {

    const param = useParams()
    const animal = data.filter(animal => parseInt(animal.id) === parseInt(param.id))

    const settings = {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return(
    <>
    <Link to='/trombinoscope' className='animal-profil__back'><span><TiArrowBack size={'50px'}/></span></Link>
    <div className='animal-profil__container'>
        <div className='animal-profil__details'>
            <div className='animal-profil__details--gradient'>
                <Slider {...settings}>
                    <div> 
                        <div style={{backgroundImage:`url(${animal[0].image})`}} className='animal-profil__details--image'> 
                        </div>
                    </div>
                    <div > 
                        <div style={{backgroundImage:`url(${animal[0].image2})`}} className='animal-profil__details--image'> 
                        </div>
                    </div>
                    
                </Slider>
            </div>
        </div>
        <div className='animal-profil__description'>
            <div className='animal-profil__title-container'>
                <h1 className='animal-profil__title-container--name'>{animal[0].name}</h1>
                <span className='animal-profil__title-container--dot'></span>
                <p className='animal-profil__title-container--points'>10 points communs</p>
            </div>
            <div className='animal-profil__description--text'>
                <p>{animal[0].description}</p>
                <p>{animal[0].description}</p>
            </div>
            <Link to='/trombinoscope' className='animal-profil__description--button'><span>Écrire à {animal[0].name}</span></Link>
        </div>
    </div>
    </>
    )
}

export default AnimalProfil