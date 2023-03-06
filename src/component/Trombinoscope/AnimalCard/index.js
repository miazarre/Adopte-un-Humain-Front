import './styles.scss'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
const baseUrl = 'http://matthieuskrzypczak-server.eddi.cloud:8080/api'
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);

const AnimalCard = ({animal, toggleFavorite, favorites, user}) => {

    const [data, setData] = useState([])
    const [matching, setMatching] = useState({
        count:'',
        pourcentage:''
    });
    const [avatarsId, setAvatarsId] = useState([])
    const [highestAvatar, setHighestAvatar] = useState([])

    const getMatching = async () => {
        try{
            const response = await axios.get(`${baseUrl}/user/${user.id}/matching/${animal.id}`,
            { headers: { Authorization: `Bearer ${newToken}` } }
            )
            setData(response.data)
            resolveMatching(response.data)

        }catch(error){
            console.log(error)
        }
    }

    const getAvatarsId = async () => {
        try{
// On récup la liste des avatars et on stock leurs ids dans un tableau
            const responseavatar = await axios.get(`${baseUrl}/avatars`,
            { headers: { Authorization: `Bearer ${newToken}` } }
            )

            let avatars = []
            responseavatar.data.forEach((avatar) => {
                avatars.push(avatar)
            })

            setAvatarsId(avatars)
        }catch(error){
            console.log(error)
        }
}

const getAvatars = async () => {
    try {
        avatarsId.forEach(async avatar => {
            const avatarTags = await axios.get(`${baseUrl}/avatar/${avatar.id}/tag`,
                { headers: { Authorization: `Bearer ${newToken}` } }
            )
            console.log('---------------------------')
            console.log('Début pour ' + avatar.name)

            let animalTagCount = 0;

            avatarTags.data.forEach((tag) => {
                for (const animalTag of data) {
                    if (animalTag.statut.includes('animal') || animalTag.statut.includes('commun')) {
                        if (tag.tag_name === animalTag.tag_name) {
                            animalTagCount++;
                        }
                    }
                }
            })

            console.log(`${animal.name} à ${animalTagCount} tags de ${avatar.name}`)
            const avatarCount = { [avatar.name]: animalTagCount };
            setHighestAvatar(prevState => [...prevState, avatarCount]);

            selectAvatar()
        });

    } catch (error) {
        console.log(error)
    }
}

    const selectAvatar = () => {
        console.log('Highest Avatars')
        console.log(highestAvatar)
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

    useEffect(() => {
        getMatching()
        getAvatarsId()
        getAvatars()
    }, [])

    return(
        <div className='animal-card__card'>
            <div className='animal-card__card--heart' onClick={e => toggleFavorite(animal.id)}>
            {favorites.includes(animal.id)
            ?   <BsSuitHeartFill size={'30px'}/>
            :  <BsSuitHeart  size={'30px'} />
            }
            
            </div>
            <div className='animal-card__card--gradient'>
                <div 
                style={{backgroundImage:`url(${baseUrl}/images/animal/${animal.photo1})`}} 
                className='animal-card__card--image'
                >
                </div>
            </div>
            <h2 className='animal-card__card--name'>{animal.name}</h2>
            <p className='animal-card__card--resume'>{animal.resume}</p>
            <div className='animal-card__card--match'>
                <p className='animal-card__card--points'>{matching.count} points communs - {matching.pourcentageDone ? matching.pourcentageDone : '0'}%</p>
                {matching.count != '' &&
                    <PieChart
                className='animal-card__card--camembert'
                data={[
                    { title: 'Match', value:matching.pourcentageDone, color: '#70C1B3' },
                    { title: 'No Match', value:matching.pourcentage, color: '#247BA0' },
                ]}
                radius={40}
                startAngle={-60}
                lengthAngle={-360}
                lineWidth={55}
                />}
            </div>
            <Link to={`/trombinoscope/${animal.id}`} className='animal-card__card--bouton'><span>Profil</span></Link>
        </div>
    )
}

export default AnimalCard ;