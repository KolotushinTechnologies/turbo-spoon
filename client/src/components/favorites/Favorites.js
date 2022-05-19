// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Import Styles
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
import Spinner from "../layout/Spinner";

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
                <div key={favoriteProduct.product} className="slider__item">
                  <ul className="  ">
                    <li className="gogo11">
                      <Link to="/">{/* <img src={ZmeiImage} /> */}</Link>
                    </li>
                    <li className="gogo11 flex33 ">
                      <Link to={`/product/${favoriteProduct.product}`}>
                        {favoriteProduct.nameProduct}
                      </Link>
                    </li>
                    <li className="gogo11">
                      <div className="flex111">
                        <div className="pravo11">
                          <Link to="/">{favoriteProduct.price}руб</Link>{" "}
                        </div>
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
                                  // if (isAuthenticated) {
                                  removeProductCardToMyFavorites(
                                    favoriteProduct.product,
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
                                  // if (isAuthenticated) {
                                  removeProductCardToMyBasket(
                                    favoriteProduct.product,
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

export default FavoritesProducts;
