import React, { useEffect, useState } from 'react';
import './styles.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const baseUrl="http://matthieuskrzypczak-server.eddi.cloud:8080/api"

const Home = () => {
    const [profiles, setProfiles] = useState([])

    const filteredProfiles = async () => {
        const response = await axios.get(`${baseUrl}/animals`);
        setProfiles(response.data)
    }
     useEffect(() => {
        filteredProfiles()
     },
     [] );

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
        <div className='animal-profiles'>
            <div className='profiles'>
                {profiles.map((profile) => (
                    <div key={profile.name} className='profile'>
                        <div 
                            style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${profile.photo1})`}} 
                            className='animal-card__card--image'>
                        </div>
                        <h3 className='name'>{profile.name}</h3>
                    </div>
                ))}
                </div>
        </div>
    </div>
    </>
    );
}

export default Home