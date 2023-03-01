import Licorne from '../../../assets/Licorne.png'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './styles.scss'
import {BsThreeDots, BsFillTelephoneFill, BsFillXCircleFill} from 'react-icons/bs'
const baseUrl='http://matthieuskrzypczak-server.eddi.cloud:8080/api'
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);

const AdoptionLine = ({adoption}) => {
    const [user, setUser] = useState({
        firstname:''
    })

    const [comment, setComment] = useState('');
    const [details, setDetails] = useState(false);

    const getUser = async () => {
        try{
        
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
        setComment(adoption.comment)
    }, [])

    const handleSaveComment = async () => {
        try{
        const response = await axios.patch(`${baseUrl}/adopt/${adoption.id}`,
        {comment:comment},
        { headers: { Authorization: `Bearer ${newToken}` } }
        )
        }catch(error){
            console.log(error)
        }
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
            onClick={e=>setDetails(!details)}
            className='dots'
            />

            {details &&
            <div className='adoptionLine__bigdetails--modal'>
                <div className='adoptionLine__bigdetails'>
                    <div className='adoptionLine__bigdetails--title--container'>
                        <p className='adoptionLine__bigdetails--title'>Détails de l'adoption</p>
                        <BsFillXCircleFill size='30px' onClick={e=>setDetails(!details)} className='cross'/>
                    </div>
                    <div className='adoptionLine__bigdetails--body-part'>
                        <div className='adoptionLine__bigdetails--body-part--user'>
                            <h3>Utilisateur :</h3>
                            <img src={Licorne}/>
                            <p className='adoptionLine__bigdetails--body-part--user-name'>{user.firstname} {user.lastname}</p>
                            <p><BsFillTelephoneFill/> {user.phone}</p>
                        </div>
                        <div className='adoptionLine__bigdetails--body-part--comment'>
                            <h3>Commentaire du staff :</h3>
                            <textarea value={comment} onChange={e => setComment(e.target.value)}/>
                            <p onClick={handleSaveComment}><span>Sauvegarder</span></p>
                        </div>
                        <div className='adoptionLine__bigdetails--body-part--adoption'>
                            <h3>Message :</h3>
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