// Import Engine
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/users";

// Import Components
import Auth from "../../auth/Auth";

// Import Styles
import MainLogo from "../../../img/MainLogo.png";
import FavoriteImage from "../../../img/избр1.png";
import BasketImage from "../../../img/корзина1.png";
import "./Header.css";

const Header = ({ userWork: { isAuthenticated, user }, logout }) => {
  const [mainHeader, setMainHeader] = useState(false);

  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <header className={mainHeader ? "header" : "header_no_cover"}>
      <div className="cover1">
        <div className={mainHeader ? "contr1200" : "contr1111"}>
          <nav className="nav">
            <span className="logo">
              {" "}
              <Link to="/" onClick={() => setMainHeader(true)}>
                <img src={MainLogo} width={"178"} height={"74"} />
              </Link>
            </span>
            {/* <!--Навигация для десктопа-->  */}
            <nav className="nav_menu_katalog">
              <ul className="menu_nav">
                <li className="menu_item">
                  <Link
                    to="/products"
                    className="menu_link link"
                    onClick={() => setMainHeader(false)}
                  >
                    Каталог
                  </Link>
                </li>
                <li className="menu_item">
                  <Link
                    to="/about"
                    className="menu_link link"
                    onClick={() => setMainHeader(false)}
                  >
                    О нас
                  </Link>
                </li>
                <li className="menu_item">
                  <Link
                    to="/"
                    className="menu_link link"
                    onClick={() => setMainHeader(false)}
                  >
                    Доставка
                  </Link>
                </li>
                <li className="menu_item">
                  {isAuthenticated ? (
                    <Link
                      className="menu_link link"
                      to="/dashboard"
                      onClick={() => setMainHeader(false)}
                    >
                      Личный кабинет
                    </Link>
                  ) : (
                    <span
                      className="menu_link link"
                      onClick={() => {
                        // setMainHeader(false);
                        setModalActive(true);
                      }}
                    >
                      Личный кабинет
                    </span>
                  )}
                </li>
              </ul>
            </nav>
            <ul className="menu_nav">
              {isAuthenticated ? (
                <>
                  <li className="menu_item2">
                    <Link to="/favorites">
                      <img src={FavoriteImage} width={"50"} height={"50"} />
                    </Link>
                  </li>
                  <li className="menu_item2">
                    <Link to="/my-basket">
                      <img src={BasketImage} width={"50"} height={"50"} />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="menu_item2">
                    <button onClick={() => setModalActive(true)}>
                      <img src={FavoriteImage} width={"50"} height={"50"} />
                    </button>
                  </li>
                  <li className="menu_item2">
                    <button onClick={() => setModalActive(true)}>
                      <img src={BasketImage} width={"50"} height={"50"} />
                    </button>
                  </li>
                </>
              )}
            </ul>
            {/* Registration And Authorization */}
            <Auth
              modalActive={modalActive}
              setModalActive={setModalActive}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />

            {/* <!-- кнопка Мобильная навигация--> */}
            <div id="menu-tog" className="menu-icon">
              <div className="menu-icon-line"></div>
            </div>

            {/* <!--Мобильная навигация--> */}
            {/* <div id="mobile-nav" className="mobile-nav">
              <div className="mobile-nav-title"> </div>
              <ul className="mobile-nav-list">
                <li>
                  <Link to="/" className="link3">
                    Каталог
                  </Link>
                </li>
                <li>
                  <Link to="/" className="link3">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link to="/" className="link3">
                    Доставка
                  </Link>
                </li>
                <li>
                  <Link to="/" className="link3">
                    Личный кабинет
                  </Link>
                </li>
              </ul>
            </div> */}
          </nav>
        </div>
      </div>
      {mainHeader && <div className="whiteline"></div>}
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  userWork: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userWork: state.userWork
});

export default connect(mapStateToProps, { logout })(Header);
