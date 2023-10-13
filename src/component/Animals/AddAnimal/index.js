import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./styles.scss";
import Dinosaure from "../../../assets/Dinosaure.png";
import Dragon from "../../../assets/Dragon.png";
import Licorne from "../../../assets/Licorne.png";

const AddAnimal = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [resume, setResume] = useState("");
  const [description, setDescription] = useState("");
  const [needs, setNeeds] = useState("");
  const [photos, setPhotos] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (event) => {
    axios.post(`http://matthieuskrzypczak-server.eddi.cloud:8080/api/animal`, {
      category,
      name,
      resume,
      description,
      needs,
      photos,
      birthdate,
    });
  };

  const categories = [
    { name: "Licorne", image: Licorne },
    { name: "Dinosaure", image: Dinosaure },
    { name: "Dragon", image: Dragon },
  ];

  return (
    <>
      <Link to="/board">
        <button className="adoptions_container--linkToBoard">
          Retour au Tableau de Bord
        </button>
      </Link>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container-informations">
            <div>
              <input
                type="text"
                placeholder="Nom"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label
                for="date"
                className="informations-date"
                value={birthdate}
                onChange={(event) => setBirthdate(event.target.value)}
              >
                Date de naissance :
              </label>
              <input type="date" id="date" name="date" />
            </div>
            <div>
              <label
                className="input-label"
                for="photos"
                value={photos}
                onChange={(event) => setPhotos(event.target.value)}
              >
                Ajouter des photos :
              </label>
              <input
                type="file"
                id="photos"
                name="photos"
                accept="image/png, image/jpeg"
                multiple
              ></input>
            </div>
          </div>
          <div className="textareas">
            <div>
              <label for="resume" className="textareas-label">
                Résumé :
              </label>
              <textarea
                id="resume"
                name="resume"
                rows="6"
                cols="45"
                value={resume}
                onChange={(event) => setResume(event.target.value)}
              ></textarea>
            </div>
            <div>
              <label for="description" className="textareas-label">
                Description :
              </label>
              <textarea
                id="description"
                name="description"
                rows="6"
                cols="45"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <div>
              <label for="needs" className="textareas-label">
                Besoins de l'animal :
              </label>
              <textarea
                id="needs"
                name="needs"
                rows="6"
                cols="45"
                value={needs}
                onChange={(event) => setNeeds(event.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="categories">
            {categories.map((c) => (
              <div
                className="category"
                onClick={() => setCategory(c.name.toLowerCase())}
              >
                <div className="category-image">
                  <img src={c.image} alt={c.name} />
                </div>
                <div className="category-input">
                  <input
                    type="radio"
                    id={c.name.toLowerCase()}
                    name="category"
                    value={c.name.toLowerCase()}
                    onChange={(e) => setCategory(e.target.value)}
                    checked={c.name.toLowerCase() === category}
                  />
                  <label for={c.name.toLowerCase()}>{c.name}</label>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  mattis ornare libero. Donec lacinia mollis massa, id hendrerit
                  arcu faucibus et. Aliquam pretium, mi sed imperdiet maximus,
                  lacus erat vehicula ex, vitae interdum nibh arcu a mi. Cras
                  vehicula, nunc mollis facilisis porta, ligula diam cursus
                  felis, efficitur mollis tortor turpis in justo. In hac
                  habitasse platea dictumst.
                </p>
              </div>
            ))}
          </div>
          <button type="submit" value="Submit">
            Valider
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAnimal;
