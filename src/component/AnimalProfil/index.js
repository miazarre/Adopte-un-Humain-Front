import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import {TiArrowBack} from 'react-icons/ti'
import Slider from 'react-slick';
import axios from 'axios';

import './styles.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const AnimalProfil = () => {

    const param = useParams()
    const [animal, setAnimal] = useState([])

    const getAnimal = async () =>{
        const response = await axios.get(`${baseUrl}/animal/${param.id}`) ;
        setAnimal(response.data)
    }

    useEffect(() => {
        getAnimal()
        }, 
      []);

    const [isContactingAnimal, setIsContactinganimal] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
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
                        <div style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo1})`}} className='animal-profil__details--image'> 
                        </div> 
                    </div>
                    {animal.photo2 &&
                    <div> 
                        <div style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo2})`}} className='animal-profil__details--image'> 
                        </div>
                    </div>
                    }
                    {animal.photo3 &&
                    <div> 
                        <div style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo3})`}} className='animal-profil__details--image'> 
                        </div>
                    </div>
                    }
                    {animal.photo4 &&
                    <div> 
                        <div style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo4})`}} className='animal-profil__details--image'> 
                        </div>
                    </div>
                    }
                    
                </Slider>
            </div>
        </div>
        <div className='animal-profil__description'>
            <div className='animal-profil__title-container'>
                <h1 className='animal-profil__title-container--name'>{animal.name}</h1>
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
                        <p>{animal.description}</p>
                        <p>{animal.description}</p>
                    </div>
                    <p className='animal-profil__description--button' onClick={e=>setIsContactinganimal(!isContactingAnimal)}><span>Écrire à {animal.name}</span></p>
                </>
                }

        </div>
    </div>
    </>
    )
}

export default AnimalProfil