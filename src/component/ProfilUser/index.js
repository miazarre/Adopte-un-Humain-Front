// Imports internes
import "./styles.scss";

// Imports externes
import { Link, useNavigate } from "react-router-dom";
import { HiLightBulb, HiTrash } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import PropTypes from "prop-types";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";

//BaseUrl
const baseUrl = process.env.REACT_APP_BASE_URL;

const ProfilUser = ({ user, setUser, isLogged, setIsLogged }) => {
  const token = localStorage.getItem("token");
  const newToken = JSON.parse(token);

  const [showModal, setShowModal] = useState(false);
  const [profilUSer, setProfilUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Déclaration de tous les champs de form à controler
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    postal_code: "",
    city: "",
    country: "",
    new_mail: "",
    mail_confirm: "",
    new_password: "",
    confirm_new_password: "",
  });

  useEffect(() => {
    for (const key in profilUSer) {
      if (key in form) {
        setForm((prevForm) => ({
          ...prevForm,
          [key]: profilUSer[key],
        }));
      }
    }
  }, [user]);

  // Au chargement de la page on contact l'API pour avoir els données à jour de l'utilisateur
  const settingUserOnLoad = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/${user.id}`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      setProfilUser(response.data[0]);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Il y a eu un problème au moment de récupérer vos informations.",
      );
    }
  };
  // le useEffect qui déclanche le changement de données du user
  useEffect(() => {
    if (user) {
      settingUserOnLoad();
    }
  }, [user]);

  // Quand un champs d'input est changé
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Quand le formulaire est submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // On check si les champs pairés (mail/confirm et pass/confirm) correspondent bien
    // Si oui, on passe a la suite
    // Si non, on setUp un message d'erreur et on termine a fonction
    if (form.new_mail !== form.mail_confirm) {
      setErrorMessage("L'e-mail et sa confirmation ne correspondent pas.");
      return;
    }
    if (form.new_password !== form.confirm_new_password) {
      setErrorMessage(
        "Le nouveau mot de passe et sa confirmation ne correspondent pas.",
      );
      return;
    }

    let firstNumber = form.phone.charAt(0);
    console.log(firstNumber);
    console.log(form.phone);
    if (form.phone != "" && (form.phone.length != "10" || firstNumber != "0")) {
      setErrorMessage("Veuillez entrer un numéro de téléphone valide.");
      return;
    }
    // On fait un objet à partir des champs du formulaire qui ne sont pas vides
    const modifiedFields = Object.entries(form)
      .filter(([_, value]) => value !== "")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    // Si l'objet nouvellement créé contient le mail ou le mot de passe
    // On setup pour que ça corresponde à ce que l'api attend
    // On supprime les champs qu'on ne doit pas leur envoyer
    if (modifiedFields.hasOwnProperty("new_mail")) {
      modifiedFields.email = modifiedFields.new_mail;
      delete modifiedFields.new_mail;
      delete modifiedFields.mail_confirm;
    }
    if (modifiedFields.hasOwnProperty("new_password")) {
      modifiedFields.password = modifiedFields.new_password;
      delete modifiedFields.new_password;
      delete modifiedFields.confirm_new_password;
    }

    // On récupère le token et on le parse pour qu'il soit au bon format pour l'API
    const token = localStorage.getItem("token");
    const newToken = JSON.parse(token);
    // On lance le try/catch puis on contact avec axios
    // On setup bien le header avec le token pour que l'authentification marche bien
    try {
      const response = await axios.patch(
        `${baseUrl}/user/${user.id}`,
        modifiedFields,
        { headers: { Authorization: `Bearer ${newToken}` } },
      );
      // On modifie le user avec les données qu'on viens de modif
      // On affiche un message de confirmation
      setProfilUser(response.data);
      setErrorMessage("Votre profil à été mis à jour.");
    } catch (error) {
      // Si erreur, console.log et setup d'un message
      console.log(error.response.data);
      setErrorMessage("Il y a eu un soucis avec le serveur.");
    }
  };

  const deleteProfil = async () => {
    try {
      console.log("Delete !");
      const response = await axios.delete(`${baseUrl}/user/${user.id}`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });

      console.log(response);
      setShowModal(!showModal);
      setUser("");
      setIsLogged(false);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Suppression impossible.");
      console.log(error);
    }
  };

  // Composant à afficher
  return (
    <div className="profil-user__container">
      {isLogged ? (
        <>
          <div className="profil-user__details">
            {profilUSer != [] && (
              <>
                <p className="profil-user__details--name">
                  <AiOutlineUser size={"30px"} /> {profilUSer.firstname}{" "}
                  {profilUSer.lastname}
                </p>
                <p>
                  <AiOutlineMail size={"30px"} /> {profilUSer.email}
                </p>
                <p>
                  <AiOutlinePhone size={"30px"} /> {profilUSer.phone}
                </p>
                <p>
                  <AiOutlineHome size={"30px"} /> {profilUSer.address}
                </p>
                <p className="center">
                  {" "}
                  {profilUSer.postal_code} {profilUSer.city}
                </p>
                <p className="center"> {profilUSer.country}</p>

                <p
                  className="profil-user__delete"
                  onClick={(e) => setShowModal(true)}
                >
                  <HiTrash size={"30px"} />
                  Supprimer mon profil
                </p>
                {showModal && (
                  <div className="profil-user__modal">
                    <div className="profil-user__modal--color">
                      <p>Êtes-vous sûr de vouloir continuer ?</p>
                      <p
                        className="profil-user__modal--boutton"
                        onClick={deleteProfil}
                      >
                        <span>Oui</span>
                      </p>
                      <p
                        className="profil-user__modal--boutton"
                        onClick={(e) => setShowModal(!showModal)}
                      >
                        <span>Non</span>
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="profil-user__form">
            <form>
              {errorMessage !== "" && (
                <p className="profil-user__form--error_message">
                  {errorMessage}{" "}
                  <RxCrossCircled
                    size="20px"
                    onClick={(e) => setErrorMessage("")}
                    className="profil-user__form--error_message--cross"
                  />
                </p>
              )}
              <p className="profil-user__form--section">
                Informations personnelles
              </p>
              <input
                className="profil-user__form--input"
                value={form.firstname}
                name="firstname"
                placeholder={profilUSer.firstname}
                onChange={handleFormChange}
              />
              <label className="profil-user__form--label" htmlFor="firstname">
                Prénom
              </label>

              <input
                className="profil-user__form--input"
                value={form.lastname}
                name="lastname"
                placeholder={profilUSer.lastname}
                onChange={handleFormChange}
              />
              <label className="profil-user__form--label" htmlFor="lastname">
                Nom
              </label>

              <input
                className="profil-user__form--input"
                value={form.phone}
                name="phone"
                placeholder={profilUSer.phone}
                type="tel"
                onChange={handleFormChange}
              />
              <label className="profil-user__form--label" htmlFor="phone">
                Téléphone
              </label>

              <p className="profil-user__form--section">Adresse</p>

              <input
                className="profil-user__form--input"
                value={form.address}
                name="address"
                placeholder={profilUSer.address}
                onChange={handleFormChange}
              />
              <label className="profil-user__form--label" htmlFor="address">
                Adresse
              </label>

              <input
                className="profil-user__form--input"
                value={form.postal_code}
                name="postal_code"
                placeholder={profilUSer.postal_code}
                onChange={handleFormChange}
              />
              <label className="profil-user__form--label" htmlFor="postal_code">
                Code postal
              </label>

              <input
                className="profil-user__form--input"
                value={form.city}
                name="city"
                placeholder={profilUSer.city}
                onChange={handleFormChange}
              />
              <label className="profil-user__form--label" htmlFor="city">
                Ville
              </label>

              <input
                className="profil-user__form--input"
                value={form.country}
                name="country"
                placeholder={profilUSer.country}
                onChange={handleFormChange}
              />
              <label className="profil-user__form--label" htmlFor="country">
                Pays
              </label>

              <p className="profil-user__form--section">Sécurité</p>

              <input
                className="profil-user__form--input"
                value={form.new_mail}
                name="new_mail"
                placeholder={profilUSer.email}
                type="email"
                onChange={handleFormChange}
              />
              <label className="profil-user__form--label" htmlFor="new_mail">
                E-mail
              </label>

              <input
                className="profil-user__form--input"
                value={form.mail_confirm}
                name="mail_confirm"
                placeholder="Confirmation e-mail"
                type="email"
                onChange={handleFormChange}
              />
              <label
                className="profil-user__form--label"
                htmlFor="mail_confirm"
              >
                Confirmation
              </label>

              <input
                className="profil-user__form--input"
                value={form.new_password}
                name="new_password"
                placeholder="Nouveau mot de passe"
                type="password"
                onChange={handleFormChange}
              />
              <label
                className="profil-user__form--label"
                htmlFor="new_password"
              >
                Mot de passe
              </label>

              <input
                className="profil-user__form--input"
                value={form.confirm_new_password}
                name="confirm_new_password"
                placeholder="Confirmation"
                type="password"
                onChange={handleFormChange}
              />
              <label
                className="profil-user__form--label"
                htmlFor="confirm_new_password"
              >
                Confirmation
              </label>

              <button
                onClick={handleSubmit}
                className="profil-user__form--button"
              >
                <span>Valider</span>
              </button>
            </form>
          </div>
          <div className="profil-user__tips">
            <HiLightBulb size={"40px"} className="profil-user__tips--light" />
            <p>
              Pour modifier vos préférences en matière de compagnon, c'est par
              ici :{" "}
              <Link to="/preferences" className="profil-user__tips--link">
                Préférences
              </Link>
            </p>
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
  );
};

ProfilUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    postal_code: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  isLogged: PropTypes.bool.isRequired,
};

export default ProfilUser;
