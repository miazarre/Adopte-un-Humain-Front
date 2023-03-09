import './styles.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {RxCrossCircled} from 'react-icons/rx';
import { TfiPencil } from "react-icons/tfi";
import { VscDiffAdded } from "react-icons/vsc";

const baseUrl=process.env.REACT_APP_BASE_URL
const token = localStorage.getItem('token');
const newToken = JSON.parse(token);

const Tags = ({isLogged}) => {

    const [data, setData] = useState([]);





    const [role, setRole] = useState ([])

    const reqInstance = axios.create({
        headers: {
            Authorization : `Bearer ${newToken}`
        }
    });

    const deletingTag = async (id) => {
        await reqInstance.delete(`${baseUrl}/tag/${id}`)
        .then (setData(data))
        .catch(error => {
            console.error(error.message);
    })};

    const onPatch = async (id) => {
        await reqInstance.patch(`${baseUrl}/tag/${id}`)
        .then (setRole(role))
        .catch(error => {
            console.error(error.message);
    })};



    const getTags = async () => {
        try{
            const responseTags = await axios.get(`${baseUrl}/tags`,
            { headers: { Authorization: `Bearer ${newToken}` }}
            )
            setData(responseTags.data)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getTags()
    }, [])

    console.log(data)

    return(
        <>
            <Link to="/board">
                <button className='animals_container--linkToBoard'>Retour au Tableau de Bord</button>
            </Link>
            <div className='preference__page-container'>

            {isLogged
            ?<>
                        <div className='preference__actual-profil'>              
                            <h1>Gestion des tags  <Link to="/tags/addtag"><VscDiffAdded /></Link></h1>
                            <p className='preference__actual-profil--title'>Tags obligatoires</p>
                            <div className='preference__actual-profil--tags'>
                                {data.map((tag) =>{
                                    if(tag.priority === true){
                                        return(
                                        <span key={tag.id}>{tag.name} 
                                            <TfiPencil onClick={e=>onPatch(tag.id, tag.name)} />
                                            <RxCrossCircled onClick={e=>deletingTag(tag.id, tag.name)} className='cross'/>
                                        </span>
                                    )}    
                                    })
                                }
                            </div>
                            <p className='preference__actual-profil--title'>Tags optionnels</p>
                            <div className='preference__actual-profil--tags'>
                                {data.map((tag) =>{
                                    if(tag.priority === false){
                                        return(
                                        <span key={tag.id}>{tag.name} 
                                            <TfiPencil onClick={e=>onPatch(tag.id, tag.name)} />
                                            <RxCrossCircled onClick={e=>deletingTag(tag.id, tag.name)} className='cross'/>
                                        </span>
                                    )}
                                    })
                            }
                            </div>
                        </div>
                        </>
                : <p className='profil-user__connexion-message'> Il faut te connecter ! </p>
                        
                }
            </div>
        </>
    )
}

Tags.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  };

export default Tags;