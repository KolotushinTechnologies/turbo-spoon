// Import Engine
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/users";

// Import Components
import Auth from "../../auth/Auth";
import Menu from "./Menu";

// Import Styles
import MainLogo from "../../../img/MainLogo.png";
import FavoriteImage from "../../../img/FavoriteHeart.png";
import BasketImage from "../../../img/Basket.png";
import "./Header.css";

const Header = ({ userWork: { isAuthenticated, user }, logout }) => {
  // const [mainHeader, setMainHeader] = useState(false);
  // const [secondHeader, setSecondHeader] = useState(false);

  const [menuActive, setMenuActive] = useState(false);

  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const [pathname, pathnameSet] = useState("/");

  const navigate = useNavigate();

  useEffect(() => {
    pathnameSet(window.location.pathname);
    console.log(pathname);
    console.log(window.location.pathname);
    console.log(window.location);
  }, [window.location.pathname]);

  return (
    <header
      className={
        pathname == "/"
          ? "header"
          : pathname == "/about-us"
          ? "header2"
          : "header_no_cover"
      }
    >
      <div className="cover1">
        <div className={pathname == "" ? "contr1200" : "contr1111"}>
          <nav className="nav">
            <span className="logo">
              {" "}
              <Link to="/" className="menu_link link">
                <img src={MainLogo} width={"178"} height={"74"} />
              </Link>
            </span>
            {/* <!--Навигация для десктопа-->  */}
            <nav className="nav_menu_katalog">
              <ul className="menu_nav">
                <li className="menu_item">
                  <Link to="/products" className="menu_link link">
                    Каталог
                  </Link>
                </li>
                <li className="menu_item">
                  <Link to="/about-us" className="menu_link link">
                    О нас
                  </Link>
                </li>
                <li className="menu_item">
                  <Link to="/delivery" className="menu_link link">
                    Доставка
                  </Link>
                </li>
                <li className="menu_item">
                  {isAuthenticated ? (
                    <Link className="menu_link link" to="/dashboard">
                      Личный кабинет
                    </Link>
                  ) : (
                    <span
                      onClick={() => setModalActive(true)}
                      className="menu_link link"
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
                      <img src={FavoriteImage} width={"40"} height={"40"} />
                    </Link>
                  </li>
                  <li className="menu_item2">
                    <Link to="/my-basket">
                      <img src={BasketImage} width={"40"} height={"40"} />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="menu_item2">
                    <button onClick={() => setModalActive(true)}>
                      <img src={FavoriteImage} width={"40"} height={"40"} />
                    </button>
                  </li>
                  <li className="menu_item2">
                    <button onClick={() => setModalActive(true)}>
                      <img src={BasketImage} width={"40"} height={"40"} />
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
            {/* <div id="menu-tog" className="menu-icon">
              <div className="menu-icon-line"></div>
            </div> */}

            <div className="burger-btn" onClick={() => setMenuActive(true)}>
              <span />
            </div>
            <Menu
              // setSecondHeader={setSecondHeader}
              // setMainHeader={setMainHeader}
              menuActive={menuActive}
              modalActive={modalActive}
              setMenuActive={setMenuActive}
              setModalActive={setModalActive}
              setLoginStatus={setLoginStatus}
              loginStatus={loginStatus}
              isAuthenticated={isAuthenticated}
            />
          </nav>
        </div>
      </div>
      {/* {mainHeader && <div className="whiteline"></div>} */}
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
