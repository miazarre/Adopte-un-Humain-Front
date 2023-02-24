import './styles.scss';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import dinosaure from "/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Dinosaure.png";
import licorne from "/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Licorne.png";
import dragon from "/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Dragon.png";

const AddAnimal = () => {

const [category, setCategory] = useState('');
const [name, setName] = useState('');
const [birthdate, setBirthdate] = useState('');
const [needs, setNeeds] = useState('');
const [resume, setResume] = useState('');
const [description, setDescription] = useState('');
const [photo, setPhoto] = useState('');

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(`Name: ${name}`);
};

return (
  <div className="addanimal_container">
    <form onSubmit={handleSubmit}>
      <div className="addanimal_container-input">
        <Link to="/animals">
            <button className='animals_container--linkToBoard'>Retour à la liste des animaux</button>
        </Link>
        <input type="text" placeholder="Nom" name="name" value={name} onChange={(event) => setName(event.target.value)} />
        <input type="date" placeholder="Date de naissance" name="birthdate" value={birthdate} onChange={(event) => setBirthdate(event.target.value)} />      
        <div>
          <select name="pets" id="pet-select">
              <option value="">choisir un statut</option>
              <option value="adoptable">adoptable</option>
              <option value="adopt">adopté</option>
          </select>
        </div>
      </div>
      <div className="addanimal_container_photos">
        <label for="photos">Ajouter des photos :</label>
        <input className="addanimal_container_photos-addphotos" type="file" id="photos" accept=".png, .jpg, .jpeg" multiple value={photo} onSubmit={(event) => setPhoto(event.target.value)}/>
      </div>
      <div className="addanimal_container_textareas">
        <div className="addanimal_container_textareas-detail">
          <label for="needs">Besoins de l'animal :</label>
          <textarea id="needs" rows="5" cols="40" value={needs} onChange={(event) => setNeeds(event.target.value)}></textarea>
        </div>
        <div className="addanimal_container_textareas-detail">
          <label for="resume">Courte description :</label>
          <textarea id="resume" rows="5" cols="40" value={resume} onChange={(event) => setResume(event.target.value)}></textarea>
        </div>
        <div className="addanimal_container_textareas-detail">
          <label for="description">Remarques complémentaires :</label>
          <textarea id="description" rows="5" cols="40" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
        </div>
      </div>

      <div className="addanimal_container_categories">
        <div className="addanimal_container_categories_category" onClick={() => setCategory("licorne")}>
            <img src={licorne} alt="logo" />
            <div className="addanimal_container_categories_category-input">
              <input type="radio" id={"licorne"} name="category" value={"licorne"} onChange={e => setCategory(e.target.value)} checked={"licorne" === category} />
              <label htmlFor={"licorne"}>Licorne</label>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis ornare libero. Donec lacinia mollis massa, id hendrerit arcu faucibus et.
              Aliquam pretium, mi sed imperdiet maximus, lacus erat vehicula ex, vitae interdum nibh arcu a mi. 
              Cras vehicula, nunc mollis facilisis porta, ligula diam cursus felis, efficitur mollis tortor turpis in justo. In hac habitasse platea dictumst.
            </p>
          </div>
          <div className="addanimal_container_categories_category" onClick={() => setCategory("dragon")}>
            <img src={dragon} alt="logo" />
            <div className="addanimal_container_categories_category-input">
              <input type="radio" id={"dragon"} name="category" value={"dragon"} onChange={e => setCategory(e.target.value)} checked={"dragon" === category} />
              <label htmlFor={"dragon"}>Dragon</label>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis ornare libero. Donec lacinia mollis massa, id hendrerit arcu faucibus et.
              Aliquam pretium, mi sed imperdiet maximus, lacus erat vehicula ex, vitae interdum nibh arcu a mi. 
              Cras vehicula, nunc mollis facilisis porta, ligula diam cursus felis, efficitur mollis tortor turpis in justo. In hac habitasse platea dictumst.
            </p>
          </div>
          <div className="addanimal_container_categories_category" onClick={() => setCategory("dinosaure")}>
            <img src={dinosaure} alt="logo" />
            <div className="addanimal_container_categories_category-input">
              <input type="radio" id={"dinosaure"} name="category" value={"dinosaure"} onChange={e => setCategory(e.target.value)} checked={"dinosaure" === category} />
              <label htmlFor={"dinosaure"}>Dinosaure</label>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis ornare libero. Donec lacinia mollis massa, id hendrerit arcu faucibus et.
              Aliquam pretium, mi sed imperdiet maximus, lacus erat vehicula ex, vitae interdum nibh arcu a mi. 
              Cras vehicula, nunc mollis facilisis porta, ligula diam cursus felis, efficitur mollis tortor turpis in justo. In hac habitasse platea dictumst.
            </p>
          </div>
      </div>   

      <button type="submit" value="Submit">Valider</button>
      </form>
  </div>
)
}  
  
export default AddAnimal;