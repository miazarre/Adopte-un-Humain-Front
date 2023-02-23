import dragon from '../../assets/Dragon.png';
import './styles.scss';
import { Link } from 'react-router-dom';
import {HiLightBulb} from 'react-icons/hi';

const ProfilUser = ({user, isLogged}) => {
    return( 
             <div className='profil-user__container'>
                {isLogged
                ? <>
                <div className='profil-user__details'>
                    <img src={dragon}/>
                    <p className='profil-user__details--name'>{user.firstname} {user.lastname}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.address} {user.postal_code} {user.city} {user.country}</p>
                </div>
                <div className='profil-user__form'>
                    <form>
                        <p className='profil-user__form--section'>Informations personnelles</p>
                    <input className='profil-user__form--input' placeholder='Nom'/>
                    <input className='profil-user__form--input' placeholder='Prénom'/>
                    <input className='profil-user__form--input' placeholder='Téléphone' type='tel'/>
                    <p className='profil-user__form--section'>Adresse</p>
                    <input className='profil-user__form--input' placeholder='Adresse'/>
                    <input className='profil-user__form--input' placeholder='Code postal'/>
                    <input className='profil-user__form--input' placeholder='Ville'/>
                    <input className='profil-user__form--input' placeholder='Pays'/>
                    <p className='profil-user__form--section'>Sécurité</p>
                    <input className='profil-user__form--input' placeholder='E-mail' type='email'/>
                    <input className='profil-user__form--input' placeholder='Confirmation e-mail' type='email'/>
                    <input className='profil-user__form--input' placeholder='Nouveau mot de passe' type='password'/>
                    <input className='profil-user__form--input' placeholder='Confirmation' type='password'/>

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