import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles.scss';
const dayjs = require('dayjs')
// import Licorne from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Licorne.png';
// import Dinosaure from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Dinosaure.png';
// import Dragon from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Dragon.png';

const AddAnimal = () => {
    // const [category, setCategory] = useState('');
    // const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [resume, setResume] = useState('');
    const [description, setDescription] = useState('');
    const [needs, setNeeds] = useState('');
    const [photos, setPhotos] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const newBirthdate = dayjs(birthdate).format('YYYY-MM-DD');
    console.log(newBirthdate);

    const token = localStorage.getItem('token');
    const newToken = JSON.parse(token);

    const handleSubmit = (e) => {
        e.preventDefault();
        addAnimal(name, resume, description, needs, photos, newBirthdate);
    };
    
    const addAnimal = async (name, resume, description, needs, photos, newBirthdate) => {
        console.log(name, resume, description, needs, photos, newBirthdate)
        try {     
            const response = await axios.post(`http://matthieuskrzypczak-server.eddi.cloud:8080/api/animal`, { 
                name: name,
                resume: resume,
                description: description,
                needs: needs,
                photo1: photos,
                birthdate: newBirthdate,
            }, { headers: {
                Authorization : `Bearer ${newToken}`
                }}
            )
            console.log(response.data)}
            catch(error) {
                console.error(error)
        }
    }

    console.log(addAnimal);
   
    // const categories = [
    //     {name: "Licorne", image: Licorne},
    //     {name: "Dinosaure", image: Dinosaure},
    //     {name: "Dragon", image: Dragon},
    // ]

    return( 
    <>
    <Link to="/board">
        <button className='adoptions_container--linkToBoard'>Retour au Tableau de Bord</button>
    </Link>
     <div className="addAnimal-container">
        <form>
            <div className="addAnimal-container-informations">
                <div>
                <input type="text" placeholder="Nom" name="name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                <label id="date">Date de naissance :</label>
                <input 
                    type="date"  
                    name="date" 
                    for="date" 
                    className="informations-date" 
                    value={birthdate} 
                    onChange={(event) => setBirthdate(event.target.value)}/>
                </div>
                <div>
                <label id="photos" >Ajouter des photos :</label>
                <input 
                    className="input-label" 
                    for="photos" 
                    value={photos} 
                    onChange={(event) => setPhotos(event.target.value)}
                    type="file"
                    name="photos"
                    accept="image/png, image/jpeg" multiple>
                </input>
                </div>
            </div>
            <div className='textareas'>
                <div>
                    <label for="resume" className='textareas-label'>Résumé :</label>
                    <textarea id="resume" name="resume" rows="6" cols="45" value={resume} onChange={(event) => setResume(event.target.value)}></textarea>
                </div>
                <div>
                    <label for="description" className='textareas-label'>Description :</label>
                    <textarea id="description" rows="6" cols="45" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                    <textarea id="description" rows="6" cols="45" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div>      
                    <label for="needs" className='textareas-label'>Besoins de l'animal :</label>
                    <textarea id="needs" name="needs" rows="6" cols="45" value={needs} onChange={(event) => setNeeds(event.target.value)}></textarea>
                </div>   
            </div>
            {/* <div className="categories">
            {/* <div className="categories">
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
                </div> */}
            <button onClick={handleSubmit}>Valider</button>
            </form>
    </div>
    </>
    )
}
export default AddAnimal;