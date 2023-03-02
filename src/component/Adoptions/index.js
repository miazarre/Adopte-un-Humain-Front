import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { VscDiffAdded } from "react-icons/vsc";

import Adoption from './Adoption';
import './styles.scss'

const Adoptions = () => {

    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredAdoption, setFilteredAdoption] = useState([]);

    const fetchData = async () =>{
        try {
          const response = await axios.get('http://matthieuskrzypczak-server.eddi.cloud:8080/api/animals');
          setAnimals(response.data);
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
        if (searchText.length) {
          const filteredAdoptions = data.filter((adoption) => {
            return (adoption.id).toLowerCase().includes(searchText.toLowerCase());
          });
          setFilteredAdoption(filteredAdoptions);
        } else {
            setFilteredAdoption([]);
        }
      }, [searchText, data]);

    return(
        <div className='adoptions_container'>
        <h1 className='adoptions_container-title'>Demandes d'adoptions</h1>
        <div className='adoptions_container-header'>
            <div className='adoptions_container-header--search'>
                <form className="adoptions_container-form">
                    <button>
                        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                    <input className="adoptions_container-form__input" placeholder="Rechercher un animal" required="" type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)}  />
                    <button className="adoptions_container-form__reset" type="reset">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </form>
            </div>
            <Link to="/board">
                <p className='adoptions_container--linkToBoard'><span>Retour au Tableau de Bord</span></p>
            </Link>
        </div>
        <table className='adoptions_container-title-table'>
            <tr>
                <th>Profil de l'utilisateur</th>
                <th>Profil de l'animal</th>
                <th>Détail des demandes</th>
                <th className='adoptions_container-title-table--icon'>Modifier / Supprimer</th>
            </tr> 
            { 
            filteredAdoption.length ?
            filteredAdoption.map((adoption) => 
            <Adoption 
            key={adoption.id}
            {...adoption}
            />
            ) :
            data.map((adoption) => (
            <Adoption
            key={adoption.id}
            {...adoption}
            />      
            ))}
        </table>
    </div>
    )
}

export default Adoptions;