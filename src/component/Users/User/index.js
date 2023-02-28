import '../styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { IoPersonSharp } from "react-icons/io5";

const User = ({name, firstname, role, id}) => {
    const URLdelete = `http://matthieuskrzypczak-server.eddi.cloud:8080/api/user/${id}`;

    // const [data, setData] = useState([])

    // useEffect(() => {
    //   const fetchData = async () =>{
    //     try {
    //       const {data: response} = await axios.delete(URLdelete);
    //       setData(response);
    //     } catch (error) {
    //       console.error(error.message);
    //     }
    //   }
    //   fetchData();
    // }, []);
    return( 
        <tr className='user_table'>
            <td>{name}</td>
            <td>{firstname}</td>
            <td>
                {role}
                <Link to="/">
                    <TfiPencil size={'2.7vh'} className='animals_container-title-table--icon'/>
                </Link>
            </td>
            <td>
                <Link to="/">
                    <IoPersonSharp size={'3vh'} className='users_container-title-table--icon' />
                </Link>
            </td>
            <td>
                <FiTrash2 
                    size={'3vh'} 
                    className='users_container-title-table--icon' 
                    onClick={() => {const confirmation = window.confirm("Etes-vous sûr de vouloir supprimer ce profil utilisateur ?")
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

User.propTypes = {
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };
    
export default User;
