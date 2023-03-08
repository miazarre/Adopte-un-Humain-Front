import './styles.scss';

import { Link } from 'react-router-dom';
import { IoIosPaw, IoMdPeople, IoIosHeart } from "react-icons/io";
import { IoPricetagsOutline } from "react-icons/io5";
import { useState } from 'react';
import { useEffect } from 'react';

const Board = ({user}) => {

    const [currentUser, setCurrentUser] = useState({
    })

    useEffect(()=>{
        if(!user){
            return
        }
        setCurrentUser(user)
        console.log(currentUser)
    })
    return(
        <div className='board_container'>
            {(currentUser.role_id !== 1 && currentUser.role_id !== 2 && currentUser.role_id !== 3) &&
                <p>Il faut te connecter</p>
            }
            {(currentUser.role_id === 3 || currentUser.role_id === 2) &&
            <>
                <Link to="/animals">
                <button className='board_container_menu'><span><IoIosPaw size={'7vh'} className='board_container_menu--icon'/> Profils des animaux</span></button>
                </Link>
                <Link to="/users">
                    <button className='board_container_menu'><span><IoMdPeople size={'7vh'} className='board_container_menu--icon'/>  Profils des utilisateurs</span></button>
                </Link>
                <Link to="/adoptions">
                    <button className='board_container_menu'><span><IoIosHeart size={'7vh'} className='board_container_menu--icon'/> Demandes d'adoption</span></button>
                </Link>
                <Link to='/filtres'>
                    <button className='board_container_menu'><span><IoIosHeart size={'7vh'} className='board_container_menu--icon'/> Filtres</span></button>
                </Link>
                <Link to='/tags'>
                    <button className='board_container_menu'><span><IoPricetagsOutline size={'7vh'} className='board_container_menu--icon'/> Gestion des tags</span></button>
                </Link>
            </>
            }
            {currentUser.role_id === '1' &&
            <p>Hep hep tu n'as pas le droit d'être là !</p>
            }
        </div>
    )
}

export default Board ;