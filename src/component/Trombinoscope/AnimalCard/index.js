// Imports internes
import './styles.scss'

// Imports externes
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import PropTypes from 'prop-types';

// Base url
const baseUrl = 'http://matthieuskrzypczak-server.eddi.cloud:8080/api'
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);

const AnimalCard = ({animal, toggleFavorite, favorites, user, avatarsTags}) => {

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

    useEffect(() => {
        console.log(avatarsTags)
    }, [avatarsTags])

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
        getAvatar()

    }, [])

    const getAvatar = async () => {

        try{

            const response = await axios.get(`${baseUrl}/animal/${animal.id}/tag`,
            { headers: { Authorization: `Bearer ${newToken}` } }
            )

            let licorneCount = 0 ;
            let dragonCount = 0 ;
            let dinosaureCount = 0 ;
            console.log('___________________________________________________________');
            console.log('Nouvel animal : ' + animal.name);
            console.log('Avatars tag :');
            console.log(avatarsTags);
            console.log('Licorne' + licorneCount + 'dragon' + dragonCount + 'dinosaure' + dinosaureCount);
            
            response.data.forEach(animalTag => {
            
                console.log('---- Nouveau tag de l\'animal ------')
                console.log(animalTag.tag_name)

                avatarsTags.Licorne.forEach(licorneTag => {
                    console.log(licorneTag.tag_name)
                    if(licorneTag.tag_name === animalTag.tag_name){
                        licorneCount ++ ;
                    }
                });

                avatarsTags.Dragon.forEach(dragonTag => {
                    console.log(dragonTag.tag_name)
                    if(dragonTag.tag_name === animalTag.tag_name){
                        dragonCount ++ ;
                    }
                });

                avatarsTags.Licorne.forEach(dinosaureTag => {
                    console.log(dinosaureTag.tag_name)
                    if(dinosaureTag.tag_name === animalTag.tag_name){
                        dinosaureCount ++ ;
                    }
                });
            });  

            console.log(animal.name + ' a ' + licorneCount + ' tags licorne')
            console.log(animal.name + ' a ' + dinosaureCount + ' tags dinosaure')
            console.log(animal.name + ' a ' + dragonCount + ' tags dragon')

        }catch(error){
            console.log(error)
        }
    }

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

AnimalCard.propTypes = {
    animal: PropTypes.object.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

export default AnimalCard ;