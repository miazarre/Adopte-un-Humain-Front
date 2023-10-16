// Imports internes
import "./styles.scss";
import AnimalCard from "./AnimalCard";

// Imports externes
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Base Url
const baseUrl = process.env.REACT_APP_BASE_URL;

const Trombinoscope = ({
  isLogged,
  favorites,
  setFavorites,
  toggleFavorite,
  user,
}) => {
  const token = localStorage.getItem("token");
  const newToken = JSON.parse(token);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const [message, setMessage] = useState("");
  const [animals, setAnimals] = useState([]);
  const [animalsId, setAnimalsId] = useState([]);

  const getAnimals = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/${user.id}/matching`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });

      setAnimalsId(response.data);

      if (response.data.length === 0) {
        setMessage(
          "Il semble qu'il n'y ait pas d'animaux disponibles dans notre refuge qui correspondent aux critères que vous avez choisis. Vous devriez vérifier que vous avez bien des préférences sélectionnées !"
        );
      }
      response.data.forEach(async (animal) => {
        getOneAnimal(animal);
      });
    } catch (error) {
      setMessage(
        "Il y a eu un soucis au moment de récupérer les informations des animaux"
      );
      console.log(error);
    }
  };

  const getOneAnimal = async (animal) => {
    try {
      const response = await axios.get(`${baseUrl}/animal/${animal.id}`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });

      setAnimals((prevAnimals) => prevAnimals.concat(response.data));
    } catch (error) {
      setMessage(
        "Il y a eu un soucis au moment de récupérer les informations de l'animal"
      );
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogged) {
      getAnimals();
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Trombinoscope</title>
      </Helmet>
      <div className="trombinoscope">
        {isLogged ? (
          <>
            <div className="trombinoscope__message--container">
              {message != "" && (
                <p className="trombinoscope__message">{message}</p>
              )}
              {message.includes("préférences") && (
                <Link to="/preferences">
                  <p className="trombinoscope__boutton">
                    <span>Préférences</span>
                  </p>
                </Link>
              )}
            </div>
            <div className="animal-card__container">
              {animals.map((animal) => (
                <AnimalCard
                  key={animal.id * Math.random()}
                  animal={animal}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                  user={user}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="connexion-message">
            {" "}
            Il faut te connecter pour voir cette page.{" "}
            <Link to="/login">
              <p className="connexion-message--boutton">
                <span>Connexion</span>
              </p>
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

Trombinoscope.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  favorites: PropTypes.array,
  setFavorites: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default Trombinoscope;
