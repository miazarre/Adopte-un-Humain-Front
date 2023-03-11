import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {RxCrossCircled} from 'react-icons/rx';

import './styles.scss';
import { optionsAge, optionsActivité, optionsBudget, optionsCaracter, optionsCohabitation, optionsHabitat, optionsJardin, optionsKids, optionsSexe } from '../../../data/options_select';
import customStyles from './custom_styles';

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
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');

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

    useEffect(() => {
        const fetchData = async () =>{
          try {
            const token = localStorage.getItem('token');
            const newToken = JSON.parse(token);
            const {data: response} = await axios.get(`${baseUrl}/animal/${id}`,
            { headers: { Authorization: `Bearer ${newToken}` } });
            setData(response);
            setName(response.name);
            setResume(response.resume);
            setDescription(response.description);
            setNeeds(response.needs);
            setPhoto1(response.photo1);
            setPhoto2(response.photo2);
            setPhoto3(response.photo3);
            setPhoto4(response.photo4);
            const newBirthdate = dayjs(response.birthdate).format('YYYY-MM-DD');
            setBirthdate(newBirthdate);
          } catch (error) {
            console.error(error.message);
          }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBirthdate = dayjs(birthdate).format('YYYY-MM-DD');
        console.log(newBirthdate);

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

    // Contact de l'API pour récupérer les tags liés a l'animal sélectionné
    const settingPref = async () => {
      try{
              const responseTags = await axios.get(`${baseUrl}/animal/${id}/tag`,
          { headers: { Authorization: `Bearer ${newToken}` }}
          )
          setTags(responseTags.data)

      }catch(error){
          setMessage('Il y a eu un soucis au moment de récupérer vos données auprès du serveur.')
          console.log(error)
      }
      
  }
// Appel au chargement de la page de la fonction pour setup les tags
  useEffect(() => {
      settingPref()
  }, [])

// Au changement sur un Select on appelle la fonction qui contact l'API pour ajouter un tag
const handleChange = async (selectedOption) => {
  addingTag(selectedOption)
  };

// On récupère l'id du tag selectionné via l'API
  const getTagId = async (selectedOption) => {

      try{
      const response = await axios.get(`${baseUrl}/tags`,
      { headers: { Authorization: `Bearer ${newToken}` }}
      )
      let foundTag = response.data.filter((tag) => tag.name.toLowerCase() === selectedOption.value.toLowerCase())
      return foundTag ;
      }catch(error){
          console.log(error)
          setMessage('Il y a eu un problème au moment de récupérer la liste des tags.')
      }
  }

// Au changement sur un Select multi, on appelle la fonction qui contact l'API pour chaque champs séléctionné
const handleChangeMulti = (selectedOption) => {
  selectedOption.forEach(element => {
      addingTag(element)
  });
}
// Fonction qui appelle l'API pour ajouter une liaison tag-animal
const addingTag = async (selectedOption) => {
  try{
      const tag = await getTagId(selectedOption);
      const existingTag = tags.find((tag) => tag.tag_name.toLowerCase() === selectedOption.value.toLowerCase());
      if (existingTag) {
          setMessage(`Vous avez déjà choisi '${selectedOption.value}' comme option.`)
          return;
      }
      const response = await axios.post(`${baseUrl}/animal/${id}/tag`,
      {tag_id:tag[0].id},
      { headers: { Authorization: `Bearer ${newToken}` }}
      )
      settingPref()
      setMessage(`Vous avez bien ajouté ${tag[0].name} à vos préférences.`)

  }catch(error){
     setMessage('Il y a eu une erreur.')
     console.log(error)
  }
}
// Fonction qui appelle l'API pour supprimer la liaison tag-animal
  const deletingTag = async (tagId, name) => {
      console.log('delete' + tagId)
      try{
          const response = await axios.delete(`${baseUrl}/animal/${id}/tag/${tagId}`,
          { headers: { Authorization: `Bearer ${newToken}` }}
          )
          settingPref()
          setMessage(`Vous avez bien supprimé ${name} de vos préférences.`)
      }catch(error){
          console.log(error)
          setMessage('Il y a eu une erreur.')        }
  }

    return( 
      <>
      <Link to="/board">
          <button className='adoptions_container--linkToBoard'>Retour au Tableau de Bord</button>
      </Link>
       <div className="addAnimal-container">
          {isLogged
          ?<><form>
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
              : <p className='connexion-message'> Il faut te connecter pour voir cette page. <Link to='/login'><p className='connexion-message--boutton'><span>Connexion</span></p></Link></p>
  
              }
      </div>
      </>}
    
    <div className='preference__page-container'>
        {isLogged
        ?<>
                    <div className='preference__actual-profil'>
                        <h1>Tags liés à l'animal</h1>
                        <p className='preference__actual-profil--title'>Tags obligatoires</p>
                        <div className='preference__actual-profil--tags'>
                            {tags.map((tag) =>{
                                if(tag.priority === true){
                                    return(
                                    <span key={tag.tag_id}>{tag.tag_name} <RxCrossCircled onClick={e=>deletingTag(tag.tag_id, tag.tag_name)} className='cross'/></span>
                                )}
                                
                                })
                            }
                        </div>
                        <p className='preference__actual-profil--title'>Tags optionnels</p>
                        <div className='preference__actual-profil--tags'>
                        {tags.map((tag) =>{
                                if(tag.priority === false){
                                    return(
                                    <span key={tag.tag_id}>{tag.tag_name} <RxCrossCircled onClick={e=>deletingTag(tag.tag_id, tag.tag_name)} className='cross'/></span>
                                )}
                                
                                })
                        }
                        </div>
                    </div>
                    <form className='preference__form-container'>
                        <h2>Tags obligatoires</h2>
                        {message !== '' &&
                        <p className='preference__message'>{message} <RxCrossCircled onClick={e => setMessage('')}/></p>
                        }
                        <div className='preference__form-container--formdiv'>
                            <Select options={optionsHabitat} placeholder='Habitat' className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsJardin} placeholder='Jardin' className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsKids} placeholder='Avez-vous des enfants ?' className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsBudget} placeholder='Votre budget est plutôt...' className='preference__form-container--select' styles={customStyles} onChange={handleChange}/>
                            <Select options={optionsCohabitation} isMulti placeholder='Vous avez déjà...' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                        </div> 
                        <h2>Tags optionnels</h2>
                        <div className='preference__form-container--formdiv'>
                            <Select options={optionsAge} isMulti name='age' placeholder='Age' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                            <Select options={optionsCaracter} isMulti placeholder='Caractère' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                            <Select options={optionsSexe} isMulti placeholder='Sexe' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                            <Select options={optionsActivité} isMulti placeholder='Activité' className='preference__form-container--select' styles={customStyles} onChange={handleChangeMulti}/>
                        </div>
                        
                    </form>
                    </>
            : <p className='profil-user__connexion-message'> Il faut te connecter ! </p>
                    
            }
        </div>

PatchAnimal.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default PatchAnimal;