import React from 'react';
import Select from 'react-select';
import './styles.scss';
import { optionsAge, optionsActivité, optionsBudget, optionsCaracter, optionsCohabitation, optionsHabitat, optionsJardin, optionsKids, optionsSexe, optionsTemps } from '../../data/options_select';
import customStyles from './custom_styles';

const Preferences = () => {

    
    return(
        <div className='preference__page-container'>
            <div className='preference__actual-profil'>
                <h1>Profil actuel</h1>
                <p className='preference__actual-profil--title'>Profil</p>
                <div className='preference__actual-profil--tags'>
                    <span>Maison</span><span>Jardin</span><span>Pas d'enfants</span><span>Budget illimité</span>
                </div>
                <p className='preference__actual-profil--title'>Préférences</p>
                <div className='preference__actual-profil--tags'>
                    <span>Junior</span><span>Femelle</span><span>Mâle</span><span>Joyeux</span><span>Calin</span><span>Joueur</span>
                </div>
            </div>
            <form className='preference__form-container'>
                <h2>Votre profil</h2>
                <div className='preference__form-container--formdiv'>
                    <Select options={optionsHabitat} placeholder='Habitat' className='preference__form-container--select' styles={customStyles}/>
                    <Select options={optionsJardin} placeholder='Jardin' className='preference__form-container--select' styles={customStyles}/>
                    <Select options={optionsTemps} placeholder="Heures d'absence par jour" className='preference__form-container--select' styles={customStyles}/>
                    <Select options={optionsKids} placeholder='Avez-vous des enfants ?' className='preference__form-container--select' styles={customStyles}/>
                    <Select options={optionsBudget} placeholder='Votre budget est plutôt...' className='preference__form-container--select' styles={customStyles}/>
                    <Select options={optionsCohabitation} isMulti placeholder='Vous avez déjà...' className='preference__form-container--select' styles={customStyles}/>
                </div> 
                <h2>Vos préférences</h2>
                <div className='preference__form-container--formdiv'>
                    <Select options={optionsAge} isMulti placeholder='Age' className='preference__form-container--select' styles={customStyles}/>
                    <Select options={optionsCaracter} isMulti placeholder='Caractère' className='preference__form-container--select' styles={customStyles}/>
                    <Select options={optionsSexe} isMulti placeholder='Sexe' className='preference__form-container--select' styles={customStyles}/>
                    <Select options={optionsActivité} isMulti placeholder='Activité' className='preference__form-container--select' styles={customStyles}/>
                </div>
                   

                    <button className='preference__form-container--button'><span>Valider</span></button>
            </form>
        </div>
    )
}

export default Preferences;