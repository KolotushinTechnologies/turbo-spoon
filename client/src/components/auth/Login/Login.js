// Import Engine
import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../../actions/users";
import { useForm } from "react-hook-form";
import ErrorInput from "../ErrorInput";

// Import Styles
import "./Login.css";

const Login = ({ loginUser, closeModal, isAuthenticated }) => {
  const hookForm = useForm();
  const {
    handleSubmit,
    trigger,
    setValue,
    formState: { errors }
  } = hookForm;
  const reghook = (ref, options) => {
    return {
      ...hookForm.register(ref, options),
      maxLength:
        (options.maxLength && (options.maxLength.value || options.maxLength)) ||
        -1
    };
  };

  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });

  const { login, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const onSubmit = (e) => {
    /* e.preventDefault(); */
    loginUser(login, password);
    closeModal(false);
  };

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <Fragment>
      <form className="authorizingBlock" onSubmit={handleSubmit(onSubmit)}>
        <div className="authField">
          {/* <span className="authFieldName">Введите свой логин</span> */}
          {/* <input
            className="authFieldInput"
            placeholder="Email or Login"
          ></input> */}
          <ErrorInput
            className="authFieldInput"
            type="text"
            placeholder="Ваш логин"
            /* name="email" */
            aria-invalid={!!errors.login + ""}
            {...reghook("login", {
              required: "Empty field",
              maxLength: 320,
              minLength: 1,
              pattern:
                /^[a-z0-9\.\$\%\#\,\-\+\=\_\(\)\{\}\!\"\'\|\;\:\<\>]+@[a-z0-9]+\.[a-z0-9]+$|^[a-z0-9]+$/i
            })}
            value={login}
            onChange={onChange}
            error={errors.login}
          />
        </div>
        <div className="authField">
          {/* <span className="authFieldName">Введите пароль</span> */}
          {/* <input className="authFieldInput" placeholder=" Password"></input> */}
          <ErrorInput
            className="authFieldInput"
            type="password"
            placeholder="Введите пароль"
            /* name="password" */
            aria-invalid={!!errors.password + ""}
            {...reghook("password", { required: "Empty field", minLength: 6 })}
            value={password}
            onChange={onChange}
            error={errors.password}
          />
        </div>
        <div className="submitButtonDiv">
          <button className="submitButton" type="submit">
            Вход
          </button>
        </div>
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userWork.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);
