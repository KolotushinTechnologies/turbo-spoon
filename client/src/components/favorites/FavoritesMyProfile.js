// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Import Styles
import "./FavoritesMyProfile.css";
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
import Spinner from "../layout/Spinner";
import Balaklava from "../../img/shapka3.png";
import { AiFillCloseCircle } from "react-icons/ai";

const FavoritesMyProfile = ({
  favorites,
  basket,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  navigate,
  loading
}) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {favorites?.length > 1 ? (
            <Slider {...settings}>
              {favorites?.map((favoriteProduct) => {
                return (
                  <div key={favoriteProduct.product} className="slider__item">
                    <div className="main-section__product">
                      <div className="first-section__product">
                        <Link
                          className="link-avatar__product"
                          to={`/product/${favoriteProduct.product}`}
                        >
                          <img className="avatar__product" src={Balaklava} />
                        </Link>
                      </div>
                      <div className="second-section__product">
                        <div className="first-section__add-info">
                          <div className="add__info">
                            <div className="name__product">
                              <span>{favoriteProduct.nameProduct}</span>
                            </div>
                            <div className="price__product">
                              <span>{favoriteProduct.price}руб.</span>
                            </div>
                          </div>
                          <div className="main__buttons main__buttons-favorites">
                            <Fragment>
                              <div className="flex222">
                                {" "}
                                {favorites
                                  ?.map((productFavorites) =>
                                    productFavorites.product.toString()
                                  )
                                  .indexOf(favoriteProduct.product) === -1 ? (
                                  <button
                                    className="button__favorites"
                                    onClick={() => {
                                      addProductCardToMyFavorites(
                                        favoriteProduct.product,
                                        navigate
                                      );
                                    }}
                                  >
                                    {" "}
                                    <img src={XoImage} />{" "}
                                  </button>
                                ) : (
                                  <button
                                    className="button__favorites"
                                    onClick={() => {
                                      removeProductCardToMyFavorites(
                                        favoriteProduct.product,
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
                                )}
                              </div>
                              <div>
                                {" "}
                                {}
                                {basket
                                  ?.map((productBasket) =>
                                    productBasket.product.toString()
                                  )
                                  .indexOf(favoriteProduct.product) === -1 ? (
                                  <button
                                    onClick={() => {
                                      // if (isAuthenticated) {
                                      addProductCardToMyBasket(
                                        favoriteProduct.product,
                                        navigate
                                      );
                                      // } else {
                                      //   setModalActive(true);
                                      // }
                                    }}
                                  >
                                    <img src={PlusImage} />
                                  </button>
                                ) : (
                                  <button
                                    className="close__basket"
                                    onClick={() => {
                                      removeProductCardToMyBasket(
                                        favoriteProduct.product,
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
                            </Fragment>
                          </div>
                        </div>
                        {/* <div className="second-section__add-info"></div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : favorites?.length <= 1 ? (
            favorites?.map((favoriteProduct) => {
              return (
                <div key={favoriteProduct.product} className="slider__item">
                  <div className="main-section__product">
                    <div className="first-section__product">
                      <Link
                        className="link-avatar__product"
                        to={`/product/${favoriteProduct.product}`}
                      >
                        <img className="avatar__product" src={Balaklava} />
                      </Link>
                    </div>
                    <div className="second-section__product">
                      <div className="first-section__add-info">
                        <div className="add__info">
                          <div className="name__product">
                            <span>{favoriteProduct.nameProduct}</span>
                          </div>
                          <div className="price__product">
                            <span>{favoriteProduct.price}руб.</span>
                          </div>
                        </div>
                        <div className="main__buttons">
                          <Fragment>
                            <div className="flex222">
                              {" "}
                              {favorites
                                ?.map((productFavorites) =>
                                  productFavorites.product.toString()
                                )
                                .indexOf(favoriteProduct.product) === -1 ? (
                                <button
                                  onClick={() => {
                                    addProductCardToMyFavorites(
                                      favoriteProduct.product,
                                      navigate
                                    );
                                  }}
                                >
                                  {" "}
                                  <img src={XoImage} />{" "}
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    removeProductCardToMyFavorites(
                                      favoriteProduct.product,
                                      navigate
                                    );
                                  }}
                                >
                                  {" "}
                                  {/* <img src={XoImage} />{" "} */}
                                  Убрать из Избранного
                                </button>
                              )}
                            </div>
                            <div>
                              {" "}
                              {}
                              {basket
                                ?.map((productBasket) =>
                                  productBasket.product.toString()
                                )
                                .indexOf(favoriteProduct.product) === -1 ? (
                                <button
                                  onClick={() => {
                                    // if (isAuthenticated) {
                                    addProductCardToMyBasket(
                                      favoriteProduct.product,
                                      navigate
                                    );
                                    // } else {
                                    //   setModalActive(true);
                                    // }
                                  }}
                                >
                                  <img src={PlusImage} />
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    removeProductCardToMyBasket(
                                      favoriteProduct.product,
                                      navigate
                                    );
                                  }}
                                >
                                  {/* <img src={PlusImage} /> */}
                                  Убрать Из Корзины
                                </button>
                              )}
                            </div>
                          </Fragment>
                        </div>
                      </div>
                      {/* <div className="second-section__add-info"></div> */}
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

export default FavoritesMyProfile;
