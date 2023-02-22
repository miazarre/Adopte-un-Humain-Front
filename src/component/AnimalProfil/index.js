import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import data from '../../data/fake_animals.json'
import './styles.scss'
import {TiArrowBack} from 'react-icons/ti'
import {RxCrossCircled} from 'react-icons/rx'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AnimalProfil = () => {

    const param = useParams()
    const animal = data.filter(animal => parseInt(animal.id) === parseInt(param.id))

    const [isContactingAnimal, setIsContactinganimal] = useState(false)
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
{/* Affichage conditionnel. Si tu cliques sur contacter, tu affiches le formulaire de contact. Si non, tu as la description de l'animal */}
                {isContactingAnimal
                ? <>
                <div className='animal-profil__contact'>
                    <div className='animal-profil__contact--container'>
                        <textarea className='animal-profil__contact--textarea' rows="2" cols="70" placeholder='Première partie'></textarea>
                        <p>Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.</p>
                    </div>
                    <div className='animal-profil__contact--container'>
                        <textarea className='animal-profil__contact--textarea' rows="6" cols="70" placeholder='Deuxième partie'></textarea>
                        <p>Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.</p>
                    </div>
                    <div className='animal-profil__contact--container'>
                        <textarea className='animal-profil__contact--textarea' rows="6" cols="70" placeholder='Troisième partie'></textarea>
                        <p>Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.</p>
                    </div>
                    
                    <div className='animal-profil__button--container'>
                        <p className='animal-profil__button' onClick={e=>setIsContactinganimal(!isContactingAnimal)}><span>Envoyer</span></p>
                        <p className='animal-profil__button--cross' onClick={e=>setIsContactinganimal(!isContactingAnimal)}><span>X</span></p>
                    </div>
                </div>
                 </>
                : <>
                    <div className='animal-profil__description--text'>
                        <p>{animal[0].description}</p>
                        <p>{animal[0].description}</p>
                    </div>
                    <p className='animal-profil__description--button' onClick={e=>setIsContactinganimal(!isContactingAnimal)}><span>Écrire à {animal[0].name}</span></p>
                </>
                }
            
        </div>
    </div>
    </>
    )
}

export default AnimalProfil