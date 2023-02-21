import './styles.scss';

import { IoIosPaw, IoMdPeople, IoIosHeart } from "react-icons/io";

const Board = () => {
    return(
        <div className='board_container'>
            <button className='board_container_menu'><IoIosPaw size={'7vh'} className='board_container_menu--icon'/> Profils des animaux</button>
            <button className='board_container_menu'><IoMdPeople size={'7vh'} className='board_container_menu--icon'/> Profils des utilisateurs</button>
            <button className='board_container_menu'><IoIosHeart size={'7vh'} className='board_container_menu--icon'/> Demandes d'adoption</button>
        </div>
    )
}

export default Board ;