import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import data from '../../data/fake_animals.json'
import './styles.scss'
import {TiArrowBack} from 'react-icons/ti'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [profiles, setProfiles] = useState(data)

    const filteredProfiles = profiles.filter((profile) => {
        return profile;
      }).slice(0, 5); 

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return(
    <>
    <div className='container'>
        <h1 className='title'> J'adopte un humain </h1>
            <div className='intro'>
                <p>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum dui vitae orci vehicula gravida.
                     Nulla sollicitudin dui dictum eros vulputate venenatis. Donec quis finibus neque. 
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum dui vitae orci vehicula gravida.
                     Nulla sollicitudin dui dictum eros vulputate venenatis. Donec quis finibus neque. 
                     Nullam molestie, orci sit amet feugiat molestie, libero mauris pretium nisi, et dapibus eros sapien at est. Ut interdum lectus enim, non eleifend eros fermentum vitae.
                </p>
            </div>
        <div className='animal-profils'>
            <div className='profiles'>
                {filteredProfiles.map((profile) => (
                    <div key={profile.name} className='profile'>
                        <div className='profile-image'>
                        <img src={profile.image} alt={profile.name} />
                        </div>
                        <h3 className='name'>{profile.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
    )
}

export default Home