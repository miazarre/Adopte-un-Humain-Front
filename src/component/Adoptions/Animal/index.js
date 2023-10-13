import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import axios from "axios";
const Animal = ({ animal }) => {
  const [adoptions, setAdoptions] = useState([]);

  const getAdoptions = async () => {
    try {
      const response = await axios.get(
        `http://matthieuskrzypczak-server.eddi.cloud:8080/api/adopts`
      );
      let adoptionsList = response.data;
      adoptionsList = adoptionsList.filter(
        (adoption) => adoption.animal_id == animal.id
      );
      setAdoptions(adoptionsList);
      console.log(adoptionsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdoptions();
  }, []);

  return (
    <Link to={`/adoptions/${animal.id}`}>
      <div className="animal-adoptions__card">
        <div
          className="animal-adoptions__card--image"
          style={{
            backgroundImage: `url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo1})`,
          }}
        ></div>
        <p className="animal-adoptions__card--name">
          {animal.name} <span className="animal-adoptions__card--round"></span>{" "}
          <span className="animal-adoptions__card--adopt-count">
            {adoptions.length} demande{adoptions.length === 1 ? "" : "s"}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default Animal;
