import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import {TiArrowBack} from 'react-icons/ti'
import { RxCrossCircled } from 'react-icons/rx';
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import Slider from 'react-slick';
import axios from 'axios';

import './styles.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const AnimalProfil = ({user, isLogged, favorites, toggleFavorite}) => {

// Déclaration de tous les params
    const param = useParams()
    const [animal, setAnimal] = useState([])
    const [isContactingAnimal, setIsContactinganimal] = useState('no');
    const [form, setForm] = useState({
        form1:'',
        form2:'',
        form3:''
    })
    const [errorMessage, setErrorMessage] = useState('');

// Gestion des formulaires controlés
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      };

// Contact de l'API pour récupérer les données de l'animal
    const getAnimal = async () =>{
        const response = await axios.get(`${baseUrl}/animal/${param.id}`) ;
        setAnimal(response.data)
    }
// Au chargement de la page on lance la fonction getAnimal
    useEffect(() => {
        getAnimal()
        }, 
      []);

// Gestion du submit de la demande d'adoption
        const handleFormSubmit = async () => {

            const token = localStorage.getItem('token');
            const newToken = JSON.parse(token);

            if(form.form1 === '' || form.form2 === '' || form.form3 === ''){
                setErrorMessage('Veuillez remplir toutes les parties du formulaire.')
                return
            }
            if(form.form1.length < 10 || form.form2.length < 10 || form.form3.length < 10){
                setErrorMessage('Chaque champs doit contenir un minimum de 10 caractères. N\'hésitez pas à lire les conseils présents à droite des formulaires.')
                return
            }

            try{
                const response = await axios.post(`${baseUrl}/adopt`,
                {
                    form1:form.form1,
                    form2:form.form2,
                    form3:form.form3
                },
                { headers: { Authorization: `Bearer ${newToken}` } }
                )
                console.log(response.data)
                setIsContactinganimal('send')

            }catch(error){
                setErrorMessage('Il y a eu un soucis au moment de contacter le serveur.')
                console.log(error)
            }
            
            console.log('Hop')
        }
// Settings nécessaires au slide de Slick
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
        {isLogged
        ? <>

            <div className='animal-profil__details'>
                <div className='animal-profil__details--gradient'>
                    <Slider {...settings}>
    {/* Affichage conditionnel des photos selon le nombre lié à l'animal */}
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
                    <div className='animal-card__card--heart' onClick={e => toggleFavorite(animal.id)}>
                    {favorites.includes(animal.id)
                    ?  <div className='animal-profil__title-container--fav animal-profil__title-container--fav-added'><BsSuitHeartFill className='icon' size={'15px'}/> Retirer des coups de coeur</div>
                    :  <div className='animal-profil__title-container--fav animal-profil__title-container--fav-not-added'><BsSuitHeart className='icon' size={'15px'} /> Ajouter aux coups de coeur</div>
                    }
                    </div>
                </div>


    {/* Affichage conditionnel. Si tu cliques sur contacter, tu affiches le formulaire de contact. Si non, tu as la description de l'animal */}
                    {isContactingAnimal === 'yes' &&
                    <>
                    <div className='animal-profil__contact'>
                    {errorMessage != '' &&
                        <p className='animal-profil__contact--errorMessage'>{errorMessage} <RxCrossCircled size='30px' className='animal-profil__contact--errorMessage--cross' onClick={e => setErrorMessage('')}/></p>
                    }
                        <div className='animal-profil__contact--container'>
                            <textarea name='form1' value={form.form1} onChange={handleFormChange} className='animal-profil__contact--textarea' rows="6" cols="70" placeholder='Première partie'></textarea>
                            <div className='animal-profil__contact--exemple'><p className='animal-profil__contact--exemple--title'>Introduction</p>Bonjour {animal.name} ! Je suis tellement heureux de te rencontrer. Tu as l'air si mignon et j'aimerais beaucoup t'offrir un foyer aimant.</div>
                        </div>
                        <div className='animal-profil__contact--container'>
                            <textarea name='form2' value={form.form2} onChange={handleFormChange} className='animal-profil__contact--textarea' rows="6" cols="70" placeholder='Deuxième partie'></textarea>
                            <div className='animal-profil__contact--exemple'><p className='animal-profil__contact--exemple--title'>Cadre de vie</p>Je suis {user.firstname} et je suis prêt à tout faire pour que tu sois heureux. Pour le moment je n'ai aucun animal chez moi, et je suis disponible très souvent.</div>
                        </div>
                        <div className='animal-profil__contact--container'>
                            <textarea name='form3' value={form.form3} onChange={handleFormChange} className='animal-profil__contact--textarea' rows="6" cols="70" placeholder='Troisième partie'></textarea>
                            <div className='animal-profil__contact--exemple'><p className='animal-profil__contact--exemple--title'>Conclusion</p>Je suis impatient d'en savoir plus sur toi - ce que tu aimes manger, tes jeux préférés et tout ce qui te rend heureux. J'espère que nous pourrons bientôt nous rencontrer en personne et commencer une belle aventure ensemble. <br/> Avec affection, <br/>{user.firstname}</div>
                        </div>
                        
                        <div className='animal-profil__button--container'>
                            <p className='animal-profil__button' onClick={handleFormSubmit}><span>Envoyer</span></p>
                            <p className='animal-profil__button--cross' onClick={e=>setIsContactinganimal('no')}><span>X</span></p>
                        </div>
                    </div>
                    </>
                    }
                    {isContactingAnimal === 'no' &&
                    <>
                        <div className='animal-profil__description--text'>
                            <p>{animal.description}</p>
                            <p>{animal.description}</p>
                        </div>
                        <p className='animal-profil__description--button' onClick={e=>setIsContactinganimal('yes')}><span>Écrire à {animal.name}</span></p>
                    </>
                    }
                    {isContactingAnimal === 'send' &&
                    <>
                        <div>
                        <p className='animal-profil__sending-message'>
                        <RxCrossCircled size='20px' className='animal-profil__sending-message--cross' onClick={e=>setIsContactinganimal('no')}/>
                            Votre demande d'adoption à bien été prise en compte. Notre staff vous recontactera rapidement, assurez-vous que vos coordonnées soient à jour sur votre <Link to='/profil' className='animal-profil__sending-message--link'>Profil</Link>.
                        </p>
                        </div>
                    </>
                    }
                

            </div>

        </>

        : <p className='profil-user__connexion-message'> Il faut te connecter ! </p>
        
        }
    </div>
    </>
    )
}

export default AnimalProfil