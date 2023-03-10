import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import './styles.scss';
const dayjs = require('dayjs')
// import Licorne from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Licorne.png';
// import Dinosaure from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Dinosaure.png';
// import Dragon from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Dragon.png';
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);
const baseUrl=process.env.REACT_APP_BASE_URL;

const PatchAnimal = ({isLogged, user}) => {
    // const [category, setCategory] = useState('');
    // const [category, setCategory] = useState('');
    const [data, setData] = useState('');
    const [name, setName] = useState('');
    const [resume, setResume] = useState('');
    const [description, setDescription] = useState('');
    const [needs, setNeeds] = useState('');
    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [photo4, setPhoto4] = useState('');
    const [birthdate, setBirthdate] = useState('');

   

    const newBirthdate = dayjs(birthdate).format('YYYY-MM-DD');
    console.log(newBirthdate);

    useEffect(() => {
        const fetchData = async () =>{
          try {
            const token = localStorage.getItem('token');
            const newToken = JSON.parse(token);
            const {data: response} = await axios.get(`${baseUrl}/animal/${id}`,
            { headers: { Authorization: `Bearer ${newToken}` } });
            setData(response);
          } catch (error) {
            console.error(error.message);
          }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {     
            const formData = new FormData();
            formData.append('name', name);
            formData.append('resume', resume);
            formData.append('description', description);
            formData.append('needs', needs);
            formData.append('birthdate', newBirthdate);
            formData.append('photo1', photo1);
            formData.append('photo2', photo2);
            formData.append('photo3', photo3);
            formData.append('photo4', photo4);
            
            const response = await axios.patch(`${baseUrl}/animal/${id}`, 
            formData,
            { 
              headers: {
                Authorization : `Bearer ${newToken}`
              },
            }
          );
            console.log(response.data)}
            catch(error) {
                console.error(error)
        }
    };
       
    // const categories = [
    //     {name: "Licorne", image: Licorne},
    //     {name: "Dinosaure", image: Dinosaure},
    //     {name: "Dragon", image: Dragon},
    // ]

    const { id } = useParams();

    return( 
    <>
    <Link to="/board">
        <button className='adoptions_container--linkToBoard'>Retour au Tableau de Bord</button>
    </Link>
     <div className="addAnimal-container">
        {isLogged
        ?<>
          {(user.role_id === 3 || user.role_id === 2) &&
            <>
            <form>
            <div className="addAnimal-container-informations">
                <div>
                <input type="text" placeholder={data.name} name="name" value={name} onChange={(event) => setName(event.target.value)} />
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
                    onChange={(event) => setPhoto1(event.target.files[0])}
                    type="file"
                    name="photos"
                    accept="image/png, image/jpeg" >
                </input>
                <input 
                    className="input-label" 
                    for="photos" 
                    type="file"
                    onChange={(event) => setPhoto2(event.target.files[0])}
                    name="photos"
                    accept="image/png, image/jpeg" >
                </input>
                <input 
                    className="input-label" 
                    for="photos"
                    onChange={(event) => setPhoto3(event.target.files[0])}
                    type="file"
                    name="photos"
                    accept="image/png, image/jpeg" >
                </input>
                <input 
                    className="input-label" 
                    for="photos"
                    onChange={(event) => setPhoto4(event.target.files[0])}
                    type="file"
                    name="photos"
                    accept="image/png, image/jpeg" >
                </input>
                </div>
            </div>
            <div className='textareas'>
                <div>
                    <label for="resume" className='textareas-label'>Résumé :</label>
                    <textarea id="resume" name="resume" rows="6" cols="45" placeholder={data.resume} value={resume} onChange={(event) => setResume(event.target.value)}></textarea>
                </div>
                <div>
                    <label for="description" className='textareas-label'>Description :</label>
                    <textarea id="description" rows="6" cols="45" placeholder={data.description} value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                <div>      
                    <label for="needs" className='textareas-label'>Besoins de l'animal :</label>
                    <textarea id="needs" name="needs" rows="6" cols="45" placeholder={data.needs} value={needs} onChange={(event) => setNeeds(event.target.value)}></textarea>
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
            </>
            }
            {user.role_id === 1 &&
              <p>Hep hep tu n'as pas le droit d'être là !</p>
            }
            </>
            : <p className='connexion-message'> Il faut te connecter pour voir cette page. <Link to='/login'><p className='connexion-message--boutton'><span>Connexion</span></p></Link></p>

            }
    </div>
    </>
    )
}
export default PatchAnimal;