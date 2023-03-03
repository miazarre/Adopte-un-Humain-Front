import { useEffect, useState } from 'react';
import './styles.scss'
import React from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');
const newToken = JSON.parse(token);
const baseUrl=process.env.REACT_APP_BASE_URL


const Filtres = () => {

   const [tagToDelete, setTagToDelete] = useState('');
   const [tags, setTags] = useState([]);
   const [form, setForm] = useState({
      new_tag_name:'',
      eliminatoire:false,
      tagToDelete:'',
      name_modified:'',
      priority_modified:false,
   })

   const [tagSelected, setTagSelected] = useState({
      name:'',
      id:'',
      priority:false
   })

   useEffect(() => {
      getTags()
      
   }, [])

   const handleTagSelect = (event) => {
      setTagToDelete(event.target.value);
   };

   const getTags = async () => {

      try{
         const response = await axios.get(`${baseUrl}/tags`,
         { headers: { Authorization: `Bearer ${newToken}` } }
         ) ;
         setTags(response.data);
         console.log(response.data)
      }catch(error){
         console.log(error)
      }
   }

   const handleChange = (event) => {
      const { name, value } = event.target;
      setForm({
          ...form,
          [name]: value
      });
  };

  const handleDeleteTag = async () => {

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
       getTags();
      }catch(error){

      }
   } 

   const handleModify = async () => {

      const modifiedField = {
         name:form.name_modified,
         priority:form.priority_modified
      }

      try{
         const response = axios.patch(`${baseUrl}/tag/${tagSelected.id}`,
         modifiedField,
         { headers: { Authorization: `Bearer ${newToken}` } }
         )

         console.log(response)
         getTags()

      }catch(error){
         console.log(error)
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
               <p className='tags-page__left-part--remove--validate' onClick={handleDeleteTag}>Supprimer</p>
            </div>
         </div>   
         <div className='tags-page__right-part'>
         <h2>Modifier un tag</h2>
         <div className='tags-page__right-part--selected-tag'>
            <p>Tag selectionné :</p>
            <p className='tags-page__right-part--selected-tag--selected'>{tagSelected.name} - {tagSelected.priority ? 'Eliminatoire' : 'Non-éliminatoire'}</p>
         </div>
         <div className='tags-page__right-part--selected-tag'>
            <input placeholder='Nouveau nom' value={form.name_modified} name='name_modified' onChange={handleChange}/>
            <p>Eliminatoire : </p>
            <label className="tags-page__right-part--toggle-button">
               <input type="checkbox" className="tags-page__right-part--toggle-button" checked={form.priority_modified} onChange={(event) => setForm({...form, priority_modified :event.target.checked})}/>
               <span className="tags-page__right-part--slider"></span>
            </label>
            <p className='tags-page__right-part--validate' onClick={handleModify}>Modifier</p>
         </div>
         <div className='tags-page__right-part--tags-list'>
            {
            tags.map((tag) => (
            <p
            key={tag.id}
            onClick={() => setTagSelected({name:tag.name, id:tag.id, priority:tag.priority})}
            className={tagSelected.name === tag.name ? 'tags-page__right-part--tags-list--tag selected' : 'tags-page__right-part--tags-list--tag'}
            >
            {tag.name}
            </p>
            ))
            }
         </div> 
         </div>  
      </div>
    </div>
    </div>
 )   
}

export default Filtres ;