// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Import Styles
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
import Spinner from "../layout/Spinner";

const Products = ({
  user,
  products,
  //   basket,
  //   favorites,
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
                <div key={item._id} className="slider__item">
                  <ul className="  ">
                    <li className="gogo11">
                      <Link to="/">{/* <img src={ZmeiImage} /> */}</Link>
                    </li>
                    <li className="gogo11 flex33 ">
                      <Link to={`/product/${item._id}`}>
                        {item.nameProduct}
                      </Link>
                    </li>
                    <li className="gogo11">
                      <div className="flex111">
                        <div className="pravo11">
                          <Link to="/">{item.price}руб</Link>{" "}
                        </div>
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
                                  onClick={() => {
                                    addProductCardToMyFavorites(
                                      item._id,
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
                                    // if (isAuthenticated) {
                                    removeProductCardToMyFavorites(
                                      item._id,
                                      navigate
                                    );
                                    // } else {
                                    //   setModalActive(true);
                                    // }
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
                              {user?.basket
                                ?.map((productBasket) =>
                                  productBasket.product.toString()
                                )
                                .indexOf(item._id) === -1 ? (
                                <button
                                  onClick={() => {
                                    // if (isAuthenticated) {
                                    addProductCardToMyBasket(
                                      item._id,
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
                                  Убрать Из Корзины
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
                    </li>
                  </ul>
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

export default Products;
