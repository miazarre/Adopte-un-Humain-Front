import './styles.scss'
import { Link } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu'
import logo from '../../assets/logo.png'
import { FaTiktok, FaFacebookF} from 'react-icons/fa';
import {AiOutlineTwitter} from 'react-icons/ai'
import React from 'react';

const Header = ({isLogged, user, setUser, setIsLogged}) => {

    const handleDeconnexion = () => {
        setUser('');
        setIsLogged(false);
    }

    return (
        <div className='header__container'>
            <div className='header__menu'>
                <Menu>
                    <p className='item-link--title'>J'adopte un humain !</p>
                    <a href='#' className='item-link item-link--text'> Accueil</a>
                    {isLogged 
                    ?<>
                        <Link to='/trombinoscope' className='bm-item item-link item-link--text'> Trombinoscope</Link>
                        <Link to='/preferences' className='bm-item item-link item-link--text'> Préférences</Link>
                        <Link to='/profil' className='bm-item item-link item-link--text'> Profil</Link>
                        <button onClick={handleDeconnexion} className='item-link--deco'><span>Déconnexion</span></button>
                    </>
                    :   <Link to='/login' className='bm-item item-link item-link--text'>Connexion</Link>
                    }
                    <div className='item-link item-link--social'>
                        <FaTiktok size={'30px'} className='footer__container--icons-div--icon'/>
                        <AiOutlineTwitter size={'30px'} className='footer__container--icons-div--icon'/>
                        <FaFacebookF size={'30px'} className='footer__container--icons-div--icon'/>
                    </div>
                </Menu>
            </div>
            <div className='header__logo'>
                <img src={logo} alt='animal paw and rainbow background'/>
            </div>
            <div className='header__right-button'>
                {isLogged
                    ?<>
                        <p>Bienvenue {user.firstname} !</p>
                    </>   
                    
                    
                    : <>
                        <div className='signin'>
                        <Link to='/signin'>
                        Inscription
                        </Link>
                        </div>
                        <div className='login'>
                        <Link to='/login'>
                        Connexion
                        </Link>
                        </div>
                      </>
                }
            </div>
        </div>
    )
}

export default Header