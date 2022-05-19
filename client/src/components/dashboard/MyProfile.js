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
import FavoritesProducts from "../favorites/Favorites";

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
      <Profile
        // avatar={avatar && avatar}
        fullName={user.fullName && user.fullName}
        login={user.login && user.login}
        address={user.address && user.address}
        email={user.email && user.email}
        phoneNumber={user.phoneNumber && user.phoneNumber}
        logout={logout}
      />
      <div className="profileHeaderDiv">
        <span className="profOrdersText">
          Избранное({user?.favorites && user?.favorites?.length})
        </span>
        <Link className="profOrdersLink" to="/orders">
          Смотреть все
        </Link>
      </div>
      <div className="profileOrdersDiv">
        <FavoritesProducts
          favorites={user.favorites}
          basket={user.basket}
          addProductCardToMyBasket={addProductCardToMyBasket}
          addProductCardToMyFavorites={addProductCardToMyFavorites}
          removeProductCardToMyBasket={removeProductCardToMyBasket}
          removeProductCardToMyFavorites={removeProductCardToMyFavorites}
          navigate={navigate}
          loading={loading}
          //   products={favorites}
          //   isAuthenticated={isAuthenticated}
          //   basket={basket}
          //   favorites={favorites}
          //   addProductCardToMyBasket={addProductCardToMyBasket}
          //   addProductCardToMyFavorites={addProductCardToMyFavorites}
          //   removeProductCardToMyBasket={removeProductCardToMyBasket}
          //   removeProductCardToMyFavorites={removeProductCardToMyFavorites}
          //   navigate={navigate}
          //   loading={loading}
          //   setModalActive={setModalActive}
        />
        {/* {favorites?.favorites?.length > 0
          ? favorites?.favorites?.map((product) => (
              <Product
                product={product}
                isAuthenticated={isAuthenticated}
                user={user}
                addProductCardToMyBasket={addProductCardToMyBasket}
                removeProductCardToMyBasket={removeProductCardToMyBasket}
                addProductCardToMyFavorites={addProductCardToMyFavorites}
                removeProductCardToMyFavorites={removeProductCardToMyFavorites}
                navigate={navigate}
                modalActive={modalActive}
                setModalActive={setModalActive}
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
              />
            ))
          : "Избранного нет!"} */}
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
