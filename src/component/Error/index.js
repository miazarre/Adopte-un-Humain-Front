import "./styles.scss";
import { Link } from "react-router-dom";

//import Error from '../../../assets/Cookie.png';

const anError = () => {
  return (
    <>
      <body className="error404">
        <p className="error404-text">
          <p>ERROR 404</p>
          <Link to="/">
            <button className="adoptions_container--linkToBoard error404-text-board">
              Retour à l'accueil
            </button>
          </Link>
        </p>
        <img src={Error} alt="error 404" className="error404-image" />
      </body>
    </>
  );
};

export default anError;
