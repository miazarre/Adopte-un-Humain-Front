// Imports internes
import './styles.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Imports librairies 
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import {TiArrowBack} from 'react-icons/ti';
import { RxCrossCircled } from 'react-icons/rx';
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';
import { PieChart } from 'react-minimal-pie-chart';
import Slider from 'react-slick';
import axios from 'axios';
import PropTypes from 'prop-types';

//Déclarations API
const baseUrl=process.env.REACT_APP_BASE_URL;


const AnimalProfil = ({user, isLogged, favorites, toggleFavorite}) => {

    
// Déclaration de tous les params
    const token = localStorage.getItem('token');
    const newToken = JSON.parse(token);

    const param = useParams()
    const [animal, setAnimal] = useState([])
    const [isContactingAnimal, setIsContactinganimal] = useState('no');
    const [form, setForm] = useState({
        form1:'',
        form2:'',
        form3:''
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([])
    const [matching, setMatching] = useState({
        count:'',
        pourcentage:''
    });
    const navigate = useNavigate();
// Gestion des formulaires controlés
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      };

// Contact de l'API pour récupérer les données de l'animal
    const getAnimal = async () =>{
        try{
            const response = await axios.get(`${baseUrl}/animal/${param.id}`,
            { headers: { Authorization: `Bearer ${newToken}` } }) ;
            setAnimal(response.data)
        }catch(error){
            setErrorMessage('Impossible de récupérer les données de l\'animal auprès du serveur.')
            console.log(error)
        }
        
    }
// Au chargement de la page on lance la fonction getAnimal
    useEffect(() => {
        getAnimal()
        getMatching()
        }, 
      []);

// Fonction qui récupère le matching entre l'utilisateur connecté et l'animal en cours d'affichage
      const getMatching = async () => {
        try{
            const response = await axios.get(`${baseUrl}/user/${user.id}/matching/${param.id}`,
            { headers: { Authorization: `Bearer ${newToken}` } }
            )
            setData(response.data)
            resolveMatching(response.data)

        }catch(error){
            console.log(error)
            setErrorMessage('Impossible de récupérer les données de matching auprès du serveur.')
        }
    }

// Calcul des % pour chaque matchong
    const resolveMatching = (data) => {

        let animalTagCount = 0;
        let animalFilledTagCount = 0;

        data.forEach(tag => {
            if (tag.statut.includes('animal') || tag.statut.includes('commun')) {
                animalTagCount++;
                if (tag.match_count === '1') {
                    animalFilledTagCount++;
                }
            }
        });

        let pourcentageDone = parseInt((animalFilledTagCount / animalTagCount) * 100);
        let pourcentage = parseInt(100 - pourcentageDone);
        setMatching({...matching, count: animalFilledTagCount, animalTag:animalTagCount, pourcentage:pourcentage, pourcentageDone:pourcentageDone});
    }

    useEffect(() => {
        getMatching()
    }, [])

// Gestion du submit de la demande d'adoption avec vérification du contenu des form
    const handleFormSubmit = async () => {

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
                form3:form.form3,
                user_id:user.id,
                animal_id:param.id,
                status:'En cours'
            },
            { headers: { Authorization: `Bearer ${newToken}` } }
            )

            setIsContactinganimal('send')

        }catch(error){
            setErrorMessage('Il y a eu un soucis au moment de contacter le serveur.')
            console.log(error)
        }
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
    <div className='animal-profil__container'>
        {isLogged
        ? <>
            <div className='animal-profil__back'><span><TiArrowBack onClick={e => navigate(-1)} size={'50px'}/></span></div>
            <div className='animal-profil__details'>
                <div className='animal-profil__details--gradient'>
                    <Slider {...settings}>
    {/* Affichage conditionnel des photos selon le nombre lié à l'animal */}
                        {animal.photo1 &&
                        <div> 
                            <div style={{backgroundImage:`url(${baseUrl}/images/animal/${animal.photo1})`}} className='animal-profil__details--image'> 
                            </div> 
                        </div>}
                        {animal.photo2 &&
                        <div> 
                            <div style={{backgroundImage:`url(${baseUrl}/images/animal/${animal.photo2})`}} className='animal-profil__details--image'> 
                            </div>
                        </div>
                        }
                        {animal.photo3 &&
                        <div> 
                            <div style={{backgroundImage:`url(${baseUrl}/images/animal/${animal.photo3})`}} className='animal-profil__details--image'> 
                            </div>
                        </div>
                        }
                        {animal.photo4 &&
                        <div> 
                            <div style={{backgroundImage:`url(${baseUrl}/images/animal/${animal.photo4})`}} className='animal-profil__details--image'> 
                            </div>
                        </div>
                        }
                        
                    </Slider>
                   
                </div>
                <div className='animal-profil__details--matching'>
                    <div>
                        <p className='pourcent'>{matching.pourcentageDone}%</p>
                        {matching.pourcentage != 0 &&
                            <PieChart
                            className='animal-profil__details--camembert'
                            data={[
                                { title: 'Match', value:matching.pourcentageDone, color: '#70C1B3' },
                                { title: 'No Match', value:matching.pourcentage, color: '#247BA0' },
                            ]}
                            radius={40}
                            startAngle={-60}
                            lengthAngle={-360}
                            lineWidth={55}
                        />}
                    </div>
                <div>
                    <span className='match'>Match :</span>
                    {data.map((tag) => {
                        if(tag.match_count == '1'){
                            return(
                                <span key={tag.tag_name} className='animal-profil__details--tag-match'>{tag.tag_name}</span>
                            )
                        }
                    })

                    }
                </div>
                <div>
                    <span className='no-match'>No match :</span>
                    {data.map((tag) => {
                        if(tag.match_count == '0' && tag.statut.includes('animal')){
                            return(
                                <span key={tag.tag_name} className='animal-profil__details--tag-nomatch'>{tag.tag_name}</span>
                            )
                        }
                    })
                    }
                </div>
                </div>
            </div>
            <div className='animal-profil__description'>
                <div className='animal-profil__title-container'>
                    <h1 className='animal-profil__title-container--name'>{animal.name}</h1>
                    <span className='animal-profil__title-container--dot'></span>
                    <p className='animal-profil__title-container--points'>{matching.count} point{matching.count > 1 ? 's' : ''} commun{matching.count > 1 ? 's' : ''}</p>
                </div>
                <div className='animal-profil__title-container--fav' onClick={e => toggleFavorite(animal.id)}>
                    {favorites.includes(animal.id)
                    ?  <div className='animal-profil__title-container--fav animal-profil__title-container--fav-added'><BsSuitHeartFill className='icon' size={'15px'}/> Retirer des coups de coeur</div>
                    :  <div className='animal-profil__title-container--fav animal-profil__title-container--fav-not-added'><BsSuitHeart className='icon' size={'15px'} /> Ajouter aux coups de coeur</div>
                    }
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
                            <p>{animal.needs}</p>
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

        : <p className='connexion-message'> Il faut te connecter pour voir cette page. <Link to='/login'><p className='connexion-message--boutton'><span>Connexion</span></p></Link></p>
        
        }
    </div>
    </>
    )
}

AnimalProfil.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number
    }),
    isLogged: PropTypes.bool.isRequired,
    favorites: PropTypes.array.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
};

export default AnimalProfil ;

