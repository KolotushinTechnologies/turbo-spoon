// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import Slider from "react-slick";

// Import Styles
import "./ProductsMain.css";
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
import Spinner from "../layout/Spinner";
import Balaklava from "../../img/shapka3.png";
import { AiFillCloseCircle } from "react-icons/ai";

const ProductsMain = ({
  user,
  products,
  isAuthenticated,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  navigate,
  loading,
  setModalActive
}) => {
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {products.length > 0 ? (
            products?.map((item) => {
              return (
                // <div key={item._id} className="slider__item">
                <div key={item._id} className="main-section__product-main">
                  <div className="first-section__product-main">
                    <Link
                      className="link-avatar__product-main"
                      to={`/product/${item._id}`}
                    >
                      <img className="avatar__product-main" src={Balaklava} />
                    </Link>
                  </div>
                  <div className="second-section__product-main">
                    <div className="first-section__add-info-main">
                      <div className="add__info-main">
                        <div className="name__product-main">
                          <span>{item.nameProduct}</span>
                        </div>
                        <div className="price__product-main">
                          <span>{item.price}руб.</span>
                        </div>
                      </div>
                      <div className="main__buttons-main">
                        {isAuthenticated ? (
                          <Fragment>
                            <div className="flex222">
                              {" "}
                              {user?.favorites
                                ?.map((productFavorites) =>
                                  productFavorites.product.toString()
                                )
                                .indexOf(item._id) === -1 ? (
                                <button
                                  className="button__favorites"
                                  onClick={() => {
                                    addProductCardToMyFavorites(
                                      item._id,
                                      navigate
                                    );
                                  }}
                                >
                                  {" "}
                                  <img
                                    className="img__favorites"
                                    src={XoImage}
                                  />{" "}
                                </button>
                              ) : (
                                <button
                                  className="button__favorites"
                                  onClick={() => {
                                    removeProductCardToMyFavorites(
                                      item._id,
                                      navigate
                                    );
                                  }}
                                >
                                  {" "}
                                  <img
                                    className="img__favorites"
                                    src={XoImage}
                                  />{" "}
                                  {/* Убрать из Избранного */}
                                </button>
                              )}
                            </div>
                            <div>
                              {" "}
                              {}
                              {user?.basket
                                ?.map((productBasket) =>
                                  productBasket.product.toString()
                                )
                                .indexOf(item._id) === -1 ? (
                                <button
                                  onClick={() => {
                                    addProductCardToMyBasket(
                                      item._id,
                                      navigate
                                    );
                                  }}
                                >
                                  <img
                                    className="add-to-basket"
                                    src={PlusImage}
                                  />
                                </button>
                              ) : (
                                <button
                                  className="close__basket"
                                  onClick={() => {
                                    // if (isAuthenticated) {
                                    removeProductCardToMyBasket(
                                      item._id,
                                      navigate
                                    );
                                    // } else {
                                    //   setModalActive(true);
                                    // }
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
                              <button onClick={() => setModalActive(true)}>
                                {" "}
                                <img src={XoImage} />{" "}
                              </button>
                            </div>
                            <div>
                              {" "}
                              <button onClick={() => setModalActive(true)}>
                                <img src={PlusImage} />
                              </button>
                            </div>
                          </Fragment>
                        )}
                      </div>
                    </div>
                    {/* <div className="second-section__add-info"></div> */}
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

export default ProductsMain;
