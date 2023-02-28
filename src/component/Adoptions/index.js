import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { VscDiffAdded } from "react-icons/vsc";

import Adoption from './Adoption';

import adoptions from '../../data/adoptions.json';
import './styles.scss'

const Adoptions = () => {

    // const [data, setData] = useState([])

    // useEffect(() => {
    //   const fetchData = async () =>{
    //     try {
    //       const {data: response} = await axios.get('http://matthieuskrzypczak-server.eddi.cloud:8080/api/adopts');
    //       setData(response);
    //     } catch (error) {
    //       console.error(error.message);
    //     }
    //   }
    //   fetchData();
    // }, []);

    const adoption = adoptions.map((adoption) => (
        <Adoption
        key={adoption.id}
        {...adoption}
        />      
    ))
    console.log(adoption)
    return(
        <div className='adoptions_container'>
        <h1 className='adoptions_container-title'>Demandes d'adoptions</h1>
        <div className='adoptions_container-header'>
            <div className='adoptions_container-header--search'>
                <form className="adoptions_container-form">
                    <button>
                        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                    <input className="adoptions_container-form__input" placeholder="Rechercher un animal" required="" type="text" />
                    <button className="adoptions_container-form__reset" type="reset">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </form>
                {/* <Link to="/">
                    <VscDiffAdded size={'4vh'} className='adoptions_container-icon' />
                </Link> */}
            </div>
            <Link to="/board">
                <button className='adoptions_container--linkToBoard'>Retour au Tableau de Bord</button>
            </Link>
        </div>
        <table className='adoptions_container-title-table'>
            <tr>
                <th>Nom</th>
                <th>Âge</th>
                <th>Espèce</th>
                <th>Détail des demandes</th>
                <th className='adoptions_container-title-table--icon'>Modifier / Supprimer</th>
            </tr> 
            { adoption }
        </table>
    </div>
    )
}

export default Adoptions;