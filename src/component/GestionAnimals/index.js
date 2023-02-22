import './styles.scss';
import { Link } from 'react-router-dom';

const GestionAnimals = () => {
    return(
        <div className='animals_container'>
            <h1 className='animals_container-title'>Demandes d'adoption</h1>
            <div className='animals_container-header'>
                <div className='animals_container-header--search'>
                    <form className="animals_container-form">
                        <button>
                            <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <input className="animals_container-form__input" placeholder="Rechercher un animal" required="" type="text" />
                        <button className="animals_container-form__reset" type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </form>
                </div>
                <Link to="/board">
                    <button className='gestionanimals_container--linkToBoard'>Retour au Tableau de Bord</button>
                </Link>
            </div>
        </div>
    )
}

export default GestionAnimals;