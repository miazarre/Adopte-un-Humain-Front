import React from 'react';
import './style.scss';
import { useState, Component } from 'react';
import { render } from 'react-dom';
import React from 'react';

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
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Nom" name="lastname" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <input type="text" placeholder="Prénom" name="firstname" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <input type="text" placeholder="E-mail" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="number" placeholder="Numéro" name="number" value={number} onChange={(event) => setNumber(event.target.value)} />
              <input type="password" placeholder="Mot de passe" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <input type="password" placeholder="Validation mot de passe" name="confirmation" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />


              <div className="categories">
                {["Licorne", "Dinosaure", "Dragon"].map(c => (
                  <div className="category" onClick={() => setCategory(c.toLowerCase())}>
                    <img src="https://media2.woopic.com/api/v1/images/2115%2Ftendances%2FArticles-Syndiques%2F90f%2F49c%2Fc730e6c3ca6855991f4ce4a032%2F7360804-bonne-nouvelle-pour-adam-driver-adam-dr-orig-5.jpg?format=1200x630&facedetect=1&quality=100" alt="Bibou" />
                    <div className="category-input">
                      <input type="radio" id={c.toLowerCase()} name="category" value={c.toLowerCase()} onChange={e => setCategory(e.target.value)} checked={c.toLowerCase() === category} />
                      <label for={c.toLowerCase()}>{c}</label>
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