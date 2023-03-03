import PropTypes from 'prop-types';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import AdoptionLine from './AdoptionLine';

const token = localStorage.getItem('token');
const newToken = JSON.parse(token);
const baseUrl=process.env.REACT_APP_BASE_URL;


const AdoptionsDetail = ({user}) => {
    const idAnimal = useParams();
    const [animal, setAnimal] = useState({
        name:'',
        id:''
    })
    const [tags, setTags] = useState([])

    const [adoptions, setAdoptions] = useState([])

    const getAnimal = async () => {
        try{
            const response = await axios.get(`${baseUrl}animal/${idAnimal.id}`,
            { headers: { Authorization: `Bearer ${newToken}` } })
            setAnimal(response.data)

            const responsebis = await axios.get(`${baseUrl}animal/${idAnimal.id}/tag`,
            { headers: { Authorization: `Bearer ${newToken}` } })

            console.log('Coucou')
            setTags(responsebis.data)
            console.log(tags)

        }catch(error){
            console.log(error)
        }
    }

    const getAdoptions = async () => {
        try{
            const response = await axios.get(`http://matthieuskrzypczak-server.eddi.cloud:8080/api/adopts`,
            { headers: { Authorization: `Bearer ${newToken}` } })

            let adoptionsList = response.data
            adoptionsList = adoptionsList.filter((adoption) => adoption.animal_id == idAnimal.id)
            setAdoptions(adoptionsList)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAnimal()
        getAdoptions()
        }, 
      []);

    return(
        <div className='adoptionsdetail'>
            <div className='adoptionsdetail__animal-details'>
                <p className='adoptionsdetail__animal-details--name'>{animal.name}</p>
                <div className='adoptionsdetail__image' style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo1})`}}>
                </div>
                <div className='adoptionsdetail__tags-container'>
                {tags.map((tag) =>{
                        return(
                            <span className='adoptionsdetail__tags-container--tags'>{tag.tag_name}</span>
                        )
                    })
                }
                </div>
            </div>
            <div className='adoptionsdetail__adoptions-list--container'>
                <h2>Mes matchs:</h2>
                <div>
                    {
                        adoptions.map((adoption) => {
                            return(
                            <AdoptionLine
                            key={Math.random()}
                            adoption={adoption}
                            getAdoptions={getAdoptions}
                            />
                            )
                            
                        })
                    }
                </div>
            </div>
        </div>
    )
}

AdoptionsDetail.propTypes = {
    animal_id: PropTypes.number.isRequired,
    form1: PropTypes.string.isRequired,
    form2: PropTypes.string.isRequired,
    form3: PropTypes.string.isRequired,
  };

export default AdoptionsDetail ;