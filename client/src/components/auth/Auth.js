// Import Engine
import React, { Fragment, useState } from "react";

// Import Components
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Modal from "../Modal/Modal";

// import "./Auth.css";

const Auth = ({ modalActive, setModalActive, loginStatus, setLoginStatus }) => {
  return (
    <Fragment>
      <Modal active={modalActive} setActive={setModalActive}>
        {loginStatus === false ? (
          <>
            <Registration closeModal={setModalActive} />
            <div className="second-section__auth">
              <p>
                Зарегистрированы?
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={() => setLoginStatus(true)}
                >
                  Вход
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <Login closeModal={setModalActive} />
            <div className="second-section__auth">
              <p>
                Нет аккаунта?
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={() => setLoginStatus(false)}
                >
                  Регистрация
                </button>
              </p>
            </div>
          </>
        )}
      </Modal>
    </Fragment>
  );
};

export default Auth;
