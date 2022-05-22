// Import Engine
import React from "react";
import { Link } from "react-router-dom";

// Import Styles
import "./Footer.css";
import MainLogo from "../../../img/MainLogo.png";
import Wildeberries from "../../../img/Wildeberries.png";
import Telegram from "../../../img/Telegram.png";

const Footer = () => {
  return (
    <footer className="footer__section">
      <div className="bluline"></div>

      <div className="main-footer__section">
        <div className="first-footer__section">
          <div className="footer__logo">
            <Link className="link__logo" to="/">
              <img className="img__logo" src={MainLogo} />
            </Link>
          </div>
          <div className="footer__links">
            <Link to="/">Политика конфиденциальности</Link>
          </div>
        </div>

        <div className="second-footer__section">
          <div className="footer__social">
            <Link to="wildeberries.com">
              <img className="img__social" src={Wildeberries} />
            </Link>
            <Link to="telegram.org">
              <img className="img__social" src={Telegram} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
