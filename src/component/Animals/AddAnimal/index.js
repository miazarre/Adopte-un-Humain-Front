import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import Licorne from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Licorne.png';
import Dinosaure from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Dinosaure.png';
import Dragon from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Dragon.png';

const AddAnimal = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [resume, setResume] = useState('');
    const [description, setDescription] = useState('');
    const [needs, setNeeds] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Name: ${name}`);
    };

    const categories = [
        {name: "Licorne", image: Licorne},
        {name: "Dinosaure", image: Dinosaure},
        {name: "Dragon", image: Dragon},
    ]

    return( 
     <div className="input-container">
        <Link to="/board">
            <button className='adoptions_container--linkToBoard'>Retour au Tableau de Bord</button>
        </Link>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nom" name="name" value={name} onChange={(event) => setName(event.target.value)} />
            <label for="date">Date de naissance :</label>
            <input type="date" id="date" name="date" />
            <div>
                <label for="photos">Ajouter des photos :</label>
                <input type="file"
                    id="photos" name="photos"
                    accept="image/png, image/jpeg" multiple>
                </input>
            </div>
            <div>
                <div>
                    <label for="resume">Résumé :</label>
                    <textarea id="resume" name="resume" rows="5" cols="40" value={resume} onChange={(event) => setResume(event.target.value)}></textarea>
                </div>
                <div>
                    <label for="description">Description :</label>
                    <textarea id="description" name="description" rows="5" cols="40" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div>      
                    <label for="needs">Besoins de l'animal :</label>
                    <textarea id="needs" name="needs" rows="5" cols="40" value={needs} onChange={(event) => setNeeds(event.target.value)}></textarea>
                </div>   
            </div>
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

export default AddAnimal;