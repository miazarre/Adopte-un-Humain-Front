import '../styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { IoPersonSharp } from "react-icons/io5";

const User = ({name, firstname, role, profile }) => {
    return( 
        <tr>
            <td>{name}</td>
            <td>{firstname}</td>
            <td>
                {role}
                <Link to="/">
                    <TfiPencil size={'2.7vh'} className='animals_container-title-table--icon'/>
                </Link>
            </td>
            <td>
                <Link to= {profile}>
                    <IoPersonSharp size={'3vh'} className='users_container-title-table--icon' />
                </Link>
            </td>
            <td>
                <Link to="/">
                    <FiTrash2 size={'3vh'} className='users_container-title-table--icon' />
                </Link>
            </td>
        </tr>
    )
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  };
    
export default User;