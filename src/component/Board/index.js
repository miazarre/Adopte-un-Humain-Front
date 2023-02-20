import './styles.scss';

const Board = () => {
    return(
        <div className='board_container'>
            <button className='board_menu'>Profils des animaux</button>
            <button className='board_menu'>Profils des utilisateurs</button>
            <button className='board_menu'>Demandes d'adoption</button>
        </div>
    )
}

export default Board ;