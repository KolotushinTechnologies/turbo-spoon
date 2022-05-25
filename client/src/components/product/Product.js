// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Import Components
import Auth from "../auth/Auth";

// Import Styles
import "./ProductPage.css";
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
import Balaklava from "../../img/shapka3.png";
import { AiFillCloseCircle } from "react-icons/ai";

const Product = ({
  product,
  isAuthenticated,
  user,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites,
  navigate,
  modalActive,
  setModalActive,
  loginStatus,
  setLoginStatus
}) => {
  return (
    <Fragment>
      <div className="main-section__product">
        <div className="first-section__main-section">
          <div className="block__product">
            <Link className="link-avatar" to={`/product/${product._id}`}>
              {product?.photo?.url ? (
                <img className="img__product" src={product?.photo?.url} />
              ) : (
                <img className="img__product" src={Balaklava} />
              )}
            </Link>
          </div>

          <div className="description__product">
            <div className="first-section__description">
              <div className="main__info">
                <div className="name-product">
                  <h1>{product.nameProduct}</h1>
                </div>
                <div className="price-product">
                  <span>{product.price}руб.</span>
                </div>
              </div>
            </div>

            <div className="second-section__description">
              {isAuthenticated ? (
                <Fragment>
                  <div className="flex222">
                    {" "}
                    {user?.favorites
                      ?.map((productFavorites) =>
                        productFavorites.product.toString()
                      )
                      .indexOf(product._id) === -1 ? (
                      <button
                        className="button-main-product"
                        onClick={() => {
                          addProductCardToMyFavorites(product._id, navigate);
                        }}
                      >
                        {" "}
                        <img src={XoImage} />{" "}
                      </button>
                    ) : (
                      <button
                        className="button-main-product"
                        onClick={() => {
                          removeProductCardToMyFavorites(product._id, navigate);
                        }}
                      >
                        {" "}
                        <img src={XoImage} /> {/* Убрать из Избранного */}
                      </button>
                    )}
                  </div>
                  <div>
                    {" "}
                    {}
                    {user?.basket
                      ?.map((productBasket) => productBasket.product.toString())
                      .indexOf(product._id) === -1 ? (
                      <button
                        className="button-main-product"
                        onClick={() => {
                          addProductCardToMyBasket(product._id, navigate);
                        }}
                      >
                        <img src={PlusImage} />
                      </button>
                    ) : (
                      <button
                        className="close-main-button"
                        onClick={() => {
                          removeProductCardToMyBasket(product._id, navigate);
                        }}
                      >
                        {/* <img src={PlusImage} /> */}
                        {/* Убрать Из Корзины */}
                        <AiFillCloseCircle />
                      </button>
                    )}
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="flex222">
                    {" "}
                    <button
                      className="button-main-product"
                      onClick={() => setModalActive(true)}
                    >
                      {" "}
                      <img src={XoImage} />{" "}
                    </button>
                  </div>
                  <div>
                    {" "}
                    <button
                      className="button-main-product"
                      onClick={() => setModalActive(true)}
                    >
                      <img src={PlusImage} />
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>

        <div className="second-section__main-section">
          <div className="add__description-product">
            <p>Состав: {product?.compound}</p>

            <p>Описание: {product?.description}</p>

            <p>Категория: {product?.category}</p>
          </div>
        </div>
      </div>

      <Auth
        modalActive={modalActive}
        setModalActive={setModalActive}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />
    </Fragment>
  );
};

export default Product;
