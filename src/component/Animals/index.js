import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VscDiffAdded } from "react-icons/vsc";

import axios from "axios";
import Animal from "./Animal";

const Animals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://matthieuskrzypczak-server.eddi.cloud:8080/api/animals"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const animal = data.map((animal) => <Animal key={animal.id} {...animal} />);

  return (
    <div className="animals_container">
      <h1 className="animals_container-title">Liste des animaux du refuge</h1>
      <div className="animals_container-header">
        <div className="animals_container-header--search">
          <form className="animals_container-form">
            <button>
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <input
              className="animals_container-form__input"
              placeholder="Rechercher un animal"
              required=""
              type="text"
            />
            <button className="animals_container-form__reset" type="reset">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </form>
          <Link to="/animals/addanimal">
            <VscDiffAdded size={"4vh"} className="animals_container-icon" />
          </Link>
        </div>
        <Link to="/board">
          <button className="animals_container--linkToBoard">
            Retour au Tableau de Bord
          </button>
        </Link>
      </div>
      <table className="animals_container-title-table">
        <tr>
          <th>Nom</th>
          <th>Date de naissance</th>
          <th>Description</th>
          <th>Besoins</th>
          <th>Profil</th>
          <th className="animals_container-title-table--icon">
            Modifier / Supprimer
          </th>
        </tr>
        {animal}
      </table>
    </div>
  );
};

export default Animals;
