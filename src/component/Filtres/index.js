import { useEffect, useState } from 'react';
import './styles.scss'
import React from 'react';
import axios from 'axios';

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"


const Filtres = () => {

   const [tags, setTags] = useState([]);
   const [form, setForm] = useState({
      new_tag_name:'',
      eliminatoire:false,
      tagToDelete:'',
   })

   useEffect(() => {
      getTags()
      
   }, [])

   const [tagToDelete, setTagToDelete] = useState('');

   const handleTagSelect = (event) => {
      setTagToDelete(event.target.value);
   };

   const getTags = async () => {
      const token = localStorage.getItem('token');
      const newToken = JSON.parse(token);
      const response = await axios.get(`${baseUrl}/tags`,
      { headers: { Authorization: `Bearer ${newToken}` } }
      ) ;
      setTags(response.data);
      console.log(response.data)
   }

   const handleChange = (event) => {
      const { name, value } = event.target;
      setForm({
          ...form,
          [name]: value
      });
  };

  const handleDeleteTag = async () => {
   const token = localStorage.getItem('token');
   const newToken = JSON.parse(token);
 
   try {
     const response = await axios.delete(
       `${baseUrl}/tag/${tagToDelete}`,
       { headers: { Authorization: `Bearer ${newToken}` } }
     );
 
     console.log(response.data);
     setTagToDelete('');
     getTags();
   } catch (error) {
      console.log(error)
   }
  }

  const handleAddTag = async () => {
   const token = localStorage.getItem('token');
   const newToken = JSON.parse(token);

   const newTag={
      name:form.new_tag_name,
      priority:form.eliminatoire
   }
      try {
       const response = await axios.post(
           `${baseUrl}/tag`,
           newTag,
           { headers: { Authorization: `Bearer ${newToken}` } }
       );

       console.log(response.data)
      }catch(error){

      }
   } 

 return(
    <div className='tags-page__container'>
    <div className='tags-page__list'>
      <h1>Gestion des filtres :</h1>
      <div className='tags-page__CRUD--container'>
         <div className='tags-page__left-part'>
            <div className='tags-page__left-part--add'>
               <h2>Ajouter un tag</h2>
               <div className='tags-page__left-part--add--div'>
                  <input className='tags-page__left-part--add--name' placeholder='Nom' value={form.new_tag_name} name='new_tag_name' onChange={handleChange}/>
                  <div className='tags-page__left-part--add--toggle'>
                     <p>Eliminatoire : </p>
                     <label className="tags-page__left-part--add--toggle-button">
                        <input type="checkbox" className="tags-page__left-part--add--toggle-button" checked={form.eliminatoire} onChange={(event) => setForm({...form, eliminatoire: event.target.checked})}/>
                        <span className="tags-page__left-part--add--slider"></span>
                     </label>
                  </div>
               </div>
               <p className='tags-page__left-part--add--validate' onClick={handleAddTag}>Ajouter</p>
            </div>
            <div className='tags-page__left-part--remove'>
               <h2>Supprimer un tag</h2>
               <div className='tags-page__left-part--remove--div'>
                  <select value={tagToDelete} onChange={handleTagSelect}>
                     <option value="">Sélectionnez un tag à supprimer</option>
                     {tags.map((tag) => (
                     <option key={tag.id} value={tag.id}>{tag.name}</option>
                     ))}
                  </select>
               </div>
               <p className='tags-page__left-part--remove--validate' onClick={handleDeleteTag}>Supprimer le tag</p>
            </div>
         </div>   
         <div className='tags-page__right-part'>
            {
            tags.map((tag) => (
            <p key={tag.id}>{tag.name}</p>
            ))
            }
         </div>  
      </div>
    </div>
    </div>
 )   
}

export default Filtres ;