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
  removeProductCardToMyFavorites
  // getMyFavorites
} from "../../actions/users";

// Import Components
import Auth from "../auth/Auth";
import ProductsMain from "./ProductsMain";

// Import Styles
// import "./MainPage.css";

function ProductsPage({
  userWork: { isAuthenticated, user, favorites, basket },
  getAllProductCards,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  // getMyFavorites,
  productCard: { products, loading },
  history
}) {
  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [categoryName, setCategoryName] = useState("Шапки");

  useEffect(() => {
    getAllProductCards(categoryName);
  }, [getAllProductCards, categoryName]);

  console.log(categoryName);

  // useEffect(() => {
  //   getMyFavorites();
  // }, [getMyFavorites]);

  console.log(products);

  return (
    <Fragment>
      <section className="section-main main-section__products-page">
        <div className="first-section__products-page">
          <button
            className="category__button first__category"
            onClick={() => setCategoryName("Шапки")}
          >
            Шапки
          </button>
          <button
            className="category__button second__category"
            onClick={() => setCategoryName("Балаклавы")}
          >
            Балаклавы
          </button>
          <button
            className="category__button third__category"
            onClick={() => setCategoryName("Топы")}
          >
            Топы
          </button>
        </div>
        <div className="second-section__products-page">
          <ProductsMain
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
        </div>

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
  // getMyFavorites: PropTypes.func.isRequired,
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
  // getMyFavorites,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites
})(ProductsPage);
