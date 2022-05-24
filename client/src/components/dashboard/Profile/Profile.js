import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileInfoSettings from "./ProfileInfo/ProfileInfoSettings";

import "./Profile.css";

const Profile = ({
  avatar,
  fullName,
  login,
  email,
  phoneNumber,
  user,
  address,
  logout
}) => {
  const [mobileInfoHidden, setMobileInfoHidden] = useState(false);

  const [displayEditProfile, toggleEditProfile] = useState(false);

  const openProfileSettings = () => toggleEditProfile(!displayEditProfile);

  const [displayEditCompanyInfo, toggleEditCompanyInfo] = useState(false);

  const openCompanySettings = () =>
    toggleEditCompanyInfo(!displayEditCompanyInfo);

  const [displayEditWhatMake, toggleEditWhatMake] = useState(false);

  const openWhatMakeSettings = () => toggleEditWhatMake(!displayEditWhatMake);

  const editProfile = (
    <ProfileInfoSettings
      setMobileInfoHidden={setMobileInfoHidden}
      mobileInfoHidden={mobileInfoHidden}
      logout={logout}
      openProfileSettings={openProfileSettings}
      displayEditProfile={displayEditProfile}
      closeSettings={toggleEditProfile}
    />
  );

  // const editCompanyInfo = (
  //   <CompanyInfoSettings mobileInfoHidden={mobileInfoHidden} />
  // );

  const myProfile = (
    <ProfileInfo
      avatar={avatar}
      fullName={fullName}
      openProfileSettings={openProfileSettings}
      displayEditProfile={displayEditProfile}
      setMobileInfoHidden={setMobileInfoHidden}
      mobileInfoHidden={mobileInfoHidden}
      logout={logout}
      login={login}
      email={email}
      address={address}
      phoneNumber={phoneNumber}
    />
  );

  return <Fragment>{displayEditProfile ? editProfile : myProfile}</Fragment>;
};

export default Profile;
