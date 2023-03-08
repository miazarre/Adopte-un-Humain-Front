//Imports internes
import './styles.scss';

// Imports librairies
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

// Déclarations pour contacter l'API
const baseUrl = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);

const Animal = ({animal, setMessage}) => {

    const [adoptions, setAdoptions] = useState([]);

// Fonction pour récupérer la liste de toutes les demandes d'adoptions 
// Puis la filter pour l'animal en cours
    const getAdoptions = async () => {
        try{
            const response = await axios.get(`${baseUrl}/adopts`,
            { headers: { Authorization: `Bearer ${newToken}` } });
           
            let adoptionsList = response.data
            adoptionsList = adoptionsList.filter((adoption) => adoption.animal_id == animal.id)
            setAdoptions(adoptionsList)

        }catch(error){
            console.log(error)
            setMessage('Il y a eu une erreur lors du contact avec le serveur.')
        }
    };

    useEffect(()=>{
        getAdoptions()
    }, []);

    return( 
        <Link to={`/adoptions/${animal.id}`}>
        <div className='animal-adoptions__card'>
            <div className='animal-adoptions__card--image' style={{backgroundImage:`url(${baseUrl}/images/animal/${animal.photo1})`}}>
            </div>
            <p className='animal-adoptions__card--name'>{animal.name} <span className='animal-adoptions__card--round'></span> <span className='animal-adoptions__card--adopt-count'>{adoptions.length} demande{adoptions.length===1 ? '' : 's'}</span></p>
        </div>
        </Link>
    );
};

Animal.propTypes = {
    animal: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo1: PropTypes.string,
    }).isRequired,
    setMessage: PropTypes.func.isRequired,
  };

  
export default Animal ;