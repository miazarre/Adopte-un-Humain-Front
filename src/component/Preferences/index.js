// Imports internes
import "./styles.scss";
import {
  optionsAge,
  optionsActivité,
  optionsBudget,
  optionsCaracter,
  optionsCohabitation,
  optionsHabitat,
  optionsJardin,
  optionsKids,
  optionsSexe,
} from "../../data/options_select";
import customStyles from "./custom_styles";

// Imports externes
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import PropTypes from "prop-types";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

// Base url
const baseUrl = process.env.REACT_APP_BASE_URL;

const Preferences = ({ isLogged, user }) => {
  const token = localStorage.getItem("token");
  const newToken = JSON.parse(token);

  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");

  // Contact de l'API pour récupérer les tags liés a l'utilisateur connecté
  const settingPref = async () => {
    try {
      const responseTags = await axios.get(`${baseUrl}/user/${user.id}/tag`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      setTags(responseTags.data);
    } catch (error) {
      setMessage(
        "Il y a eu un soucis au moment de récupérer vos données auprès du serveur.",
      );
      console.log(error);
    }
  };
  // Appel au chargement de la page de la fonction pour setup les tags du user
  useEffect(() => {
    if (user) {
      settingPref();
    }
  }, [user]);

  // Au changement sur un Select on appelle la fonction qui contact l'API pour ajouter un tag
  const handleChange = async (selectedOption) => {
    addingTag(selectedOption);
  };

  // On récupère l'id du tag selectionné via l'API
  const getTagId = async (selectedOption) => {
    try {
      const response = await axios.get(`${baseUrl}/tags`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      let foundTag = response.data.filter(
        (tag) => tag.name.toLowerCase() === selectedOption.value.toLowerCase(),
      );
      return foundTag;
    } catch (error) {
      console.log(error);
      setMessage(
        "Il y a eu un problème au moment de récupérer la liste des tags.",
      );
    }
  };

  // Au changement sur un Select multi, on appelle la fonction qui contact l'API pour chaque champs séléctionné
  const handleChangeMulti = (selectedOption) => {
    selectedOption.forEach((element) => {
      addingTag(element);
    });
  };
  // Fonction qui appelle l'API pour ajouter une liaison tag-user
  const addingTag = async (selectedOption) => {
    try {
      const tag = await getTagId(selectedOption);
      const existingTag = tags.find(
        (tag) =>
          tag.tag_name.toLowerCase() === selectedOption.value.toLowerCase(),
      );
      if (existingTag) {
        setMessage(
          `Vous avez déjà choisi '${selectedOption.value}' comme option.`,
        );
        return;
      }
      const response = await axios.post(
        `${baseUrl}/user/${user.id}/tag`,
        { tag_id: tag[0].id },
        { headers: { Authorization: `Bearer ${newToken}` } },
      );
      settingPref();
      setMessage(`Vous avez bien ajouté ${tag[0].name} à vos préférences.`);
    } catch (error) {
      setMessage("Il y a eu une erreur.");
      console.log(error);
    }
  };
  // Fonction qui appelle l'API pour supprimer la liaison tag-user
  const deletingTag = async (id, name) => {
    console.log("delete" + id);
    try {
      const response = await axios.delete(
        `${baseUrl}/user/${user.id}/tag/${id}`,
        { headers: { Authorization: `Bearer ${newToken}` } },
      );
      settingPref();
      setMessage(`Vous avez bien supprimé ${name} de vos préférences.`);
    } catch (error) {
      console.log(error);
      setMessage("Il y a eu une erreur.");
    }
  };
  return (
    <div className="preference__page-container">
      {isLogged ? (
        <>
          <div className="preference__actual-profil">
            <h1>Profil actuel</h1>
            <Link to="/trombinoscope">
              <h2 className="preference__link">
                Voir les animaux qui correspondent
              </h2>
            </Link>
            <p className="preference__actual-profil--title">Profil</p>
            <div className="preference__actual-profil--tags">
              {tags.map((tag) => {
                if (tag.priority === true) {
                  return (
                    <span key={tag.tag_id}>
                      {tag.tag_name}{" "}
                      <RxCrossCircled
                        onClick={(e) => deletingTag(tag.tag_id, tag.tag_name)}
                        className="cross"
                      />
                    </span>
                  );
                }
              })}
            </div>
            <p className="preference__actual-profil--title">Préférences</p>
            <div className="preference__actual-profil--tags">
              {tags.map((tag) => {
                if (tag.priority === false) {
                  return (
                    <span key={tag.tag_id}>
                      {tag.tag_name}{" "}
                      <RxCrossCircled
                        onClick={(e) => deletingTag(tag.tag_id, tag.tag_name)}
                        className="cross"
                      />
                    </span>
                  );
                }
              })}
            </div>
          </div>
          <form className="preference__form-container">
            <h2>Votre profil</h2>
            {message !== "" && (
              <p className="preference__message">
                {message} <RxCrossCircled onClick={(e) => setMessage("")} />
              </p>
            )}
            <div className="preference__form-container--formdiv">
              <Select
                options={optionsHabitat}
                placeholder="Habitat"
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChange}
              />
              <Select
                options={optionsJardin}
                placeholder="Jardin"
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChange}
              />
              <Select
                options={optionsKids}
                placeholder="Avez-vous des enfants ?"
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChange}
              />
              <Select
                options={optionsBudget}
                placeholder="Votre budget est plutôt..."
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChange}
              />
              <Select
                options={optionsCohabitation}
                isMulti
                placeholder="Vous avez déjà..."
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChangeMulti}
              />
            </div>
            <h2>Vos préférences</h2>
            <div className="preference__form-container--formdiv">
              <Select
                options={optionsAge}
                isMulti
                name="age"
                placeholder="Age"
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChangeMulti}
              />
              <Select
                options={optionsCaracter}
                isMulti
                placeholder="Caractère"
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChangeMulti}
              />
              <Select
                options={optionsSexe}
                isMulti
                placeholder="Sexe"
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChangeMulti}
              />
              <Select
                options={optionsActivité}
                isMulti
                placeholder="Activité"
                className="preference__form-container--select"
                styles={customStyles}
                onChange={handleChangeMulti}
              />
            </div>
          </form>
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
  );
};

Preferences.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default Preferences;
