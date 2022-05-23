// Import Engine
import React, { useState, useEffect, Fragment, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyUserProfile, updateMyProfile } from "../../../../actions/users";

// Import Styles
import "./ProfileInfo.css";
import DefaultAvatar from "../../../../img/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
import Spinner from "../../../layout/Spinner";
import ErrorMessage from "../../../auth/ErrorMessage";
import ErrorInput from "../../../auth/ErrorInput";

const initialState = {
  login: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  password: "",
  password2: "",
  avatar: ""
};

const ProfileInfoSettings = ({
  userWork: { user, loading },
  getMyUserProfile,
  updateMyProfile,
  updateMyProfileAndUploadAvatar,
  mobileInfoHidden = true,
  logout,
  openProfileSettings,
  displayEditProfile,
  closeSettings
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const avatarForm = useForm({ mode: "all" });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    reset,
    formState: { submitCount, touchedFields, errors, isDirty }
  } = useForm({ mode: "all", defaultValues: formData });

  useEffect(() => {
    if (avatarForm.getValues("avatar").length > 0)
      avatarForm.handleSubmit(onSubmitFile)();
  }, [avatarForm.watch("avatar")]);

  useEffect(() => {
    if (!user) getMyUserProfile();
    if (!loading && user) {
      const userData = { ...initialState };
      console.log({ ...initialState });
      for (const key in user) {
        if (key in userData) userData[key] = user[key];
      }
      setFormData(userData);
      reset(userData);
    }
  }, [loading, getMyUserProfile, user]);

  const { login, fullName, email, phoneNumber, address, password, avatar } =
    formData;

  const [avatarIsLoading, setAvatarLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    /* e.preventDefault(); */
    console.log(formData);
    console.log(updateMyProfile);
    if (isDirty) updateMyProfile(formData, navigate);
    closeSettings(false);
  };

  const onSubmitFile = async (e) => {
    console.log(e.avatar[0]);

    const data = new FormData();
    data.append("file", e.avatar[0]);
    setAvatarLoading(true);
    updateMyProfileAndUploadAvatar(data);
  };

  useEffect(() => {
    setAvatarLoading(false);
  }, [avatar]);

  return (
    <Fragment>
      <div className="profileInfo" active={!mobileInfoHidden + ""}>
        <form
          className="profileImageDiv"
          onSubmit={avatarForm.handleSubmit(onSubmitFile)}
          action="#"
          encType="multipart/form-data"
        >
          {!avatarIsLoading && (
            <div className="donloadImgBg">Нажмите для загрузки аватара</div>
          )}
          {avatarIsLoading ? (
            <Spinner />
          ) : avatar && avatar?.url ? (
            <img className="profileImage" src={avatar?.url} alt="Нет Фото" />
          ) : (
            <img className="profileImage" src={DefaultAvatar} alt="Нет Фото" />
          )}
          <input
            type="file"
            id="file"
            {...avatarForm.register("avatar", {
              required: true,
              validate: {
                fileType: (files) =>
                  files[0]?.type == "image/jpeg" ||
                  files[0]?.type == "image/png" ||
                  "Image type can be only PNG and JPEG",
                fileSize: (files) =>
                  files[0]?.size / 1024 / 1024 <= 10 || "Image size > 10mb"
              }
            })}
            accept="image/jpeg,image/png"
          />
          <button onClick={logout} className="exitButton">
            Выход
          </button>
          {/* <input type="submit" value="Save" /> */}
          <ErrorMessage
            error={avatarForm.formState.errors.avatar}
            message={avatarForm.formState.errors.avatar?.message}
          />
        </form>
        <form className="profileInfoContent" onSubmit={handleSubmit(onSubmit)}>
          <div className="nameAndButtonsDiv">
            <div className="nameAndRoleDiv">
              {/* <span className="profileNameText">{fullname}</span> */}
              <ErrorInput
                className="profileNameText profInfoInput"
                type="text"
                placeholder="Полное имя"
                /* name="fullname" */
                aria-invalid={!!errors.fullName + ""}
                {...register("fullName", {
                  required: "Empty field",
                  maxLength: {
                    value: 30,
                    message: "Максимальное количество символов: 30"
                  },
                  minLength: 1,
                  pattern: /^[a-z0-9]+(|\s([a-z0-9]+)|-([a-z0-9]+))$/i,
                  onChange: onChange
                })}
                value={fullName}
                errorstyle={{ marginTop: "-24px", marginLeft: "-6px" }}
                error={errors.fullName}
              />
              {/* <span className="profileRoleText">
                {iAmSeller === false ? "Buyer" : "Seller"}
              </span> */}
            </div>
            {/* <span
              className="moreDetailsText"
              active={!mobileInfoHidden + ""}
              onClick={() => setMobileInfoHidden(!mobileInfoHidden)}
              isseller={iAmSeller + ""}
            >
              More details
              <img src={ButtonBackArrow} />
            </span> */}
            <div className="editExitButtonsDiv">
              <button onClick={openProfileSettings} className="editButton">
                {displayEditProfile ? "Отмена" : "Редактировать"}
              </button>
              {/* <button onClick={logout} className="exitButton">
                Выход
              </button> */}
            </div>
          </div>
          {/* <span className="profileLogin">{login}</span> */}
          <div className="nameAndRoleDiv">
            {/* <span className="profileNameText">{fullname}</span> */}
            <ErrorInput
              className="profileNameText profInfoInput"
              type="text"
              placeholder="Логин"
              /* name="fullname" */
              aria-invalid={!!errors.login + ""}
              {...register("login", {
                required: "Empty field",
                maxLength: {
                  value: 30,
                  message: "Максимальное количество символов: 30"
                },
                minLength: 1,
                pattern: /^[a-z0-9]+(|\s([a-z0-9]+)|-([a-z0-9]+))$/i,
                onChange: onChange
              })}
              value={login}
              errorstyle={{ marginTop: "-24px", marginLeft: "-6px" }}
              error={errors.login}
            />
            {/* <span className="profileRoleText">
                {iAmSeller === false ? "Buyer" : "Seller"}
              </span> */}
          </div>
          <div className="profileMoreInfo">
            <div className="profileMoreInfoDiv">
              {/* <div
                className={`profMoreInfoBlock profMoreInfoBlock2 profMobileHiddenBlock2`
                }
                isseller={iAmSeller + ""}
                active={!mobileInfoHidden + ""}
              > */}
              {/* <span className="profInfoHeader">Ваш E-mail</span> */}
              <ErrorInput
                className="profInfoInput"
                type="text"
                placeholder="Ваш Email"
                aria-invalid={!!errors.email + ""}
                {...register("email", {
                  required: "Empty field",
                  maxLength: {
                    value: 320,
                    message: "Максимальное количество символов у Email: 320"
                  },
                  minLength: 1,
                  pattern:
                    /^[a-z0-9\.\$\%\#\,\-\+\=\_\(\)\{\}\!\"\'\|\;\:\<\>]+@[a-z0-9]+\.[a-z0-9]+$/i,
                  onChange: onChange
                })}
                value={email}
                error={errors.email}
              />
              {/* <div className="profEmailHowLogin">
                  <input type="checkbox" />
                  <span>Use how login</span>
                </div> */}
              {/* </div> */}
            </div>
            <div className="profileMoreInfoDiv">
              {/* <div
                className={`profMoreInfoBlock ${
                  !iAmSeller && "profMoreInfoBlock2"
                } ${
                  iAmSeller
                    ? "profMobileHiddenBlock2"
                    : "profMobileHiddenBlock1"
                }`}
                isseller={iAmSeller + ""}
                active={!mobileInfoHidden + ""}
              > */}
              {/* <span className="profInfoHeader">Ваш номер телефона</span> */}
              <ErrorInput
                className="profInfoInput"
                type="text"
                placeholder="Ваш номер телефона"
                aria-invalid={!!errors.phoneNumber + ""}
                {...register("phoneNumber", {
                  required: "Empty field",
                  maxLength: {
                    value: 12,
                    message: "Количество символов должно быть 12"
                  },
                  minLength: {
                    value: 12,
                    message: "Количество символов должно быть 12"
                  },
                  pattern: /^\+[0-9]+$/i,
                  onChange: onChange
                })}
                value={phoneNumber}
                error={errors.phoneNumber}
              />

              {/* <span className="profInfoHeader">Ваш адрес</span> */}
              <ErrorInput
                className="profInfoInput"
                type="text"
                placeholder="Ваш адрес"
                aria-invalid={!!errors.address + ""}
                {...register("address", {
                  required: "Empty field",
                  maxLength: {
                    value: 12,
                    message: "Количество символов должно быть 12"
                  },
                  minLength: {
                    value: 12,
                    message: "Количество символов должно быть 12"
                  },
                  pattern: /^[a-z0-9]+(|\s([a-z0-9]+)|-([a-z0-9]+))$/i,
                  onChange: onChange
                })}
                value={address}
                error={errors.address}
              />
              {/* </div> */}
              <button
                type="submit"
                className="submitButton profileChangeButton"
                active={!mobileInfoHidden + ""}
              >
                Изменить настройки
              </button>
            </div>
            <div
              className="profileMoreInfoDiv passwordContentDiv"
              // isseller={iAmSeller + ""}
              // active={!mobileInfoHidden + ""}
            >
              <span className="profInfoHeader">Пароль</span>
              <input className="passwordText" readOnly value="* * * * * * *" />
              <button className="profChangePassButton">Изменить пароль</button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

ProfileInfoSettings.propTypes = {
  userWork: PropTypes.object.isRequired,
  updateMyProfile: PropTypes.func.isRequired,
  getMyUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userWork: state.userWork
});

export default connect(mapStateToProps, {
  updateMyProfile,
  getMyUserProfile
})(ProfileInfoSettings);
