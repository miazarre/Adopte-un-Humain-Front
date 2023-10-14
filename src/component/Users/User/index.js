import "../styles.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { FiTrash2 } from "react-icons/fi";
import { TfiSave } from "react-icons/tfi";

const baseUrl = process.env.REACT_APP_BASE_URL;

const User = ({ lastname, firstname, id, role_id, fetchData }) => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState([]);

  const token = localStorage.getItem("token");
  const newToken = JSON.parse(token);
  const reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${newToken}`,
    },
  });

  const onDelete = async (id) => {
    await reqInstance
      .delete(`${baseUrl}/admin/user/${id}`)
      .then(setData(data))
      .catch((error) => {
        console.error(error.message);
      });
    window.confirm("Le profil de cet utilisateur a bien été supprimé");
    fetchData();
  };

  const onOptionChange = (e) => {
    console.log(e.target.value);

    if (e.target.value === "membre") {
      setRole(1);
    } else if (e.target.value === "admin") {
      setRole(3);
    } else if (e.target.value === "staff") {
      setRole(2);
    }
  };

  const onPatch = async (id) => {
    try {
      console.log(role);
      const response = await axios.patch(
        `${baseUrl}/admin/user/${id}`,
        {
          role_id: role,
        },
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  let newRole;
  if (role_id === 1) {
    newRole = <p>membre</p>;
  } else if (role_id === 2) {
    newRole = <p>staff</p>;
  } else if (role_id === 3) {
    newRole = <p>admin</p>;
  }

  console.log(data);

  return (
    <tr className="user_table">
      <td>{lastname}</td>
      <td>{firstname}</td>
      <td>
        <label for="role-selector" className="user-select">
          {newRole}
        </label>
        <select onChange={onOptionChange} id="role-selector">
          <option value="membre">membre</option>
          <option value="staff">staff</option>
          <option value="admin">admin</option>
        </select>

        <TfiSave
          size={"2vh"}
          className="animals_container-title-table--icon"
          onClick={() => {
            const confirmation = window.confirm(
              "Etes-vous sûr de vouloir modifier ce rôle ?",
            );
            if (confirmation) {
              console.log("OK on modifie");
              onPatch(id);
            } else {
              console.log("On annule");
            }
          }}
        />
      </td>
      <td>
        <FiTrash2
          size={"3vh"}
          className="users_container-title-table--icon"
          onClick={() => {
            const confirmation = window.confirm(
              "Etes-vous sûr de vouloir supprimer ce profil utilisateur ?",
            );
            if (confirmation) {
              console.log("OK on supprime");
              onDelete(id);
            } else {
              console.log("On annule");
            }
          }}
        />
      </td>
    </tr>
  );
};

User.propTypes = {
  lastname: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name_role: PropTypes.string.isRequired,
};

export default User;
