import { useParams } from "react-router-dom"
import data from '../../data/fake_animals.json'
import './styles.scss'

const AnimalProfil = () => {

    const param = useParams()
    const animal = data.filter(animal => animal.id == param.id)

    return(
    <div className='animal-profil__container'>
        <div className='animal-profil__details'>
            <div className='animal-profil__details--gradient'>
                <div 
                style={{backgroundImage:`url(${animal[0].image})`}} 
                className='animal-profil__details--image'
                >
                </div>
            </div>
            <p>10 points communs</p>
        </div>
        <div className='animal-profil__description'>
            <p className='animal-profil__details--name'>{animal[0].name}</p>
        </div>
    </div>
    )
}

export default AnimalProfil