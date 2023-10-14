// Imports internes
import "./styles.scss";

// Imports externes
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Base Url
const baseUrl = process.env.REACT_APP_BASE_URL;

const AnimalFav = ({ animal }) => {
  return (
    <div className="fav__round">
      <Link to={`/trombinoscope/${animal.id}`}>
        <div className="fav__round--gradient">
          <div
            style={{
              backgroundImage: `url(${baseUrl}/images/animal/${animal.photo1})`,
            }}
            className="fav__round--image"
          ></div>
        </div>
        <h2 className="fav__round--name">{animal.name}</h2>
      </Link>
    </div>
  );
};

AnimalFav.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo1: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnimalFav;
