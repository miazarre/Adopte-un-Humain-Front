import '../styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { GiLabradorHead } from "react-icons/gi";

const Animal = ({name, age, espece, caractere, besoins, id }) => {
    const profile=`/trombinoscope/${id}`;
    return( 
        <tr>
            <td>{name}</td>
            <td>{age}</td>
            <td>{espece}</td>
            <td>{caractere}</td>
            <td>{besoins}</td>
            <td>
                <Link to={profile}>
                    <GiLabradorHead size={'3vh'} className='users_container-title-table--icon' />
                </Link>
            </td>
            <td>
                <Link to="/">
                    <TfiPencil size={'3vh'} className='animals_container-title-table--icon'/>
                </Link>
                <Link to="/">
                    <FiTrash2 size={'3vh'} className='animals_container-title-table--icon' />
                </Link>
            </td>
        </tr>
    )
}

Animal.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    espece: PropTypes.string.isRequired,
    caractere: PropTypes.string.isRequired,
    besoins: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };
    
export default Animal;