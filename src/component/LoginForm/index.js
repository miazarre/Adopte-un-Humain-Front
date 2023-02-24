import './styles.scss';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const LoginForm = ({setUser, setIsLogged}) => {

  const navigate = useNavigate();

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    async function getConnexion() {
      const response = await axios.post(`${baseUrl}/login`, 
        {
          "email" : `${email}`,
          "password" : `${password}`
      })
// Si la réponse contiens un token (et donc est positive)
// On sauvegarde les données dans "User" qui est déclaré dans App.js
// On passe le token en localStorage
// Pour le récupérer dans les requêtes futures : const tokens = localStorage.getItem('tokens');
      if(response.data.hasOwnProperty('token')){
        setLogin(`Salut ${response.data.firstname}`);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        const newUser = {
          id:response.data.id,
          firstname:response.data.firstname,
          lastname:response.data.lastname,
          phone:response.data.phone,
          email:response.data.email,
          country:response.data.country,
          address:response.data.address,
          city:response.data.city,
          postal_code:response.data.postal_code,
          role_id:response.data.role_id
        } 
        setUser(newUser)
        setIsLogged(true)
        navigate('/trombinoscope')
      }else{
        setLogin('Il y a eu une erreur lors de la connexion.')
      }
    }
    getConnexion();
    console.log(login)
  };


    return (
      <div className="input-container">
            <p>{login}</p>
            <form onSubmit={handleSubmit}>
               <input type="text" name="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
               <input type="password" name="password" placeholder="mot de passe" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="submit" value="Submit">
                Valider
                </button>
            </form>
      </div>
          )
        }
        
export default LoginForm