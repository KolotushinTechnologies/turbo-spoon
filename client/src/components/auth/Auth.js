// Import Engine
import React, { Fragment, useState } from "react";

// Import Components
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Modal from "../Modal/Modal";

// Import Styles
import "./Auth.css";
import NextArrow from "../../img/Next.png";

const Auth = ({ modalActive, setModalActive, loginStatus, setLoginStatus }) => {
  return (
    <Fragment>
      <Modal active={modalActive} setActive={setModalActive}>
        {loginStatus === false ? (
          <>
            <Registration closeModal={setModalActive} />
            <button
              className="submitButton modal_button modal__button-active"
              onClick={() => setLoginStatus(true)}
            >
              <p>У вас уже есть аккаунт?</p>
              <div>
                Войдите
                <img
                  className="next__arrow"
                  src={NextArrow}
                  width={20}
                  style={{ margin: "0 0 0 10px " }}
                />
              </div>
            </button>
            <div className="second-section__auth">
              <div className="wrapper-section__auth">
                <h2>
                  Зарегистрируйтесь, чтобы иметь возможность заказывать товары
                </h2>
                <button
                  className="submitButton modal_button"
                  onClick={() => setLoginStatus(true)}
                >
                  <p>У вас уже есть аккаунт?</p>
                  <div>
                    Войдите
                    <img
                      className="next__arrow"
                      src={NextArrow}
                      width={20}
                      style={{ margin: "0 0 0 10px " }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Login closeModal={setModalActive} />
            <button
              className="submitButton auth__button modal__button-active"
              onClick={() => setLoginStatus(false)}
            >
              Зарегистрируйтесь
              <img
                className="next__arrow"
                src={NextArrow}
                width={20}
                style={{ margin: "0 0 0 10px " }}
              />
            </button>
            <div className="second-section__auth">
              <div className="wrapper-section__auth">
                У вас нет аккаунта?
                <button
                  className="submitButton auth__button"
                  onClick={() => setLoginStatus(false)}
                >
                  Зарегистрируйтесь
                  <img
                    className="next__arrow"
                    src={NextArrow}
                    width={20}
                    style={{ margin: "0 0 0 10px " }}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </Fragment>
  );
};

export default Auth;
