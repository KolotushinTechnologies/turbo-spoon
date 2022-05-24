// Import Engine
import React from "react";
import { Link } from "react-router-dom";

// Import Components
import Auth from "../../auth/Auth";

// Import Styles
import MainLogo from "../../../img/MainLogo.png";
import FavoriteImage from "../../../img/FavoriteHeart.png";
import BasketImage from "../../../img/Basket.png";
import { AiFillCloseCircle } from "react-icons/ai";

const Menu = ({
  setMenuActive,
  setMainHeader,
  menuActive,
  modalActive,
  setModalActive,
  setLoginStatus,
  loginStatus,
  isAuthenticated
}) => {
  return (
    <div className={menuActive ? "menu__burger menu__active" : "menu__burger"}>
      <div className="menu__content">
        <div className="menu__close">
          <button
            className="button-menu-close"
            onClick={() => setMenuActive(false)}
          >
            <AiFillCloseCircle />
          </button>
        </div>
        <ul className="menu__nav">
          <li className="menu__item">
            <Link
              to="/products"
              className="menu__link link"
              onClick={() => {
                setMainHeader(false);
                setMenuActive(false);
              }}
            >
              Каталог
            </Link>
          </li>
          <li className="menu__item">
            <Link
              to="/about-us"
              className="menu__link link"
              onClick={() => {
                setMainHeader(false);
                setMenuActive(false);
              }}
            >
              О нас
            </Link>
          </li>
          <li className="menu__item">
            <Link
              to="/delivery"
              className="menu__link link"
              onClick={() => {
                setMainHeader(false);
                setMenuActive(false);
              }}
            >
              Доставка
            </Link>
          </li>
          <li className="menu__item">
            {isAuthenticated ? (
              <Link
                className="menu__link link"
                to="/dashboard"
                onClick={() => {
                  setMainHeader(false);
                  setMenuActive(false);
                }}
              >
                Личный кабинет
              </Link>
            ) : (
              <span
                className="menu__link link"
                onClick={() => {
                  // setMainHeader(false);
                  setModalActive(true);
                  setMenuActive(false);
                }}
              >
                Личный кабинет
              </span>
            )}
          </li>
        </ul>

        <ul className="menu__nav2">
          {isAuthenticated ? (
            <>
              <li className="menu__item2">
                <Link
                  to="/favorites"
                  onClick={() => {
                    setMainHeader(false);
                    setMenuActive(false);
                  }}
                >
                  <img src={FavoriteImage} width={"40"} height={"40"} />
                </Link>
              </li>
              <li className="menu__item2 button_item-basket">
                <Link
                  to="/my-basket"
                  onClick={() => {
                    setMainHeader(false);
                    setMenuActive(false);
                  }}
                >
                  <img src={BasketImage} width={"40"} height={"40"} />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="menu__item2">
                <button
                  className="button__item-favorite"
                  onClick={() => {
                    setModalActive(true);
                    setMenuActive(false);
                  }}
                >
                  <img src={FavoriteImage} width={"40"} height={"40"} />
                </button>
              </li>
              <li className="menu__item2">
                <button
                  className="button_item-basket"
                  onClick={() => {
                    setModalActive(true);
                    setMenuActive(false);
                  }}
                >
                  <img src={BasketImage} width={"40"} height={"40"} />
                </button>
              </li>
            </>
          )}
        </ul>
        <Auth
          modalActive={modalActive}
          setModalActive={setModalActive}
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
        />
      </div>
    </div>
  );
};

export default Menu;
