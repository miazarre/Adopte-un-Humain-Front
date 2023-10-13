import "./styles.scss";
import { FaTiktok, FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import React from "react";

const Footer = () => {
  return (
    <div className="footer__container">
      <p>Mentions légales</p>
      <div className="footer__container--icons-div">
        <FaTiktok
          size={"30px"}
          className="footer__container--icons-div--icon"
        />
        <AiOutlineTwitter
          size={"30px"}
          className="footer__container--icons-div--icon"
        />
        <FaFacebookF
          size={"30px"}
          className="footer__container--icons-div--icon"
        />
      </div>
    </div>
  );
};

export default Footer;
