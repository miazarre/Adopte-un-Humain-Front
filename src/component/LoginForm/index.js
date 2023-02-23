import './style.scss';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const LoginForm = () => {

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}\nPassword: ${password}`);

    async function getUser() {
      const response = await axios.post(`${baseUrl}/login`, 
        {
          "email" : `${email}`,
          "password" : `${password}`
      }
      )
      setUser(response.data);
    }
    getUser();
    console.log(user)
  };


    return (
      <div className="input-container">
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