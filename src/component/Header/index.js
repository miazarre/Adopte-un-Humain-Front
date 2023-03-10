// Imports internes
import './styles.scss';
import logo from '../../assets/logo.png';


// Imports externes
import { Link, useNavigate } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu';
import { FaTiktok, FaFacebookF} from 'react-icons/fa';
import {AiOutlineTwitter} from 'react-icons/ai';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({isLogged, user, setUser, setIsLogged}) => {
    const navigate = useNavigate();

    const handleDeconnexion = () => {
        localStorage.setItem('token', JSON.stringify(''));
        setUser('');
        setIsLogged(false);
        navigate('/login')
    };

    return (
        <div className='header__container'>
            <div className='header__menu'>
                <Menu>
                    <p className='item-link--title'>J'adopte un humain</p>
                    <Link to='/' className='item-link item-link--text'> Accueil</Link>
                    {isLogged 
                    ?<>
                        <Link to='/trombinoscope' className='bm-item item-link item-link--text'> Trombinoscope</Link>
                        <Link to='/preferences' className='bm-item item-link item-link--text'> Préférences</Link>
                        <Link to='/profil' className='bm-item item-link item-link--text'> Profil</Link>
                        <Link to='/favorites' className='bm-item item-link item-link--text'>Coups de coeur</Link>
                        {user.role_id == 3 &&
                            <Link to='/board' className='bm-item item-link item-link--text'> Tableau de Bord</Link>
                        }
                        {user.role_id == 2 &&
                            <Link to='/board' className='bm-item item-link item-link--text'> Tableau de Bord</Link>
                        }
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
            <Link to='/' className='title'><img className='header__logo' src={logo}/></Link>
            <div className='header__right-button'>
                {isLogged
                    ?<>
                        <p>Bienvenue {user.firstname} !</p>
                    </>   
                    
                    : <>
                        <div className='header__right-button__login'>
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

Header.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired,
    setIsLogged: PropTypes.func.isRequired
};

export default Header;