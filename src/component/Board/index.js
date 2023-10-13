import "./styles.scss";

import { Link } from "react-router-dom";
import { IoIosPaw, IoMdPeople, IoIosHeart } from "react-icons/io";

const Board = () => {
  return (
    <div className="board_container">
      <Link to="/animals">
        <button className="board_container_menu">
          <span>
            <IoIosPaw size={"7vh"} className="board_container_menu--icon" />{" "}
            Profils des animaux
          </span>
        </button>
      </Link>
      <Link to="/users">
        <button className="board_container_menu">
          <span>
            <IoMdPeople size={"7vh"} className="board_container_menu--icon" />{" "}
            Profils des utilisateurs
          </span>
        </button>
      </Link>
      <Link to="/adoptions">
        <button className="board_container_menu">
          <span>
            <IoIosHeart size={"7vh"} className="board_container_menu--icon" />{" "}
            Demandes d'adoption
          </span>
        </button>
      </Link>
      <Link to="/filtres">
        <button className="board_container_menu">
          <span>
            <IoIosHeart size={"7vh"} className="board_container_menu--icon" />{" "}
            Filtres
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Board;
