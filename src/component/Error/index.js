import './styles.scss';
import { Link } from 'react-router-dom';
import {Player} from "@lottiefiles/react-lottie-player"

//import Error from '../../../assets/Cookie.png';


const anError = () => {
    return(
        <div className="error404"> 
                <p className="error404--back"><span>Retour</span></p>
               <Player
               className="error404--player"
               autoplay
               loop
               src="https://assets9.lottiefiles.com/packages/lf20_hd8ztfyp.json"
               />

        </div>
    )
}

export default anError;