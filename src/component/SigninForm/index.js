import React from 'react';
import './styles.scss';
import Licorne from '../../assets/Licorne.png';
import Dinosaure from '../../assets/Dinosaure.png';
import Dragon from '../../assets/Dragon.png';
import { useState, Component } from 'react';
import { render } from 'react-dom';

const categories = [
  {name: "Licorne", image: Licorne},
  {name: "Dinosaure", image: Dinosaure},
  {name: "Dragon", image: Dragon},
]

const SigninForm = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${lastName}\nEmail: ${email}\nCategory: ${category}`);
  };


    return (
      <div className="input-container">
        <h1 className='title'>Inscription</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Nom" name="lastname" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <input type="text" placeholder="Prénom" name="firstname" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <input type="text" placeholder="E-mail" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="number" placeholder="Numéro" name="number" value={number} onChange={(event) => setNumber(event.target.value)} />
              <input type="password" placeholder="Mot de passe" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <input type="password" placeholder="Validation mot de passe" name="confirmation" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />


              <div className="categories">
                {categories.map(c => (
                  <div className="category" onClick={() => setCategory(c.name.toLowerCase())}>
                   <div className="category-image">
                    <img src={c.image} alt={c.name}/>
                    </div>
                    <div className="category-input">
                      <input type="radio" id={c.name.toLowerCase()} name="category" value={c.name.toLowerCase()} onChange={e => setCategory(e.target.value)} checked={c.name.toLowerCase() === category} />
                      <label for={c.name.toLowerCase()}>{c.name}</label>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis ornare libero. Donec lacinia mollis massa, id hendrerit arcu faucibus et.
                      Aliquam pretium, mi sed imperdiet maximus, lacus erat vehicula ex, vitae interdum nibh arcu a mi. 
                      Cras vehicula, nunc mollis facilisis porta, ligula diam cursus felis, efficitur mollis tortor turpis in justo. In hac habitasse platea dictumst.
                    </p>
                  </div>
                ))}
              </div>

              
              <button type="submit" value="Submit">Valider</button>
            </form>
          </div>
          )
        }
        
export default SigninForm