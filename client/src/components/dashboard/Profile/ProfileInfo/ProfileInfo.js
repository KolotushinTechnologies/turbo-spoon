// Import Engine
import React from "react";

// Import Styles
import "./ProfileInfo.css";
import DefaultAvatar from "../../../../img/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
import EditPage from "../../../../img/edit.png";

const ProfileInfo = ({
  avatar,
  fullName,
  openProfileSettings,
  displayEditProfile,
  logout,
  setMobileInfoHidden,
  mobileInfoHidden = true,
  login,
  email,
  address,
  phoneNumber
}) => {
  return (
    <>
      <h1 className="edit-section-profile">
        Ваш Профиль
        <div className="editExitButtonsDiv">
          <button onClick={openProfileSettings} className="editButton">
            {displayEditProfile ? (
              <img className="edit-page-button" src={EditPage} />
            ) : (
              <img className="edit-page-button" src={EditPage} />
            )}
          </button>
        </div>
      </h1>
      <div className="profileInfo" active={!mobileInfoHidden + ""}>
        <div className="profileImageDiv">
          {avatar ? (
            <img
              className="profileImage"
              src={avatar?.url}
              alt={`Фото Пользователя ${avatar?.user}`}
            />
          ) : (
            <img className="profileImage" src={DefaultAvatar} alt="Нет Фото" />
          )}
          <button onClick={logout} className="exitButton">
            Выход
          </button>
        </div>

        <div className="profileInfoContent">
          <div className="nameAndButtonsDiv">
            <div className="nameAndRoleDiv">
              <span className="profileNameText">{fullName}</span>
            </div>
            {/* <div className="editExitButtonsDiv">
              <button onClick={openProfileSettings} className="editButton">
                {displayEditProfile ? "Отмена" : "Редактировать"}
              </button>
            </div> */}
          </div>
          <span className="profileLogin">{login}</span>
          <div className="profileMoreInfo">
            <div className="profileMoreInfoDiv">
              <div
                className={`profMoreInfoBlock profMoreInfoBlock2 profMobileHiddenBlock2`}
                // isseller={iAmSeller + ""}
                // active={!mobileInfoHidden + ""}
              >
                {/* <span className="profInfoHeader">E-mail</span> */}
                <span className="profInfoContent">{email}</span>
                {/* <label className="profEmailHowLogin">
                <input type="checkbox" />
                <span>Use how login</span>
              </label> */}
              </div>
            </div>
            <div className="profileMoreInfoDiv">
              <div
                className={`profMoreInfoBlock profMoreInfoBlock2 profMobileHiddenBlock2`}
                // isseller={iAmSeller + ""}
                // active={!mobileInfoHidden + ""}
              >
                {/* <span className="profInfoHeader">Ваш адрес</span> */}
                <span className="profInfoContent">{address}</span>
                {/* <label className="profEmailHowLogin">
                <input type="checkbox" />
                <span>Use how login</span>
              </label> */}
              </div>
            </div>
            <div className="profileMoreInfoDiv">
              <div
                className={`profMoreInfoBlock profMoreInfoBlock2 profMobileHiddenBlock1`}
                // isseller={iAmSeller + ""}
                // active={!mobileInfoHidden + ""}
              >
                {/* <span className="profInfoHeader">Номер телефона</span> */}
                <span className="profInfoContent">{phoneNumber}</span>
              </div>
            </div>
            <div
              className="profileMoreInfoDiv passwordContentDiv"
              // isseller={iAmSeller + ""}
              // active={!mobileInfoHidden + ""}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
