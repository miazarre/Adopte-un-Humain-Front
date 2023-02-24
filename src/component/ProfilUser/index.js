import dragon from '../../assets/Dragon.png';
import './styles.scss';
import { Link } from 'react-router-dom';
import {HiLightBulb} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const ProfilUser = ({user, isLogged}) => {

    const [profilUSer, setProfilUser] = useState(user);
// Déclaration de tous les champs de form à controler
    const [form, setForm] = useState({
        firstname:'',
        lastname:'',
        phone:'',
        address:'',
        postal_code:'',
        city:'',
        country:'',
        new_mail:'',
        mail_confirm:'',
        new_password:'',
        confirm_new_password:''
    })

// Au chargement de la page on contact l'API pour avoir els données à jour de l'utilisateur
    const settingUserOnLoad = async () => {
        const response = await axios.get(`${baseUrl}/user/${user.id}`)
        setProfilUser(response.data)
    }
// le useEffect qui déclanche le changement de données du user
    useEffect(() => {
        if(user){
            settingUserOnLoad()  
        }
    });

// Quand un champs d'input est changé
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      };

// Quand le formulaire est submit
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(user)
        const token = localStorage.getItem('token');

        const modifiedFields = Object.entries(form)
            .filter(([_, value]) => value !== '')
            .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
            }, {});

        console.log('champs modifiés :' + modifiedFields)
        console.log(modifiedFields)

            try {
                const response = await axios.patch(
                  `${baseUrl}/user/${user.id}`,
                  modifiedFields,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log('réponse du serveur :' + response.data)
                setProfilUser(response.data);
              } catch (error) {
                console.log('Oups y a eu une erreur ' + error)
            }
      }

// Composant à afficher
    return( 
             <div className='profil-user__container'>
                {isLogged
                ? <>
                <div className='profil-user__details'>
                    <img src={dragon}/>
                    <p className='profil-user__details--name'>{profilUSer.firstname} {profilUSer.lastname}</p>
                    <p>{profilUSer.email}</p>
                    <p>{profilUSer.phone}</p>
                    <p>{profilUSer.address} {profilUSer.postal_code} {profilUSer.city} {profilUSer.country}</p>
                </div>
                <div className='profil-user__form'>
                    <form onSubmit={handleSubmit}>
                        <p className='profil-user__form--section'>Informations personnelles</p>
                    <input className='profil-user__form--input' value={form.firstname} name='firstname' placeholder='Nom' onChange={handleFormChange}/>
                    <input className='profil-user__form--input' value={form.lastname} name='lastname' placeholder='Prénom' onChange={handleFormChange}/>
                    <input className='profil-user__form--input' value={form.phone} name='phone' placeholder='Téléphone' type='tel' onChange={handleFormChange}/>
                    <p className='profil-user__form--section'>Adresse</p>
                    <input className='profil-user__form--input' value={form.address} name='address' placeholder='Adresse' onChange={handleFormChange}/>
                    <input className='profil-user__form--input' value={form.postal_code} name='postal_code' placeholder='Code postal' onChange={handleFormChange}/>
                    <input className='profil-user__form--input' value={form.city} name='city' placeholder='Ville' onChange={handleFormChange}/>
                    <input className='profil-user__form--input' value={form.country} name='country' placeholder='Pays' onChange={handleFormChange}/>
                    <p className='profil-user__form--section'>Sécurité</p>
                    <input className='profil-user__form--input' value={form.new_mail} name='new_mail' placeholder='Nouvel e-mail' type='email' onChange={handleFormChange}/>
                    <input className='profil-user__form--input' value={form.mail_confirm} name='mail_confirm' placeholder='Confirmation e-mail' type='email' onChange={handleFormChange}/>
                    <input className='profil-user__form--input' value={form.new_password} name='new_password' placeholder='Nouveau mot de passe' type='password' onChange={handleFormChange}/>
                    <input className='profil-user__form--input' value={form.confirm_new_password} name='confirm_new_password' placeholder='Confirmation' type='password' onChange={handleFormChange}/>

                        <button className='profil-user__form--button'><span>Valider</span></button>
                    </form>
                    </div>
                    <div className='profil-user__tips'>
                        <HiLightBulb size={'40px'} className='profil-user__tips--light'/>
                        <p>Pour modifier vos préférences en matière de compagnon, c'est par ici : <Link to='/preferences' className='profil-user__tips--link'>Préférences</Link></p>
                    </div>
                </>
    
                : <p className='profil-user__connexion-message'> Il faut te connecter ! </p>
                    
                }
                </div>
    )
}

export default ProfilUser ;