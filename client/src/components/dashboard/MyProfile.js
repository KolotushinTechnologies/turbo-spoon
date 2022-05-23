// Import Engine
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getMyUserProfile,
  //   getMyFavorites,
  logout,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
} from "../../actions/users";

// Import Components
import Profile from "./Profile/Profile";
// import Product from "../product/Product";
import FavoritesMyProfile from "../favorites/FavoritesMyProfile";

// Import Styles
import "./MyProfile.css";

const MyProfile = ({
  getMyUserProfile,
  //   getMyFavorites,
  userWork: { isAuthenticated, user, loading },
  logout,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
}) => {
  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    getMyUserProfile();
  }, [getMyUserProfile]);

  //   useEffect(() => {
  //     getMyFavorites();
  //   }, [getMyFavorites]);

  return (
    <Fragment>
      <div className="main-section__profile">
        <div className="first-section__profile">
          <Profile
            // avatar={avatar && avatar}
            fullName={user?.fullName && user?.fullName}
            login={user?.login && user?.login}
            address={user?.address && user?.address}
            email={user?.email && user?.email}
            phoneNumber={user?.phoneNumber && user?.phoneNumber}
            logout={logout}
          />
          <div className="profile-section__favorites">
            <h2 className="favorites__text">
              Избранное({user?.favorites && user?.favorites?.length})
            </h2>
            <FavoritesMyProfile
              favorites={user?.favorites}
              basket={user?.basket}
              addProductCardToMyBasket={addProductCardToMyBasket}
              addProductCardToMyFavorites={addProductCardToMyFavorites}
              removeProductCardToMyBasket={removeProductCardToMyBasket}
              removeProductCardToMyFavorites={removeProductCardToMyFavorites}
              navigate={navigate}
              loading={loading}
            />
          </div>
        </div>
        <div className="second-section__profile">
          <div className="order-section__profile">
            <div className="first-section__order">
              <h1>Заказы({user?.orders && user?.orders?.length})</h1>
            </div>
            <div className="second-section__order">
              {user?.orders?.length > 0 ? (
                user?.orders?.map((userOrder) => (
                  <div key={userOrder._id} className="order__block">
                    <h3>
                      {userOrder.numberOrder}.............................
                      {userOrder.statusOrder === true && "оформлен"}
                    </h3>
                  </div>
                ))
              ) : (
                <h2>Заказов нет!</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MyProfile.propTypes = {
  getMyUserProfile: PropTypes.func.isRequired,
  //   getMyFavorites: PropTypes.func.isRequired,
  addProductCardToMyBasket: PropTypes.func.isRequired,
  removeProductCardToMyBasket: PropTypes.func.isRequired,
  addProductCardToMyFavorites: PropTypes.func.isRequired,
  removeProductCardToMyFavorites: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  userWork: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userWork: state.userWork,
  productCard: state.productCard
});

export default connect(mapStateToProps, {
  getMyUserProfile,
  //   getMyFavorites,
  logout,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
})(MyProfile);
