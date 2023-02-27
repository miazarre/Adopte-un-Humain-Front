import React from 'react';
import './styles.scss';
import Licorne from '../../assets/Licorne.png';
import Dinosaure from '../../assets/Dinosaure.png';
import Dragon from '../../assets/Dragon.png';
import { useState } from 'react';
import axios from 'axios';

const categories = [
  {name: "Licorne", image: Licorne, description:"Il/Elle aime galoper à travers les champs ouverts et les forêts, explorer de nouveaux endroits et rencontrer de nouvelles créatures. Il/elle aime aussi utiliser sa créativité pour forger de merveilleux souvenirs. Pendant notre temps libre, il/elle aime se poser, méditer et mettre en pratique ses acquis. Dans l'ensemble, il/elle est un ami et un compagnon merveilleux, toujours prêt à égayer la journée de n'importe qui avec sa nature enjouée et aimante."},
  {name: "Dinosaure", image: Dinosaure, description:"Il/elle est courageux et déterminé, toujours prêt à protéger ses proches et à défendre ses convictions. Il/elle est incroyablement loyal et affectueux envers ceux en qui il a confiance, mais il/elle peut aussi être féroce et intimidant pour les étrangers. Il/elle est aussi incroyablement curieux et adore explorer son environnement, toujours à la recherche de nouvelles images et de nouveaux sons. Il/elle aime chasser pour jouer, explorer de nouveaux territoires et faire de longues promenades dans la nature. Il/elle aime aussi passer du temps avec sa famille et ses amis, et on le trouve souvent en train de jouer avec d'autres dinosaures. Pendant son temps libre, il/elle aime se prélasser au soleil et faire de longues siestes. Dans l'ensemble, il/elle est un compagnon loyal et féroce, toujours prêt à défendre ses proches et à explorer le monde qui l'entoure."},
  {name: "Dragon", image: Dragon, description: "Il/elle est très fier et confiant, toujours avide d'aventures et de nouveaux défis. Il/elle est incroyablement intelligent et ingénieux, capable de réfléchir rapidement et de trouver des solutions créatives aux problèmes. Il/elle peut parfois être un peu têtu, mais il/elle est aussi farouchement loyal envers ceux qu'il/elle considère comme ses amis. Il/elle aime courir, jouer et amasser des trésors. Il/elle aime aussi utiliser son intelligence pour résoudre des puzzles et des énigmes, et défie souvent les autres dans des épreuves d'esprit et d'habileté. Pendant son temps libre, il/elle aime se prélasser au soleil et aiguiser ses griffes. Dans l'ensemble, il/elle est un compagnon redoutable et formidable, toujours prêt à aider ses amis ou dans une quête audacieuse."},
]

const SigninForm = () => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://matthieuskrzypczak-server.eddi.cloud:8080/api/register`, {
    lastname,
    firstname,
    email,
    password,
    phone,
    })
  }


    return (
      <div className="input-container">
        <h1 className='title'>Inscription</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Nom" name="lastname" value={lastname} onChange={(event) => setLastname(event.target.value)} />
              <input type="text" placeholder="Prénom" name="firstname" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
              <input type="text" placeholder="E-mail" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="text" placeholder="Numéro de téléphone" name="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
              <input type="password" placeholder="Mot de passe" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <input type="password" placeholder="Validation mot de passe" name="confirmation" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />


              <div className="categories">
                {categories.map(c => (
                  <div className="category" key={c.name.toLowerCase()} onClick={() => setCategory(c.name.toLowerCase())}>
                   <div className="category-image">
                    <img src={c.image} alt={c.name}/>
                    </div>
                    <div className="category-input">
                      <input type="radio" id={c.name.toLowerCase()} name="category" value={c.name.toLowerCase()} onChange={e => setCategory(e.target.value)} checked={c.name.toLowerCase() === category} />
                      <label htmlFor={c.name.toLowerCase()}>{c.name}</label>
                    </div>
                    <p>{c.description}
                    </p>
                  </div>
                ))}
              </div>

              
              <button className='validation' type="submit" value="Submit">Valider</button>
            </form>
          </div>
          )
        }
        
export default SigninForm