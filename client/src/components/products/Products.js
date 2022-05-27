// Import Engine
import React, { Fragment, useState, useEffect } from "react";
import { findDOMNode } from "react-dom";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Import Styles
import "./ProductsPage.css";
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
import Spinner from "../layout/Spinner";
import Balaklava from "../../img/shapka3.png";
import { AiFillCloseCircle } from "react-icons/ai";

const Products = ({
  user,
  products,
  isAuthenticated,
  addProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyBasket,
  removeProductCardToMyFavorites,
  getAllProductCards,
  navigate,
  loading,
  setModalActive
}) => {
  const [countSlides, setCountSlides] = useState(3);

  useEffect(() => {
    if (window.innerWidth < 1200) {
      setCountSlides(1);
    } else {
      setCountSlides(3);
    }

    window.addEventListener("resize", function () {
      if (this.window.innerWidth < 1200) {
        setCountSlides(1);
      } else {
        setCountSlides(3);
      }
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: countSlides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Slider {...settings}>
            {products.length > 0 ? (
              products?.map((item) => {
                return (
                  <div key={item._id} className="slider__item">
                    <div className="main-section__product">
                      <div className="first-section__product">
                        <Link
                          className="link-avatar__product"
                          to={`/product/${item._id}`}
                        >
                          {item?.photo?.url ? (
                            <img
                              className="img__product"
                              src={item?.photo?.url}
                            />
                          ) : (
                            <img className="img__product" src={Balaklava} />
                          )}
                        </Link>
                      </div>
                      <div className="second-section__product">
                        <div className="first-section__add-info">
                          <div className="add__info">
                            <div className="name__product">
                              <span>{item.nameProduct}</span>
                            </div>
                            <div className="price__product">
                              <span>{item.price}руб.</span>
                            </div>
                          </div>
                          <div className="main__buttons">
                            {isAuthenticated ? (
                              <Fragment>
                                <div className="flex222">
                                  {" "}
                                  {user?.favorites
                                    ?.map((productFavorites) =>
                                      productFavorites.product._id.toString()
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
                                      productBasket.product._id.toString()
                                    )
                                    .indexOf(item._id) === -1 ? (
                                    <button
                                      className="button-main-page"
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
                                  <button
                                    className="button-main-page"
                                    onClick={() => setModalActive(true)}
                                  >
                                    {" "}
                                    <img src={XoImage} />{" "}
                                  </button>
                                </div>
                                <div>
                                  {" "}
                                  <button
                                    className="button-main-page"
                                    onClick={() => setModalActive(true)}
                                  >
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
                  </div>
                );
              })
            ) : (
              <h1>Товаров не найдено!</h1>
            )}
          </Slider>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
