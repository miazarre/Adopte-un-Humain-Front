import './styles.scss'
import { Link } from 'react-router-dom';

const AnimalCard = ({animal}) => {


    return(
        <div className='animal-card__card'>
            <div className='animal-card__card--gradient'>
                <div 
                style={{backgroundImage:`url(${animal.image})`}} 
                className='animal-card__card--image'
                >
                </div>
            </div>
            <p className='animal-card__card--name'>{animal.name}</p>
            <p className='animal-card__card--resume'>{animal.resume}</p>
            <p className='animal-card__card--points'>10 points communs</p>
            <Link to={`/trombinoscope/${animal.id}`} className='animal-card__card--bouton'><span>Profil</span></Link>
        </div>
    )
}

export default AnimalCard ;