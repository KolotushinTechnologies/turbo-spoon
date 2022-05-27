// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Import Styles
import "./Basket.css";
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
import Spinner from "../layout/Spinner";
import Balaklava from "../../img/shapka3.png";
import {
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiFillCloseCircle
} from "react-icons/ai";

const BasketProducts = ({
  events,
  favorites,
  basket,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  navigate,
  loading
}) => {
  console.log(basket);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {basket.length > 0 ? (
            basket?.map((basketProduct) => {
              console.log(basketProduct.product);
              return (
                <div
                  key={basketProduct.product._id}
                  className="main-basket__section"
                >
                  <div className="first-section__product-basket">
                    <div className="section__avatar-product">
                      <Link
                        className="link-avatar__product-basket"
                        to={`/product/${basketProduct?.product?._id}`}
                      >
                        {basketProduct?.product?.photo?.url ? (
                          <img
                            className="img__product"
                            src={basketProduct?.product?.photo?.url}
                          />
                        ) : (
                          <img className="img__product" src={Balaklava} />
                        )}
                      </Link>
                    </div>
                    <div className="section-info__product">
                      <div className="info__product">
                        <div className="name__product-basket">
                          <h3>{basketProduct.nameProduct}</h3>
                        </div>
                      </div>
                      <div className="main-buttons__product-basket">
                        {favorites
                          ?.map((productFavorites) =>
                            productFavorites?.product._id.toString()
                          )
                          .indexOf(basketProduct?.product?._id) === -1 ? (
                          <button
                            // className="button__favorites"
                            onClick={() => {
                              addProductCardToMyFavorites(
                                basketProduct?.product?._id,
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
                            // className="button__favorites"
                            onClick={() => {
                              removeProductCardToMyFavorites(
                                basketProduct?.product?._id,
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
                            productBasket?.product._id.toString()
                          )
                          .indexOf(basketProduct?.product?._id) === -1 ? (
                          <button
                            onClick={() => {
                              addProductCardToMyBasket(
                                basketProduct?.product?._id,
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
                                basketProduct?.product?._id,
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
                  <div className="second-section__product-basket">
                    <div className="add__products">
                      <button
                        className="button__product-events"
                        onClick={() =>
                          events.increment(basketProduct && basketProduct)
                        }
                      >
                        <AiOutlineCaretLeft />
                      </button>
                      <span className="section-product__count-products">
                        {basketProduct?.countProducts}{" "}
                      </span>
                      <button
                        className="button__product-events"
                        onClick={() =>
                          events.decrement(basketProduct && basketProduct)
                        }
                      >
                        <AiOutlineCaretRight />
                      </button>
                    </div>
                    <div className="price__product-basket">
                      <span>{basketProduct?.price}руб.</span>
                    </div>
                  </div>
                </div>
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

export default BasketProducts;
