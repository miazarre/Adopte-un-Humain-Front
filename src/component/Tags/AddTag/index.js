import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles.scss';

const token = localStorage.getItem('token');
const newToken = JSON.parse(token);
const baseUrl=process.env.REACT_APP_BASE_URL

const AddTag = () => {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {     
            const formData = new FormData();
            formData.append('name', name);
            formData.append('priority', priority);
            
            const response = await axios.post(`${baseUrl}/tag`, 
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
            </div>
            <fieldset>
                <legend className='radio-title'>Choisir la priorité du tag :</legend>
                <div className='radio-detail'>
                    <input type="radio" id="obligatoire" name="priority" value="true" checked />
                    <label for="obligatoire">Obligatoire</label>
                    <input type="radio" id="optionnel" name="priority" value="false" />
                    <label for="optionnel">Optionnel</label>
                </div>
            </fieldset>
            <button onClick={handleSubmit}>Valider</button>
        </form>
    </div>
    </>
    )
}

export default AddTag;