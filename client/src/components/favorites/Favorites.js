// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Import Styles
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
import Spinner from "../layout/Spinner";
import Balaklava from "../../img/shapka3.png";
import { AiFillCloseCircle } from "react-icons/ai";

const FavoritesProducts = ({
  favorites,
  basket,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  navigate,
  loading
}) => {
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {favorites.length > 0 ? (
            favorites?.map((favoriteProduct) => {
              return (
                // <div key={favoriteProduct.product} className="slider__item">
                <div
                  key={favoriteProduct.product._id}
                  className="main-section__favorite-product"
                >
                  <div className="first-section__favorite-product">
                    <div className="section__avatar-product">
                      <Link
                        className="link-avatar__favorite-product"
                        to={`/product/${favoriteProduct.product._id}`}
                      >
                        {favoriteProduct?.product?.photo?.url ? (
                          <img
                            className="img__product"
                            src={favoriteProduct?.product?.photo?.url}
                          />
                        ) : (
                          <img className="img__product" src={Balaklava} />
                        )}
                      </Link>
                    </div>
                    <div className="section-info__favorite-product">
                      <div className="info__product">
                        <div className="name__favorite-product">
                          <h3>{favoriteProduct.nameProduct}</h3>
                        </div>
                        <div className="price__product">
                          <span>{favoriteProduct.price}руб.</span>
                        </div>
                      </div>
                      <div className="main-buttons__favorite-product">
                        {favorites
                          ?.map((productFavorites) =>
                            productFavorites.product._id.toString()
                          )
                          .indexOf(favoriteProduct.product._id) === -1 ? (
                          <button
                            className="button_favorite"
                            onClick={() => {
                              addProductCardToMyFavorites(
                                favoriteProduct.product._id,
                                navigate
                              );
                            }}
                          >
                            {" "}
                            <img
                              className="close__favorite"
                              src={XoImage}
                            />{" "}
                          </button>
                        ) : (
                          <button
                            className="button_favorite"
                            onClick={() => {
                              removeProductCardToMyFavorites(
                                favoriteProduct.product._id,
                                navigate
                              );
                            }}
                          >
                            {" "}
                            <img
                              className="close__favorite"
                              src={XoImage}
                            />{" "}
                          </button>
                        )}{" "}
                        {basket
                          ?.map((productBasket) =>
                            productBasket.product._id.toString()
                          )
                          .indexOf(favoriteProduct.product._id) === -1 ? (
                          <button
                            className="close__button"
                            onClick={() => {
                              addProductCardToMyBasket(
                                favoriteProduct.product._id,
                                navigate
                              );
                            }}
                          >
                            <img src={PlusImage} />
                          </button>
                        ) : (
                          <button
                            className="close__button"
                            onClick={() => {
                              removeProductCardToMyBasket(
                                favoriteProduct.product._id,
                                navigate
                              );
                            }}
                          >
                            {/* <img src={PlusImage} /> */}
                            {/* Убрать Из Корзины */}
                            <AiFillCloseCircle />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                // </div>
              );
            })
          ) : (
            <h1>Товаров не найдено!</h1>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default FavoritesProducts;
