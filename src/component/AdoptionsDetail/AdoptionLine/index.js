import Licorne from '../../../assets/Licorne.png'
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios'
import { useEffect, useState } from 'react'
import './styles.scss'
import {BsThreeDots, BsFillTelephoneFill, BsFillXCircleFill} from 'react-icons/bs'
import { useParams } from 'react-router-dom'
const baseUrl='http://matthieuskrzypczak-server.eddi.cloud:8080/api'
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);

const AdoptionLine = ({adoption, getAdoptions}) => {
    const [user, setUser] = useState({
        firstname:'',
        id:''
    })
    const param = useParams()

    const [comment, setComment] = useState('');
    const [details, setDetails] = useState(false);
    const [matching, setMatching] = useState({
        count:'',
        pourcentage:''
    });

    const [data, setData] = useState([]);

    const getUser = async () => {
        try{
        
        const response = await axios.get(`${baseUrl}/admin/user/${adoption.user_id}`,
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

    useEffect(() => {
        getMatching()
    }, [user])

    const handleSaveComment = async () => {
        try{
        const response = await axios.patch(`${baseUrl}/adopt/${adoption.id}`,
        {comment:comment},
        { headers: { Authorization: `Bearer ${newToken}` } }
        )
        getAdoptions()
        }catch(error){
            console.log(error) 
        }
    }
 
    const handleStatusChange = async (e) => {
        try{
            const response = await axios.patch(`${baseUrl}/adopt/${adoption.id}`,
            {status:e.target.value},
            { headers: { Authorization: `Bearer ${newToken}` } }
            )
            getAdoptions()
            }catch(error){
                console.log(error)
            }
    }

    const getMatching = async () => {
        try{
            
            const response = await axios.get(`${baseUrl}/user/${user.id}/matching/${param.id}`,
            { headers: { Authorization: `Bearer ${newToken}` } }
            )
            setData(response.data)
            resolveMatching(response.data)

        }catch(error){
            console.log(error)
        }
    }

    const resolveMatching = (data) => {
        let animalTagCount = 0;
        let animalFilledTagCount = 0;
        data.forEach(tag => {
            if (tag.statut.includes('animal') || tag.statut.includes('commun')) {
                animalTagCount++;
                if (tag.match_count === '1') {
                    animalFilledTagCount++;
                }
            }
        });
        let pourcentageDone = parseInt((animalFilledTagCount / animalTagCount) * 100);
        let pourcentage = parseInt(100 - pourcentageDone);
        setMatching({...matching, count: animalFilledTagCount, animalTag:animalTagCount, pourcentage:pourcentage, pourcentageDone:pourcentageDone});
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
            <PieChart
            className='camembert'
            data={[
                { title: 'Match', value:matching.pourcentageDone, color: '#F3FFBD' },
                { title: 'No Match', value:matching.pourcentage, color: '#CC0036' },
            ]}
            radius={40}
            startAngle={-60}
            lengthAngle={-360}
            lineWidth={55}
            />
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
                            <h3>Utilisateur</h3>
                            <img src={Licorne}/>
                            <p className='adoptionLine__bigdetails--body-part--user-name'>{user.firstname} {user.lastname}</p>
                            <p><BsFillTelephoneFill/> {user.phone}</p>
                            <p className='adoptionLine__bigdetails--body-part--address'>{user.address} {user.postal_code} {user.city} {user.country}</p>
                            <p>{matching.count} tags en commun</p>
                            <p className='adoptionLine__bigdetails--body-part--match'>{matching.pourcentageDone}% de match !</p>
                            { matching.pourcentage != '' &&
                            <><PieChart
                            className='camembert'
                            data={[
                                { title: 'Match', value:matching.pourcentageDone, color: '#70C1B3' },
                                { title: 'No Match', value:matching.pourcentage, color: '#CC0036' },
                            ]}
                            radius={50}
                            startAngle={-60}
                            lengthAngle={-360}
                            lineWidth={35}
                            paddingAngle={5}
                            />
                            <div className='adoptionLine__bigdetails--body-part--tagslist'>
                            {data.map((tag) => {
                                if(tag.match_count == '1'){
                                    return(
                                        <span key={tag.tag_name} className='tags'>{tag.tag_name}</span>
                                    )}
                            })}
                            </div>
                            </>
                            }
                            
                        </div>
                        <div className='adoptionLine__bigdetails--body-part--comment'>
                            <h3>Partie Staff</h3>
                            <select onChange={e=> handleStatusChange(e)}>
                                <option disabled defaultValue>Status</option>
                                <option>En cours</option>
                                <option>Adopté</option>
                                <option>Refusé</option>
                            </select>
                            <textarea value={comment} onChange={e => setComment(e.target.value)}/>
                            <p onClick={handleSaveComment}><span>Sauvegarder</span></p>
                        </div>
                        <div className='adoptionLine__bigdetails--body-part--adoption'>
                            <h3>Message</h3>
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