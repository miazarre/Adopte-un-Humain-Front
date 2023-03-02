import PropTypes from 'prop-types';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import AdoptionLine from './AdoptionLine';
const AdoptionsDetail = () => {
    const idAnimal = useParams();
    const [animal, setAnimal] = useState({
        name:'',
        id:''
    })

    const [adoptions, setAdoptions] = useState([])

    const getAnimal = async () => {
        try{
            const response = await axios.get(`http://matthieuskrzypczak-server.eddi.cloud:8080/api/animal/${idAnimal.id}`)
            setAnimal(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const getAdoptions = async () => {
        try{
            const response = await axios.get(`http://matthieuskrzypczak-server.eddi.cloud:8080/api/adopts`)
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
                <div className='animal-adoptions__card--image' style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo1})`}}>
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