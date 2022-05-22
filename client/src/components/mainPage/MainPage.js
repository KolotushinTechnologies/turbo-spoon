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
} from "../../actions/users";

// Import Components
import Auth from "../auth/Auth";
import Products from "../products/Products";
// import Carousel from "../Carousel/Carousel";
// import Slider from "react-slick";

// Import Styles
import ArrowImage from "../../img/arrow.png";

// import ProductImage from "../../img/товар.png";
import "./MainPage.css";

function MainPage({
  userWork: { isAuthenticated, user, favorites, basket },
  getAllProductCards,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  productCard: { products, loading },
  history
}) {
  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    getAllProductCards();
  }, [getAllProductCards]);

  console.log(products);

  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 10
  //   };

  return (
    <Fragment>
      <section className="section-main">
        <div className="whiteline"></div>
        <div className="whiteline"></div>

        <div className="top">
          <Link to="/">
            <img src={ArrowImage} />
          </Link>
        </div>

        <div className="first-section__main">
          <div className="contr1284">
            <h1>Популярные товары</h1>
          </div>
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
        </div>

        <div className="second-section__main">
          <div className="contr1284">
            <h1>Новинки</h1>
          </div>
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

MainPage.propTypes = {
  getAllProductCards: PropTypes.func.isRequired,
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
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites
})(MainPage);
