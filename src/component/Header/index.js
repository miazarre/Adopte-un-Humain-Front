import './styles.scss'
import { bubble as Menu } from 'react-burger-menu'
import logo from '../../assets/logo.png'

const Header = () => {

    return (
        <div className='header__container'>
            <div className='header__menu'>
                <Menu>
                    <a href='#' className='item-link'>Accueil</a>
                    <a href='#' className='item-link'>Trombinoscope</a>
                    <a href='#' className='item-link'>Préférences</a>
                    <a href='#' className='item-link'>Profil</a>

                    <div className='item-link item-link--social'>
                        Icones réseaux sociaux
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