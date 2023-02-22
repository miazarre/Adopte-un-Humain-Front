import './style.scss';
import { useState, Component } from 'react';
import { render } from 'react-dom';

const SigninForm = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [category, setCategory] = useState(["Licorne", "Dragon", "Dinosaure"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${lastName}\nEmail: ${email}\nCategory: ${category}`);
  };
  const Category = category.map(Category => Category
    )
    const handleCategory = (e) => console.log((category[e.target.value]))
  
    return (
      <div className="input-container">
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Nom" name="lastname" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <input type="text" placeholder="Prénom" name="firstname" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <input type="text" placeholder="E-mail" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="text" placeholder="Numéro" name="number" value={number} onChange={(event) => setNumber(event.target.value)} />
              <input type="text" placeholder="Mot de passe" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <input type="text" placeholder="Validation mot de passe" name="confirmation" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />
              <select name="categories" id="category-select" onChange={e => handleCategory(e)}>
                    <option value="">--Veuillez choisir une catégorie--</option>
                    {category.map((address, key) => <option value={key}>{address}</option>)}
              </select>
                <button type="submit" value="Submit">
                Valider
                </button>
            </form>
        </div>
          )
        }
        
export default SigninForm