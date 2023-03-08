// Imports internes
import './styles.scss';

// Imports externes
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {RxCrossCircled} from 'react-icons/rx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Base url
const baseUrl=process.env.REACT_APP_BASE_URL;

const LoginForm = ({setUser, setIsLogged}) => {

  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// Fonction qui gère la connexion et stock le token dans le localStorage
  const handleSubmit = async () => {
      try{
          const response = await axios.post(`${baseUrl}/login`, 
            {
              "email" : `${email}`,
              "password" : `${password}`
          })

          localStorage.setItem('token', JSON.stringify(response.data.token));
          let newUser = response.data ;
          delete newUser.token ;
          setUser(newUser)
          setIsLogged(true)

          navigate('/trombinoscope')

      }catch(error){
        console.log(error)
        setLogin('Vos identifiants ne conviennent pas')
      }
    }


    return (
      <div className="input-container">
        <h1 className='login'>Connexion</h1>
        <div className='form'>
           {login !== '' &&
            <p className='input-container--message'>{login} <RxCrossCircled className='input-container--message-cross' size='20px' onClick={e => setLogin('')}/></p>
           }
            <form>
               <input className="input-container--input" type="text" name="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
               <input className="input-container--input" type="password" name="password" placeholder="mot de passe" value={password} onChange={(event) => setPassword(event.target.value)} />
                <p className='input-container--boutton' onClick={handleSubmit}>
                <span >Valider</span>
                </p>
            </form>
            <p>Pas encore de compte ? Inscrivez-vous <Link className='link' to='/signin'>par ici</Link></p>
            </div>
      </div>
          )
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setIsLogged: PropTypes.func.isRequired
};
        
export default LoginForm;