import '../styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { FcViewDetails } from "react-icons/fc";
import { GiLabradorHead } from "react-icons/gi";
import { IoPersonSharp } from "react-icons/io5";

const Adoption = ({animal_id, user_id, id }) => {
    const link = `/adoptions/${id}`
    const linkAnimal=`/trombinoscope/${animal_id}`;
    const linkUser=`/trombinoscope/${user_id}`;
    return( 
        <tr className='adoption_table'>
            <td>
                <Link to={linkUser}>
                    <IoPersonSharp size={'3vh'} className='users_container-title-table--icon' />
                </Link>
            </td>
            <td>
                <Link to={linkAnimal}>
                    <GiLabradorHead size={'3vh'} className='users_container-title-table--icon' />
                </Link>
            </td>
            <td>
                <Link to={link}>
                    <FcViewDetails size={'3vh'} className='adoptions_container-title-table--icon'/>
                </Link>
            </td>
            <td>
                <Link to="/">
                    <TfiPencil size={'3vh'} className='adoptions_container-title-table--icon'/>
                </Link>
                <FiTrash2 
                    size={'3vh'} 
                    className='adoptions_container-title-table--icon' 
                    onClick={() => {const confirmation = window.confirm("Etes-vous sûr de vouloir supprimer cette demande d'adoption ?")
                        if (confirmation){
                            console.log('OK on supprime')
                        } else {
                            console.log('On annule')
                        }}}
                />
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