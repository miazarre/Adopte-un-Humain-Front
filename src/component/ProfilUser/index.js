import dragon from '../../assets/Dragon.png';
import './styles.scss';
import { Link } from 'react-router-dom';
import {HiLightBulb} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {RxCrossCircled} from 'react-icons/rx';

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const ProfilUser = ({user, isLogged}) => {

    const [profilUSer, setProfilUser] = useState(user);
    const [errorMessage, setErrorMessage] = useState('') ;

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

// On check si les champs pairés (mail/confirm et pass/confirm) correspondent bien
// Si oui, on passe a la suite
// Si non, on setUp un message d'erreur et on termine a fonction
        if(form.new_mail != form.mail_confirm){
            setErrorMessage('L\'e-mail et sa confirmation ne correspondent pas.')
            return
        }
        if(form.new_password != form.confirm_new_password){
            setErrorMessage('Le nouveau mot de passe et sa confirmation ne correspondent pas.')
            return
        }

        let firstNumber = form.phone.charAt(0);

        if(form.phone != '' && form.phone.length != 10 || firstNumber !== 0){
            setErrorMessage('Veuillez entrer un numéro de téléphone valide.')
            return
        }
// On fait un objet à partir des champs du formulaire qui ne sont pas vides
        const modifiedFields = Object.entries(form)
            .filter(([_, value]) => value !== '')
            .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
            }, {});

// Si l'objet nouvellement créé contient le mail ou le mot de passe
// On setup pour que ça corresponde à ce que l'api attend
// On supprime les champs qu'on ne doit pas leur envoyer
        if(modifiedFields.hasOwnProperty("new_mail")) {
            modifiedFields.email = modifiedFields.new_mail ;
            delete modifiedFields.new_mail;
            delete modifiedFields.mail_confirm;
        }
        if(modifiedFields.hasOwnProperty("new_password")) {
            modifiedFields.password = modifiedFields.new_password ;
            delete modifiedFields.new_password;
            delete modifiedFields.confirm_new_password;
        }

// On récupère le token et on le parse pour qu'il soit au bon format pour l'API
        const token = localStorage.getItem('token');
        const newToken = JSON.parse(token);
// On lance le try/catch puis on contact avec axios
// On setup bien le header avec le token pour que l'authentification marche bien
        try {
            const response = await axios.patch(
                `${baseUrl}/user/${user.id}`,
                modifiedFields,
                { headers: { Authorization: `Bearer ${newToken}` } }
            );
// On modifie le user avec les données qu'on viens de modif 
// On affiche un message de confirmation
            setProfilUser(response.data);
            setErrorMessage('Votre profil à été mis à jour.')
            } catch (error) {
// Si erreur, console.log et setup d'un message
            console.log(error.response.data)
            setErrorMessage('Il y a eu un soucis avec le serveur.')
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
                        {errorMessage != '' &&
                        <p className='profil-user__form--error_message'>{errorMessage} <RxCrossCircled size='20px' onClick={e => setErrorMessage('')} className='profil-user__form--error_message--cross'/></p>
                        }
                        <p className='profil-user__form--section'>Informations personnelles</p>
                        <input className='profil-user__form--input' value={form.firstname} name='firstname' placeholder='Prénom' onChange={handleFormChange}/>
                        <input className='profil-user__form--input' value={form.lastname} name='lastname' placeholder='Nom' onChange={handleFormChange}/>
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