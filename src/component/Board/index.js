import './styles.scss';

import { Link } from 'react-router-dom';
import { IoIosPaw, IoMdPeople, IoIosHeart } from "react-icons/io";
import { useState, useEffect } from 'react';

const Board = ({user, isLogged}) => {

    const [currentUser, setCurrentUser] = useState({
    })

    useEffect(()=>{
        if(!user){
            return
        }
        setCurrentUser(user)
    })
    return(
        <div className='board_container'>
            {isLogged
            ? <>
            {(currentUser.role_id === 3 || currentUser.role_id === 2) &&
            <>
                <Link to="/animals">
                    <button className='board_container_menu'><span><IoIosPaw size={'5vh'} className='board_container_menu--icon'/> Profils des animaux</span></button>
                </Link>
                {currentUser.role_id === 3 &&
                <Link to="/users">
                    <button className='board_container_menu'><span><IoMdPeople size={'5vh'} className='board_container_menu--icon'/>  Profils des utilisateurs</span></button>
                </Link>
                }
                <Link to="/adoptions">
                    <button className='board_container_menu'><span><IoIosHeart size={'5vh'} className='board_container_menu--icon'/> Demandes d'adoption</span></button>
                </Link>
                <Link to='/filtres'>
                    <button className='board_container_menu'><span><IoIosSearch size={'5vh'} className='board_container_menu--icon'/> Filtres</span></button>
                </Link>
            </>
            }
            {currentUser.role_id === '1' &&
            <p>Hep hep tu n'as pas le droit d'être là !</p>
            }
            </>

            : <p className='connexion-message'> Il faut te connecter pour voir cette page. <Link to='/login'><p className='connexion-message--boutton'><span>Connexion</span></p></Link></p>
            }
        </div>
    )
}

export default Board ;