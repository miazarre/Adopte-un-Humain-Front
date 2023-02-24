import '../styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { GiLabradorHead } from "react-icons/gi";

const Animal = ({name, birthdate, resume, needs, id }) => {
    const profile=`/trombinoscope/${id}`;
    let date = (new Date(birthdate));
    let localeDate = date.toLocaleDateString('fr-FR');

    //delete du profil d'un animal
    const handleClick = (event) => {
        event.preventDefault();
        console.log('OK');
    };

    return( 
        <tr>
            <td>{name}</td>
            <td>{localeDate}</td>
            <td>{resume}</td>
            <td>{needs}</td>
            <td>
                <Link to={profile}>
                    <GiLabradorHead size={'3vh'} className='users_container-title-table--icon' />
                </Link>
            </td>
            <td>
                <Link to="/">
                    <TfiPencil size={'3vh'} className='animals_container-title-table--icon'/>
                </Link>
                {/* <Link to="/deleteanimal"> */}
                <FiTrash2 onClick={handleClick} size={'3vh'} className='animals_container-title-table--icon' />
                {/* </Link> */}
            </td>
        </tr>
    )
}

Animal.propTypes = {
    name: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired,
    needs: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };
    
export default Animal;