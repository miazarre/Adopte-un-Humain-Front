import '../styles.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { GiLabradorHead } from "react-icons/gi";
import PatchAnimal from '../PatchAnimal';
const baseUrl=process.env.REACT_APP_BASE_URL

const Animal = ({name, birthdate, resume, needs, id }) => {

    const [data, setData] = useState([])
    const profile=`/trombinoscope/${id}`;
    const URLdelete = `${baseUrl}/animal/${id}`;

    const date = new Date(birthdate);
    const localeDate = (date.toLocaleDateString('fr-FR'));

    const token = localStorage.getItem('token');
    const newToken = JSON.parse(token);
    const reqInstance = axios.create({
        headers: {
            Authorization : `Bearer ${newToken}`
        }
    })

    const onDelete = async (id) => {
        await reqInstance.delete(URLdelete)
        .then (setData(data))
        .catch(error => {
            console.error(error.message);
    })};

    return( 
        <>
        <tr className="animal_table">
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
                <Link to={`/animals/patchanimal/${id}`} >
                    <TfiPencil 
                        size={'3vh'} 
                        className='animals_container-title-table--icon' 
                    />
                </Link>
                <FiTrash2 
                    size={'3vh'} 
                    className='animals_container-title-table--icon' 
                    onClick={() => {const confirmation = window.confirm("Etes-vous sûr de vouloir supprimer le profil de cet animal ?")
                        if (confirmation){
                            console.log('On supprime')
                            onDelete(id)
                        } else {
                            console.log('On annule')
                        }}
                    }
                />         
            </td>
        </tr>
        </>
    )
}

Animal.propTypes = {
    name: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired,
    needs: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name2: PropTypes.string.isRequired,
};
    
export default Animal;