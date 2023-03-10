// Imports internes
import Animal from './Animal';
import './styles.scss';

// Imports librairies
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsXCircleFill } from 'react-icons/bs';

// Déclarations pour contacter l'API
const baseUrl=process.env.REACT_APP_BASE_URL;

const Adoptions = ({isLogged}) => {

    const token = localStorage.getItem('token');
    const newToken = JSON.parse(token);

    const token = localStorage.getItem('token');
    const newToken = JSON.parse(token);

    const [animals, setAnimals] = useState([]);
    const [message, setMessage] = useState('');

// Récupération de la liste des animaux
    const fetchData = async () =>{

        try {
          const response = await axios.get(`${baseUrl}/animals`,
          { headers: { Authorization: `Bearer ${newToken}` } }
          );
          setAnimals(response.data);
        } catch (error) {
          console.error(error);
          setMessage('Il y a eu un soucis au moment de contacter le serveur.')
        }
      }

    useEffect(() => {
      fetchData();
    }, []);

    return(
        <div className='adoptions_container'>
       {isLogged
        ? <>

        <h1 className='adoptions_container-title'>Demandes d'adoptions</h1>
        <div className='adoptions_container-header'>
            <div className='adoptions_container-header--search'>
                <form className="adoptions_container-form">
                    <button>
                        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                    <input className="adoptions_container-form__input" placeholder="Rechercher un animal" required="" type="text" />
                    <button className="adoptions_container-form__reset" type="reset">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </form>
            </div>
            <Link to="/board">
                <p className='adoptions_container--linkToBoard'><span>Retour au Tableau de Bord</span></p>
            </Link>
        </div>
        {message != '' &&
                    <p className='adoptions_container--message'>{message} <BsXCircleFill onClick={e => setMessage('')}/></p>
                }
        <div className="adoptions_container--animals">

                {
                    animals.map((animal) => {
                        return(
                            <Animal
                            key={animal.id}
                            animal={animal} 
                            setMessage={setMessage}
                            />
                        )
                    })
                }
        </div>
        </>
        : <p className='connexion-message'> Il faut te connecter pour voir cette page. <Link to='/login'><p className='connexion-message--boutton'><span>Connexion</span></p></Link></p>
        
        }

    </div>
    )
}

export default Adoptions;