import '../styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { FcViewDetails } from "react-icons/fc";

const Adoption = ({name, age, espece, id }) => {
    const link = `/adoptions/${id}`
    return( 
        <tr className='adoption_table'>
            <td>{name}</td>
            <td>{age}</td>
            <td>{espece}</td>
            <td>
                <Link to={link}>
                    <FcViewDetails size={'3vh'} className='adoptions_container-title-table--icon'/>
                </Link>
            </td>
            <td>
                <Link to="/">
                    <TfiPencil size={'3vh'} className='adoptions_container-title-table--icon'/>
                </Link>
                <Link to="/">
                    <FiTrash2 size={'3vh'} className='adoptions_container-title-table--icon' />
                </Link>
            </td>
        </tr>
    )
}

Adoption.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    espece: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };
    
export default Adoption;