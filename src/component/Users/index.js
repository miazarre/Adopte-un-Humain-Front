// Imports internes
import './styles.scss';
import User from './User';

// Imports externes
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { IoPersonAddSharp } from "react-icons/io5";


// Base url
const baseUrl=process.env.REACT_APP_BASE_URL

const Users = ({isLogged, user}) => {
    
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);
    console.log(searchText);

    useEffect(() => {
      const fetchData = async () =>{
        const token = localStorage.getItem('token');
        const newToken = JSON.parse(token);
        try {
          const {data: response} = await axios.get(`${baseUrl}/users`,
          { headers: { Authorization: `Bearer ${newToken}` } });
          setData(response);
        } catch (error) {
          console.error(error.message);
        }
      }
      fetchData();
    }, []);

    useEffect(() => {
        if (searchText.length) {
          const filteredUsers = data.filter((user) => {
            return (user.name).toLowerCase().includes(searchText.toLowerCase());
          });
          setFilteredUser(filteredUsers);
        } else {
          setFilteredUser([]);
        }
      }, [searchText, data]);

    return(
        <div className='users_container'>
           {isLogged
           ? <>
            {(user.role_id === 3 || user.role_id === 2) &&
            <>
           <h1 className='users_container-title'>Liste des membres du refuge</h1>
            <div className='users_container-header'>
                <div className='users_container-header--search'>
                    <form className="users_container-form">
                        <button>
                            <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <input className="users_container-form__input" placeholder="Rechercher un membre" required="" type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
                        <button className="users_container-form__reset" type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </form>
                    <Link to="/signin">
                        <IoPersonAddSharp size={'4vh'} className='users_container-icon' />
                    </Link>
                </div>
                    <Link to="/board">
                        <button className='users_container--linkToBoard'>Retour au Tableau de Bord</button>
                    </Link>            
            </div>
            <table className='users_container-title-table'>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Rôle</th>
                    {/* <th>Profil</th> */}
                    <th className='users_container-title-table--icon'>Supprimer</th>
                </tr>
                {
                filteredUser.length ?
                filteredUser.map((user) => 
                <User 
                    key={user.id}
                    {...user}
                />
                ) :
                data.map((user) => 
                <User 
                    key={user.id}
                    {...user}
                />
                )
                }
            </table>
            </>
            }
            {user.role_id === 1 &&
            <p>Hep hep tu n'as pas le droit d'être là !</p>
            }
            </>
            : <p className='connexion-message'> Il faut te connecter pour voir cette page. <Link to='/login'><p className='connexion-message--boutton'><span>Connexion</span></p></Link></p>

            }
        </div>
    )
}

export default Users ;
