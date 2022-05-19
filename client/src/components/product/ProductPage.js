// Import Engine
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProductCardById,
  createReviewForProductCard
} from "../../actions/productCard";
import {
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
} from "../../actions/users";

// Import Components
import Product from "./Product";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

// Import Styles
import Spinner from "../layout/Spinner";

const ProductPage = ({
  getProductCardById,
  createReviewForProductCard,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites,
  productCard: { product },
  userWork: { isAuthenticated, user }
}) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    getProductCardById(id);
  }, [getProductCardById, id]);

  return (
    <Fragment>
      {product === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Product
            product={product}
            isAuthenticated={isAuthenticated}
            user={user}
            createReviewForProductCard={createReviewForProductCard}
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
          <h1>Оставьте Отзыв!</h1>
          {isAuthenticated ? (
            <ReviewForm id={id} />
          ) : (
            <h1>Войдите в аккаунт, чтобы оставить отзыв</h1>
          )}

          {product?.reviews?.length > 0 ? (
            product.reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))
          ) : (
            <h3>Отзывов Еще Нет!</h3>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ProductPage.propTypes = {
  getProductCardById: PropTypes.func.isRequired,
  createReviewForProductCard: PropTypes.func.isRequired,
  addProductCardToMyBasket: PropTypes.func.isRequired,
  removeProductCardToMyBasket: PropTypes.func.isRequired,
  addProductCardToMyFavorites: PropTypes.func.isRequired,
  removeProductCardToMyFavorites: PropTypes.func.isRequired,
  productCard: PropTypes.object.isRequired,
  userWork: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  productCard: state.productCard,
  userWork: state.userWork
});

export default connect(mapStateToProps, {
  getProductCardById,
  createReviewForProductCard,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
})(ProductPage);
