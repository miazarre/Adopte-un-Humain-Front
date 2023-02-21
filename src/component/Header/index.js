import './styles.scss'
import { bubble as Menu } from 'react-burger-menu'
import logo from '../../assets/logo.png'
import { FaTiktok, FaFacebookF} from 'react-icons/fa';
import {AiOutlineTwitter} from 'react-icons/ai'

const Header = () => {
    return (
        <div className='header__container'>
            <div className='header__menu'>
                <Menu>
                    <a href='#' className='item-link item-link--text'> Accueil</a>
                    <a href='#' className='item-link item-link--text'> Trombinoscope</a>
                    <a href='#' className='item-link item-link--text'> Préférences</a>
                    <a href='#' className='item-link item-link--text'> Profil</a>

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
                <p>Connexion</p>
            </div>
        </div>
    )
}

export default Header