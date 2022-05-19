// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Import Components
import Auth from "../auth/Auth";

// Import Styles
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";

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
      <div key={product._id} className="slider__item">
        <ul className="  ">
          <li className="gogo11">
            <Link to="/">{/* <img src={ZmeiImage} /> */}</Link>
          </li>
          <li className="gogo11 flex33 ">
            <Link to={`/product/${product._id}`}>{product.nameProduct}</Link>
          </li>
          <li className="gogo11">
            <div className="flex111">
              <div className="pravo11">
                <Link to="/">{product.price}руб</Link>{" "}
              </div>
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
                        onClick={() => {
                          addProductCardToMyFavorites(product._id, navigate);
                        }}
                      >
                        {" "}
                        <img src={XoImage} />{" "}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          removeProductCardToMyFavorites(product._id, navigate);
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
                      ?.map((productBasket) => productBasket.product.toString())
                      .indexOf(product._id) === -1 ? (
                      <button
                        onClick={() => {
                          addProductCardToMyBasket(product._id, navigate);
                        }}
                      >
                        <img src={PlusImage} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          removeProductCardToMyBasket(product._id, navigate);
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

      <div>
        <h3>Описание Шапки</h3>
        <p>{product?.description}</p>
        <hr />
        <h3>Состав Шапки</h3>
        <p>{product?.compound}</p>
        <hr />
        <h3>Категория Шапки</h3>
        <p>{product?.category}</p>
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
