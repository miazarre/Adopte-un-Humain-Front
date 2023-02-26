import './styles.scss';
import { Link } from 'react-router-dom';

import error from '/var/www/html/SAISONS/Apothéose/projet-01-j-adopte-un-humain-front/src/assets/Cookie.jpg';

const Error = () => {
    return(
        <> 
            <body className="error404">
                <p className="error404-text">
                    <p>ERROR 404</p>
                    <Link to="/">
                        <button className="adoptions_container--linkToBoard error404-text-board">Retour à l'accueil</button>
                    </Link>
                </p>

                <img src={error} alt="error 404" className="error404-image" />
            </body>
        </>
    )
}

export default Error;