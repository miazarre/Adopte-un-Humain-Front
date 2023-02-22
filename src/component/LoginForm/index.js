import './style.scss';
import { useState, Component } from 'react';
import { render } from 'react-dom';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}\nPassword: ${password}`);
  };
    return (
      <div className="input-container">
            <form onSubmit={handleSubmit}>
               <input type="text" name="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
               <input type="text" name="password" placeholder="mot de passe" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="submit" value="Submit">
                Valider
                </button>
            </form>
      </div>
          )
        }
        
export default LoginForm