import { Link } from "react-router-dom";
import "./styles.scss";

const AnimalFav = ({ animal }) => {
  console.log(animal);
  return (
    <div className="fav__round">
      <Link to={`/trombinoscope/${animal.id}`}>
        <div className="fav__round--gradient">
          <div
            style={{
              backgroundImage: `url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo1})`,
            }}
            className="fav__round--image"
          ></div>
        </div>
        <h2 className="fav__round--name">{animal.name}</h2>
      </Link>
    </div>
  );
};

export default AnimalFav;
