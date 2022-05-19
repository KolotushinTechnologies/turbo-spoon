// Import Engine
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProductCards } from "../../actions/productCard";
import {
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  getMyFavorites
} from "../../actions/users";

// Import Components
import Auth from "../auth/Auth";
import Products from "./Products";

// Import Styles
// import "./MainPage.css";

function ProductsPage({
  userWork: { isAuthenticated, user, favorites, basket },
  getAllProductCards,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  getMyFavorites,
  productCard: { products, loading },
  history
}) {
  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    getAllProductCards();
  }, [getAllProductCards]);

  useEffect(() => {
    getMyFavorites();
  }, [getMyFavorites]);

  console.log(products);

  return (
    <Fragment>
      <section className="section-main">
        <h1>Категории</h1>
        <div>
          <p>Шапки</p>
          <p>Балаклавы</p>
          <p>Топы</p>
        </div>

        {/* <div className="contr_slider">
        <div className="slider"> */}
        {/* <Carousel> */}
        <Products
          user={user}
          getAllProductCards={getAllProductCards}
          products={products}
          isAuthenticated={isAuthenticated}
          addProductCardToMyBasket={addProductCardToMyBasket}
          addProductCardToMyFavorites={addProductCardToMyFavorites}
          removeProductCardToMyBasket={removeProductCardToMyBasket}
          removeProductCardToMyFavorites={removeProductCardToMyFavorites}
          navigate={navigate}
          loading={loading}
          setModalActive={setModalActive}
        />
        {/* </Carousel> */}

        {/* Registration And Authorization */}
        <Auth
          modalActive={modalActive}
          setModalActive={setModalActive}
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
        />
      </section>
    </Fragment>
  );
}

ProductsPage.propTypes = {
  getAllProductCards: PropTypes.func.isRequired,
  getMyFavorites: PropTypes.func.isRequired,
  addProductCardToMyBasket: PropTypes.func.isRequired,
  addProductCardToMyFavorites: PropTypes.func.isRequired,
  removeProductCardToMyBasket: PropTypes.func.isRequired,
  removeProductCardToMyFavorites: PropTypes.func.isRequired,
  productCard: PropTypes.object.isRequired,
  userWork: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  productCard: state.productCard,
  userWork: state.userWork
});

export default connect(mapStateToProps, {
  getAllProductCards,
  getMyFavorites,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites
})(ProductsPage);
