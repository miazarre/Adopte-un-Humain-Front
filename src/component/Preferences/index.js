import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss';
import { optionsAge, optionsActivité, optionsBudget, optionsCaracter, optionsCohabitation, optionsHabitat, optionsJardin, optionsKids, optionsSexe, optionsTemps, optionsTempsBallade, optionsTempsSolo } from '../../data/options_select';
import customStyles from './custom_styles';
import axios from 'axios';
import {RxCrossCircled} from 'react-icons/rx'

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);

const Preferences = ({isLogged, user}) => {

    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');
// Contact de l'API pour récupérer les tags liés a l'utilisateur connecté
    const settingPref = async () => {

        const responseTags = await axios.get(`${baseUrl}/user/${user.id}/tag`,
        { headers: { Authorization: `Bearer ${newToken}` }}
        )
        setTags(responseTags.data)
        console.log(responseTags.data)
    }
// Appel au chargement de la page de la fonction pour setup les tags du user
    useEffect(() => {
        settingPref()
    }, [])

// Au changement sur un Select on appelle la fonction qui contact l'API pour ajouter un tag
  const handleChange = async (selectedOption) => {
    addingTag(selectedOption)
    };
// On récupère l'id du tag selectionné via l'API
    const getTagId = async (selectedOption) => {
        const response = await axios.get(`${baseUrl}/tags`,
        { headers: { Authorization: `Bearer ${newToken}` }}
        )
        let foundTag = response.data.filter((tag) => tag.name.toLowerCase() === selectedOption.value)
        return foundTag ;
    }
// Au changement sur un Select multi, on appelle la fonction qui contact l'API pour chaque champs séléctionné
  const handleChangeMulti = (selectedOption) => {
    selectedOption.forEach(element => {
        addingTag(element)
    });
  }
// Fonction qui appelle l'API pour ajouter une liaison tag-user
  const addingTag = async (selectedOption) => {
    try{
        const tag = await getTagId(selectedOption);
        const existingTag = tags.find((tag) => tag.tag_name.toLowerCase() === selectedOption.value);

        if (existingTag) {
            setMessage(`Vous avez déjà choisi '${selectedOption.value}' comme option.`)
            console.log(`Tag '${selectedOption.value}' already exists.`);
            return;
        }
        
        const response = await axios.post(`${baseUrl}/user/${user.id}/tag`,
        {tag_id:tag[0].id},
        { headers: { Authorization: `Bearer ${newToken}` }}
        )
        console.log(response)
        settingPref()

    }catch(error){
        console.log(error)
    }
}
// Fonction qui appelle l'API pour supprimer la liaison tag-user
    const deletingTag = async (id) => {
        try{
            const response = await axios.delete(`${baseUrl}/user/${user.id}/tag`,
            {tag_id:id},
            { headers: { Authorization: `Bearer ${newToken}` }}
            )
            console.log(response)
            settingPref()
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className='preference__page-container'>
        {isLogged
        ?<>
                    <div className='preference__actual-profil'>
                        <h1>Profil actuel</h1>
                        <p className='preference__actual-profil--title'>Profil</p>
                        <div className='preference__actual-profil--tags'>
                            {tags.map((tag) =>{
                                if(tag.priority === true){
                                    return(
                                    <span key={tag.tag_id}>{tag.tag_name} <RxCrossCircled onClick={deletingTag(tag.tag_id)}/></span>
                                )}
                                
                                })
                            }
                        </div>
                        <p className='preference__actual-profil--title'>Préférences</p>
                        <div className='preference__actual-profil--tags'>
                        {tags.map((tag) =>{
                                if(tag.priority === false){
                                    return(
                                    <span key={tag.tag_id}>{tag.tag_name}</span>
                                )}
                                
                                })
                        }
                        </div>
                    </div>
                    <form className='preference__form-container'>
                        <h2>Votre profil</h2>
                        {message != '' &&
                        <p className='preference__message'>{message} <RxCrossCircled/></p>
                        }
                        <div className='preference__form-container--formdiv'>
                            <Select options={optionsHabitat} placeholder='Habitat' className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsJardin} placeholder='Jardin' className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsTempsBallade} placeholder="Temps de ballades par jour" className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsTempsSolo} placeholder="Heures d'absence par jour" className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsKids} placeholder='Avez-vous des enfants ?' className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsBudget} placeholder='Votre budget est plutôt...' className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsCohabitation} isMulti placeholder='Vous avez déjà...' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                        </div> 
                        <h2>Vos préférences</h2>
                        <div className='preference__form-container--formdiv'>
                            <Select options={optionsAge} isMulti name='age' placeholder='Age' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                            <Select options={optionsCaracter} isMulti placeholder='Caractère' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                            <Select options={optionsSexe} isMulti placeholder='Sexe' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                            <Select options={optionsActivité} isMulti placeholder='Activité' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                        </div>
                        
                    </form>
                    </>
            : <p className='profil-user__connexion-message'> Il faut te connecter ! </p>
                    
            }
        </div>
    )
}

export default Preferences;