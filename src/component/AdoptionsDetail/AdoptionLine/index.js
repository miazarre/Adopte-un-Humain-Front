import Licorne from '../../../assets/Licorne.png'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './styles.scss'
import {BsThreeDots, BsFillTelephoneFill, BsFillXCircleFill} from 'react-icons/bs'
const baseUrl='http://matthieuskrzypczak-server.eddi.cloud:8080/api'

const AdoptionLine = ({adoption}) => {
    const [user, setUser] = useState({
        firstname:''
    })

    const [details, setDetails] = useState(false);

    const getUser = async () => {
        try{
        const token = localStorage.getItem('token');
        const newToken = JSON.parse(token);
        const response = await axios.get(`${baseUrl}/user/${adoption.user_id}`,
        { headers: { Authorization: `Bearer ${newToken}` } }
        )
            setUser(response.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleClickDetails = () => {

        setDetails(!details)
    }

    return(
        <div className='adoptionLine__container'>
            {user.firstname &&
            <div className='adoptionLine__user'>
                <img src={Licorne}/>
                <p>{user.firstname} {user.lastname}</p>
            </div>
            }
            <p><BsFillTelephoneFill/> {user.phone}</p>
            <p>{adoption.status}</p>
            <BsThreeDots 
            size='30px'
            onClick={handleClickDetails}
            />

            {details &&
            <div className='adoptionLine__bigdetails--modal'>
                <div className='adoptionLine__bigdetails'>
                    <p className='adoptionLine__bigdetails--title'>Détails de l'adoption</p>
                    <BsFillXCircleFill size='30px' onClick={handleClickDetails}/>
                </div>
            </div>
            }
        </div>
    )
}

export default AdoptionLine;