// Imports internes
import './styles.scss';

// Imports librairies
import { PieChart } from 'react-minimal-pie-chart';
import { useEffect, useState } from 'react'
import {BsThreeDots, BsFillTelephoneFill, BsFillXCircleFill} from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';


// Déclarations contact API
const baseUrl=process.env.REACT_APP_BASE_URL;


const AdoptionLine = ({adoption, getAdoptions, setMessage}) => {

// Déclarations nécessaires pour la gestion d'état de la page
// User contient toutes les infos de l'utilisateur impliqué dans l'adoption
    const token = localStorage.getItem('token');
    const newToken = JSON.parse(token);

    const [user, setUser] = useState({
        firstname:'',
        id:''
    })

    const param = useParams()

    const [comment, setComment] = useState('');
    const [details, setDetails] = useState(false);
    const [matching, setMatching] = useState({
        count:'',
        pourcentage:''
    });

    const [data, setData] = useState([]);

// Récupère les données de l'utilisateur impliqué dans la demande d'adoption
    const getUser = async () => {
        try{
        const response = await axios.get(`${baseUrl}/admin/user/${adoption.user_id}`,
        { headers: { Authorization: `Bearer ${newToken}` } }
        )
        
        setUser(response.data[0])
        
        getMatching()
        }catch(error){
            setMessage('Il y a eu un problème au moment de la récupération des informations sur l\'utilisateur.')
            console.log(error)
        }
    } 

// Au chargement on récupère l'utilisateur, le commentaire lié a la demande d'adoption et le matching animal-user
    useEffect(() => {
        getUser()

        if(adoption.comment){
            setComment(adoption.comment)
        }
    }, [])


// Fonction de CRUD du commentaire lié à la demande
    const handleSaveComment = async () => {
        try{

        const response = await axios.patch(`${baseUrl}/adopt/${adoption.id}`,
        {comment:comment},
        { headers: { Authorization: `Bearer ${newToken}` } }
        )

        getAdoptions()

        }catch(error){
            setMessage('Il y a eu un problème au moment du contact avec le serveur pour changer le commentaire de l\'adoption.')
            console.log(error) 
        }
    }

// Fonction de CRUD du statut de la demande
    const handleStatusChange = async (e) => {
        try{
            const response = await axios.patch(`${baseUrl}/adopt/${adoption.id}`,
            {status:e.target.value},
            { headers: { Authorization: `Bearer ${newToken}` } }
            )
            getAdoptions()
            }catch(error){
                setMessage('Il y a eu un problème au moment du contact avec le serveur pour changer le statut de l\'adoption.')
                console.log(error)
            }
    }

// Fonction de récupération des informations liées au matching entre l'animal et l'utilisateur impliqués dans la demande
    const getMatching = async () => {
        try{
            const response = await axios.get(`${baseUrl}/user/${adoption.user_id}/matching/${param.id}`,
            { headers: { Authorization: `Bearer ${newToken}` } }
            )
            setData(response.data)
            resolveMatching(response.data)

        }catch(error){
            setMessage('Il y a eu un problème au moment du contact avec le serveur pour changer le statut de l\'adoption.')
            console.log(error)
        }
    }

// Fonction qui calcul le % de match entre les deux parties. 
    const resolveMatching = (data) => {
        let animalTagCount = 0;
        let animalFilledTagCount = 0;

        data.forEach(tag => {
            if (tag.statut.includes('animal') || tag.statut.includes('commun')) {
                animalTagCount++;
                if (tag.match_count === '1') {
                    animalFilledTagCount++;
                }
            }
        });

        let pourcentageDone = parseInt((animalFilledTagCount / animalTagCount) * 100);
        let pourcentage = parseInt(100 - pourcentageDone);

        setMatching({...matching, count: animalFilledTagCount, animalTag:animalTagCount, pourcentage:pourcentage, pourcentageDone:pourcentageDone});
    }


    return(
        <div className='adoptionLine__container'>

{/* Bloc qui correspond à la ligne qui affiche les infos de la demande avec ... */}
            {user.firstname &&
            <div className='adoptionLine__user'>
                <p>{user.firstname} {user.lastname}</p>
            </div>
            }
            <p className='adoptionLine__user--phone'><BsFillTelephoneFill/> {user.phone}</p>
            <p>{adoption.status}</p>
            <PieChart
            className='camembert'
            data={[
                { title: 'Match', value:matching.pourcentageDone, color: '#F3FFBD' },
                { title: 'No Match', value:matching.pourcentage, color: '#CC0036' },
            ]}
            radius={40}
            startAngle={-60}
            lengthAngle={-360}
            lineWidth={55}
            />
{/* Si l'utilisateur clique sur "...", ici BsThreeDots, on setup details a true ce qui va ouvrir la modale 
qui display les détaisl de la demande d'adoption*/}
            <BsThreeDots 
            size='30px'
            onClick={e=>setDetails(!details)}
            className='dots'
            />
{/* Début du bloc qui concerne la modale */}
            {details &&
            <div className='adoptionLine__bigdetails--modal'>
                <div className='adoptionLine__bigdetails'>
                    <div className='adoptionLine__bigdetails--title--container'>
                        <p className='adoptionLine__bigdetails--title'>Détails de l'adoption</p>
                        <BsFillXCircleFill size='30px' onClick={e=>setDetails(!details)} className='cross'/>
                    </div>
                    
{/* Partie gauche, utilisateur & matching */}
                    <div className='adoptionLine__bigdetails--body-part'>
                        <div className='adoptionLine__bigdetails--body-part--user'>
                            <h3>Utilisateur</h3>
                            <p className='adoptionLine__bigdetails--body-part--user-name'>{user.firstname} {user.lastname}</p>
                            <p><BsFillTelephoneFill/> {user.phone}</p>
                            <p className='adoptionLine__bigdetails--body-part--address'>{user.address} {user.postal_code} {user.city} {user.country}</p>
                            <p>{matching.count} tags en commun</p>
                            <p className='adoptionLine__bigdetails--body-part--match'>{matching.pourcentageDone}% de match !</p>
                            { matching.pourcentage != '' &&
                            <><PieChart
                            className='camembert'
                            data={[
                                { title: 'Match', value:matching.pourcentageDone, color: '#70C1B3' },
                                { title: 'No Match', value:matching.pourcentage, color: '#CC0036' },
                            ]}
                            radius={50}
                            startAngle={-60}
                            lengthAngle={-360}
                            lineWidth={35}
                            paddingAngle={5}
                            />
                            <div className='adoptionLine__bigdetails--body-part--tagslist'>
                            {data.map((tag) => {
                                if(tag.match_count == '1'){
                                    return(
                                        <span key={tag.tag_name} className='tags'>{tag.tag_name}</span>
                                    )}
                            })}
                            </div>
                            </>
                            }
                            
                        </div>
{/* Partie milieu, commentaire et statut */}
                        <div className='adoptionLine__bigdetails--body-part--comment'>
                            <h3>Partie Staff</h3>
                            <select onChange={e=> handleStatusChange(e)}>
                                <option defaultValue>Status</option>
                                <option>En cours</option>
                                <option>Adopté</option>
                                <option>Refusé</option>
                            </select>
                            <textarea value={comment} onChange={e => setComment(e.target.value)}/>
                            <p onClick={handleSaveComment}><span>Sauvegarder</span></p>
                        </div>
{/* Partie droite,  contenu de la demande d'adoption*/}
                         <div className='adoptionLine__bigdetails--body-part--adoption'>
                            <h3>Message</h3>
                            <p>{adoption.form1}</p>
                            <p>{adoption.form2}</p>
                            <p>{adoption.form3}</p>
                        </div>

                    </div>
                </div>
            </div>
            }
        </div>
    )
}

AdoptionLine.propTypes = {
    adoption: PropTypes.object.isRequired,
    getAdoptions: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired
  }

export default AdoptionLine;

