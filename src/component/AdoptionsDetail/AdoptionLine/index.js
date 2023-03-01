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
            className='dots'
            />

            {details &&
            <div className='adoptionLine__bigdetails--modal'>
                <div className='adoptionLine__bigdetails'>
                    <div className='adoptionLine__bigdetails--title--container'>
                        <p className='adoptionLine__bigdetails--title'>Détails de l'adoption</p>
                        <BsFillXCircleFill size='30px' onClick={handleClickDetails} className='cross'/>
                    </div>
                    <div className='adoptionLine__bigdetails--body-part'>
                        <div className='adoptionLine__bigdetails--body-part--user'>
                            <img src={Licorne}/>
                            <p className='adoptionLine__bigdetails--body-part--user-name'>{user.firstname} {user.lastname}</p>
                            <p><BsFillTelephoneFill/> {user.phone}</p>
                        </div>
                        <div className='adoptionLine__bigdetails--body-part--comment'>
                        {adoption.comment 
                        ? <p>{adoption.comment}</p>
                        : <p>Il n'y a pas encore de commentaires liés à cette demande d'adoption.</p>
                        }
                        </div>
                        <div className='adoptionLine__bigdetails--body-part--adoption'>
                            <p>{adoption.form1}</p>
                            <p>{adoption.form2}</p>
                            <p>{adoption.form3}</p>
                        </div>

                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default AdoptionLine;