// Import Engine
import React, { createRef, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { registration } from "../../../actions/users";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

// Import Styles
import "./Registration.css";
import showPasswordImage from "../../../img/showPassword.png";
import NextArrow from "../../../img/Next.png";
// import selectArrow from "../../../img/selectArrow.png";
import ErrorInput from "../ErrorInput";

const Registration = ({
  setAlert,
  registration,
  closeModal,
  isAuthenticated
}) => {
  const hookForm = useForm({ mode: "all" });
  const {
    handleSubmit,
    trigger,
    setValue,
    formState: { submitCount, touchedFields, errors, dirtyFields }
  } = hookForm;
  const reghook = (ref, options) => {
    return {
      ...hookForm.register(ref, options),
      maxLength:
        (options.maxLength && (options.maxLength.value || options.maxLength)) ||
        -1
    };
  };
  /* console.log(watch("fullname")) */
  console.log(errors);

  const [formData, setFormData] = useState({
    login: "",
    fullName: "",
    email: "",
    phoneMask: "+7",
    phoneNumber: "",
    address: "",
    password: "",
    password2: ""
  });

  // const [iAmSeller, setiAmSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [avatarForm, setAvatarForm] = useState();

  const {
    login,
    fullName,
    email,
    phoneMask,
    phoneNumber,
    address,
    password,
    password2
  } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    /* setValue(e.target.name, e.target.value);
    trigger(e.target.name);
    touchedFields[e.target.name] = true; */
  };

  const onSubmit = async (e) => {
    /* e.preventDefault(); */

    const formdata = new FormData();
    formdata.append("file", avatarForm);
    formdata.append("login", login);
    formdata.append("password", password);
    formdata.append("email", email);
    formdata.append("phoneNumber", phoneNumber);
    formdata.append("address", address);
    formdata.append("fullName", fullName);

    console.log(avatarForm);
    console.log(...formdata);

    registration(formdata, navigate);
    closeModal(false);
  };

  const phoneField = (
    <div className="authField">
      {/* <span className="authFieldName">Введите номер телефона</span> */}
      <div className="phoneFieldDiv">
        <input
          className="authFieldInput"
          type="text"
          placeholder=""
          /* name="phoneNumber" */
          aria-invalid={!!errors.phoneNumber + ""}
          {...reghook("phoneNumber", {
            required: "Обязательное поле",
            maxLength: { value: 10, message: "Должно быть 10 символов" },
            minLength: { value: 10, message: "Должно быть 10 символов" },
            pattern: /^[0-9]+$/i,
            onChange: onChange
          })}
          value={phoneNumber}
        />
        {/* <input className="authFieldInput phoneNum"></input> */}
      </div>
      <ErrorMessage
        error={errors.phoneNumber}
        message={errors.phoneNumber && errors.phoneNumber.message}
      />
    </div>
  );

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <Fragment>
      <form
        encType="multipart/form-file"
        className="authorizingBlock"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Регистрация</h2>
        <div className="regLeftBlock">
          <div className="authField">
            {/* <span className="authFieldName">Придумайте логин</span> */}
            {/* <span className="authFieldSubName">
              Latin letters and numbers without spaces
            </span> */}
            <ErrorInput
              className="authFieldInput"
              type="text"
              placeholder="Придумайте логин"
              /* name="login" */
              aria-invalid={!!errors.login + ""}
              {...reghook("login", {
                required: "Обязательное поле",
                maxLength: 320,
                minLength: 1,
                pattern:
                  /.+/gi /* /^[a-z0-9\.\$\%\#\,\-\+\=\_\(\)\{\}\!\"\'\|\;\:\<\>]+@[a-z0-9]+\.[a-z0-9]+$/i */,
                onChange: onChange
              })}
              value={login}
              error={errors.login}
            />
          </div>
          <div className="authField">
            {/* <span className="authFieldName">Введите полное имя</span> */}
            <ErrorInput
              className="authFieldInput"
              type="text"
              placeholder="Ваше полное имя"
              /* name="fullName" */
              aria-invalid={!!errors.fullName + ""}
              {...reghook("fullName", {
                required: "Обязательное поле",
                maxLength: { value: 30, message: "Length more than 30" },
                minLength: 1,
                pattern: /^[a-z0-9]+(|\s([a-z0-9]+)|-([a-z0-9]+))$/i,
                onChange: onChange
              })} /* TODO: Сделать поддержку других языков  */
              value={fullName}
              error={errors.fullName}
            />
          </div>
          <div className="authField">
            {/* <span className="authFieldName">Введите свой Email</span> */}
            {/* <input className="authFieldInput" placeholder="Email"></input> */}
            <ErrorInput
              className="authFieldInput"
              type="email"
              placeholder="Введите Ваш Email"
              /* name="email" */
              aria-invalid={!!errors.email + ""}
              {...reghook("email", {
                required: "Обязательное поле",
                maxLength: { value: 320, message: "Email greater than 320" },
                minLength: 1,
                pattern:
                  /^[a-z0-9\.\$\%\#\,\-\+\=\_\(\)\{\}\!\"\'\|\;\:\<\>]+@[a-z0-9]+\.[a-z0-9]+$/i,
                onChange: onChange
              })}
              value={email}
              error={errors.email}
            />
          </div>

          {phoneField}
          <div className="authField">
            {/* <span className="authFieldName">Придумайте пароль</span> */}
            {/* <span className="authFieldSubName">
              Минимальный размер пароля: 6 символов
            </span> */}
            <input
              className="authFieldInput"
              type={showPassword ? "text" : "password"}
              placeholder="Придумайте пароль"
              /* name="password" */
              aria-invalid={!!errors.password + ""}
              {...reghook("password", {
                required: "Обязательное поле",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть 6 символов"
                },
                onChange: onChange
              })}
              value={password}
            />
            <img
              onClick={() => setShowPassword(!showPassword)}
              className="regShowPassword"
              src={showPasswordImage}
            />
            <ErrorMessage
              error={errors.password}
              message={errors.password && errors.password.message}
            />
          </div>
          <div className="authField">
            {/* <span className="authFieldName">Повторите пароль</span> */}
            <input
              className="authFieldInput"
              type={showPassword2 ? "text" : "password"}
              placeholder="Подтвердите пароль"
              /* name="password2" */
              aria-invalid={!!errors.password2 + ""}
              {...reghook("password2", {
                required: "Обязательное поле",
                validate: {
                  value: (value) => password == value || "Пароли не совпадают"
                },
                onChange: onChange
              })}
              value={password2}
            />
            <img
              onClick={() => setShowPassword2(!showPassword2)}
              className="regShowPassword"
              src={showPasswordImage}
            />
            <ErrorMessage
              error={errors.password2}
              message={errors.password2 && errors.password2.message}
            />
          </div>
          <div className="authField">
            {/* <span className="authFieldName">Введите адрес</span> */}
            <ErrorInput
              className="authFieldInput"
              type="text"
              placeholder="Ваш адрес"
              /* name="fullname" */
              aria-invalid={!!errors.address + ""}
              {...reghook("address", {
                required: "Обязательное поле",
                maxLength: {
                  value: 100,
                  message: "Максимальное количество символов: 100"
                },
                minLength: 1,
                pattern: /^[a-z0-9]+(|\s([a-z0-9]+)|-([a-z0-9]+))$/i,
                onChange: onChange
              })} /* TODO: Сделать поддержку других языков  */
              value={address}
              error={errors.address}
            />
          </div>
          <div className="authField">
            <span className="authFieldName">Добавить фото</span>
            <input
              // className="regDownloadImageInput"
              type="file"
              name="avatar"
              onChange={(e) => {
                e.preventDefault();
                const fileAvatar = e.target.files[0];
                setAvatarForm(fileAvatar);
              }}
              accept="image/*"
            />
          </div>
        </div>
        <div className="submitButtonDiv">
          <button
            type="submit"
            className="submitButton auth__button"
            style={{ fontSize: "16px" }}
          >
            Зарегистрироваться{" "}
            <img
              className="next__arrow"
              src={NextArrow}
              width={20}
              style={{ margin: "0 0 0 10px " }}
            />
          </button>
        </div>
      </form>
    </Fragment>
  );
};

Registration.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registration: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userWork.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, registration })(
  Registration
);
