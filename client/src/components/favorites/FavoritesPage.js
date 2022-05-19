// Import Engine
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getMyFavorites,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
} from "../../actions/users";

// Import Components
import FavoritesProducts from "./Favorites";

// Import Styles
import Spinner from "../layout/Spinner";

const FavoritesPage = ({
  getMyFavorites,
  userWork: { user, loading },
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
}) => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     getMyFavorites();
  //   }, [getMyFavorites]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Избранное({user?.favorites?.length})</h1>
          <FavoritesProducts
            favorites={user.favorites}
            basket={user.basket}
            addProductCardToMyBasket={addProductCardToMyBasket}
            addProductCardToMyFavorites={addProductCardToMyFavorites}
            removeProductCardToMyBasket={removeProductCardToMyBasket}
            removeProductCardToMyFavorites={removeProductCardToMyFavorites}
            navigate={navigate}
            loading={loading}
          />
        </Fragment>
      )}
    </section>
  );
};

FavoritesPage.propTypes = {
  getMyFavorites: PropTypes.func.isRequired,
  addProductCardToMyBasket: PropTypes.func.isRequired,
  removeProductCardToMyBasket: PropTypes.func.isRequired,
  addProductCardToMyFavorites: PropTypes.func.isRequired,
  removeProductCardToMyFavorites: PropTypes.func.isRequired,
  userWork: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userWork: state.userWork
});

export default connect(mapStateToProps, {
  getMyFavorites,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
})(FavoritesPage);
