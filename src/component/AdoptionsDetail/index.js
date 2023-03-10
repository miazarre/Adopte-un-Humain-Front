// Imports internes
import './styles.scss';
import AdoptionLine from './AdoptionLine';

// Imports librairies
import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { RxCrossCircled } from 'react-icons/rx';

// Déclarations contact API
const baseUrl=process.env.REACT_APP_BASE_URL;

const AdoptionsDetail = ({isLogged}) => {

    const token = localStorage.getItem('token');
    const newToken = JSON.parse(token);

    const idAnimal = useParams();
    const [animal, setAnimal] = useState({
        name:'',
        id:''
    });
    const [tags, setTags] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [message, setMessage] = useState([]);

// On récupère l'animal concerné via les params de l'url
// Puis on contact l'API pour avoir les infos sur lui
// Et la liste de ses tags
    const getAnimal = async () => {
        try{
            const response = await axios.get(`${baseUrl}/animal/${idAnimal.id}`,
            { headers: { Authorization: `Bearer ${newToken}` } })

            setAnimal(response.data)

            const responsebis = await axios.get(`${baseUrl}/animal/${idAnimal.id}/tag`,
            { headers: { Authorization: `Bearer ${newToken}` } })

            setTags(responsebis.data)

        }catch(error){
            setMessage('Il y a eu un problème avec le serveur au moment de récupérer les informations sur l\'animal.')
            console.log(error)
        }
    }

// On récupère la liste des adoptions qui concernent l'animal en question
    const getAdoptions = async () => {
        try{
            const response = await axios.get(`${baseUrl}/adopts`,
            { headers: { Authorization: `Bearer ${newToken}` } })

            let adoptionsList = response.data
            adoptionsList = adoptionsList.filter((adoption) => adoption.animal_id == idAnimal.id)
            setAdoptions(adoptionsList)

        }catch(error){
            setMessage('Il y a eu un problème avec le serveur au moment de récupérer les informations sur les adoptions.')
            console.log(error)
        }
    }

    useEffect(() => {
        getAnimal()
        getAdoptions()
        }, 
      []);

    return(
        <div className='adoptionsdetail'>
            {isLogged

            ?<>
                {message != '' &&
            <p className='adoptionsdetail--message'>{message} <RxCrossCircled onClick={e => setMessage('')}/></p>
            }
            <div className='adoptionsdetail__animal-details'>
                <p className='adoptionsdetail__animal-details--name'>{animal.name}</p>
                <div className='adoptionsdetail__image' style={{backgroundImage:`url(${baseUrl}/images/animal/${animal.photo1})`}}>
                </div>
                <div className='adoptionsdetail__tags-container'>
                {tags.map((tag) =>{
                        return(
                            <span className='adoptionsdetail__tags-container--tags'>{tag.tag_name}</span>
                        )
                    })
                }
                </div>
            </div>
            <div className='adoptionsdetail__adoptions-list--container'>
                <h2>Mes matchs:</h2>
                <div>
                    {
                        adoptions.map((adoption) => {
                            return(
                            <AdoptionLine
                            key={Math.random()}
                            adoption={adoption}
                            getAdoptions={getAdoptions}
                            setMessage={setMessage}
                            />
                            )
                            
                        })
                    }
                </div>
            </div>
            </>
            : <p className='connexion-message'> Il faut te connecter pour voir cette page. <Link to='/login'><p className='connexion-message--boutton'><span>Connexion</span></p></Link></p>
            
            }
        </div>
    )
}

export default AdoptionsDetail ;