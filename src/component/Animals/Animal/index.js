import '../styles.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { GiLabradorHead } from "react-icons/gi";

const Animal = ({name, birthdate, resume, needs, id }) => {
    const profile=`/trombinoscope/${id}`;
    const date = new Date(birthdate);
    const localeDate = (date.toLocaleDateString('fr-FR'));
    const URLdelete = `http://matthieuskrzypczak-server.eddi.cloud:8080/api/animal/${id}`;

    const [data, setData] = useState([])
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
     async function deleteAnimal() {
        await axios.delete(URLdelete)
            .then(response => setData('Delete successful'))
            .catch(error => {
                setErrorMessage(error.message);
                console.error('Il y a une erreur !', error);
            });
      }
      deleteAnimal();
    }, []);

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
                <Link to="/">
                    <TfiPencil size={'3vh'} className='animals_container-title-table--icon'/>
                </Link>
                <FiTrash2 
                    size={'3vh'} 
                    className='animals_container-title-table--icon' 
                    onClick={() => {const confirmation = window.confirm("Etes-vous sûr de vouloir supprimer le profil de cet animal ?")
                        if (confirmation){
                            console.log('On supprime')
                        } else {
                            console.log('On annule')
                        }}}
                />         
            </td>
        </tr>
        <div>
            Error: {errorMessage}
        </div>
        </>
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