import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import axios from 'axios';
const baseUrl=process.env.REACT_APP_BASE_URL

const Animal = ({animal}) => {

    const [adoptions, setAdoptions] = useState([])

    const getAdoptions = async () => {
        const token = localStorage.getItem('token');
        const newToken = JSON.parse(token);

        try{
            const response = await axios.get(`${baseUrl}/adopts`,
            { headers: { Authorization: `Bearer ${newToken}` } });
            let adoptionsList = response.data
            adoptionsList = adoptionsList.filter((adoption) => adoption.animal_id == animal.id)
            setAdoptions(adoptionsList)
            console.log(adoptionsList)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getAdoptions()
    }, [])

    return( 
        <Link to={`/adoptions/${animal.id}`}>
        <div className='animal-adoptions__card'>
            <div className='animal-adoptions__card--image' style={{backgroundImage:`url(${baseUrl}/images/animal/${animal.photo1})`}}>
            </div>
            <p className='animal-adoptions__card--name'>{animal.name} <span className='animal-adoptions__card--round'></span> <span className='animal-adoptions__card--adopt-count'>{adoptions.length} demande{adoptions.length===1 ? '' : 's'}</span></p>
        </div>
        </Link>
    )
}

export default Animal ;