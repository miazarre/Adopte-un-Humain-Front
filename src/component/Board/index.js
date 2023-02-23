import './styles.scss';

import { Link } from 'react-router-dom';
import { IoIosPaw, IoMdPeople, IoIosHeart } from "react-icons/io";

const Board = () => {
    return(
        <div className='board_container'>
            <Link to="/animals">
                <button className='board_container_menu'><IoIosPaw size={'7vh'} className='board_container_menu--icon'/> Profils des animaux</button>
            </Link>
            <Link to="/users">
                <button className='board_container_menu'><IoMdPeople size={'7vh'} className='board_container_menu--icon'/> Profils des utilisateurs</button>
            </Link>
            <Link to="/adoptions">
                <button className='board_container_menu'><IoIosHeart size={'7vh'} className='board_container_menu--icon'/> Demandes d'adoption</button>
            </Link>
        </div>
    )
}

export default Board ;