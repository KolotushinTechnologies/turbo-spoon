// Import Engine
import React, { Fragment, useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites,
  createOrder
} from "../../actions/users";
// import $ from ""

// Import Components
import BasketProducts from "./BasketProducts";

// Import Styles
import "./Basket.css";
import Spinner from "../layout/Spinner";
import NextArrow from "../../img/Next.png";

const Basketpage = ({
  userWork: { user, loading },
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites,
  createOrder
}) => {
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [userBasket, setUserbasket] = useState(user?.basket);
  const [valueDelivery, setValueDelivery] = useState("Курьером(Москва и МО)");

  const events = {
    increment: (item) => {
      let index = userBasket.indexOf(item);
      item.countProducts = item.countProducts + 1;
      userBasket[index] = item;

      setUserbasket([...userBasket]);
    },
    decrement: (item) => {
      let index = userBasket.indexOf(item);
      if (item.countProducts === 1) {
        item.countProducts = item.countProducts;
      } else {
        item.countProducts = item.countProducts - 1;
      }
      userBasket[index] = item;

      setUserbasket([...userBasket]);
    }
  };

  useEffect(() => {
    let summ = userBasket.reduce(
      (total, { countProducts, price }) => countProducts * price + total,
      0
    );

    setTotal(summ);
  }, [userBasket]);

  const onChangeValueDelivery = (e) => {
    setValueDelivery(e.target.value);
  };

  console.log(valueDelivery);

  return (
    <section className="main-section__basket-page" id="page-wrap">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="first-section__basket-page">
            <div className="basket-page__products">
              <h1>Корзина({user?.basket?.length})</h1>
              <BasketProducts
                events={events}
                favorites={user?.favorites}
                basket={userBasket}
                addProductCardToMyBasket={addProductCardToMyBasket}
                addProductCardToMyFavorites={addProductCardToMyFavorites}
                removeProductCardToMyBasket={removeProductCardToMyBasket}
                removeProductCardToMyFavorites={removeProductCardToMyFavorites}
                navigate={navigate}
                loading={loading}
              />
            </div>
            {total > 0 ? (
              <div className="delivery__block">
                <h2>Способ доставки:</h2>
                <div className="delivery-inputs">
                  <label>
                    <input
                      className="input__delivery"
                      type="radio"
                      name="Курьером(Москва и МО)"
                      value="Курьером(Москва и МО)"
                      checked={
                        valueDelivery === "Курьером(Москва и МО)" ? true : false
                      }
                      onChange={onChangeValueDelivery}
                    />
                    Курьером(Москва и МО)
                  </label>

                  <label className="label__delivery">
                    <input
                      className="input__delivery"
                      type="radio"
                      name="Самовывоз"
                      value="Самовывоз"
                      checked={valueDelivery === "Самовывоз" ? true : false}
                      onChange={onChangeValueDelivery}
                    />
                    Самовывоз
                  </label>

                  <label className="label__delivery">
                    <input
                      className="input__delivery"
                      type="radio"
                      name="Доставка Почтой России"
                      value="Доставка Почтой России"
                      checked={
                        valueDelivery === "Доставка Почтой России"
                          ? true
                          : false
                      }
                      onChange={onChangeValueDelivery}
                    />
                    Доставка Почтой России
                  </label>
                </div>
              </div>
            ) : null}
          </div>

          <div className="second-section__basket-page">
            <div className="first-section__form-basket">
              <div className="title__data">
                <h3>Ваши данные</h3>
              </div>
              <div className="main_data">
                <p>{user?.fullName}</p>
                <p>{user?.phoneNumber}</p>
                <p>{user?.email}</p>
                <p>Адрес доставки: {user?.address}</p>
              </div>
            </div>
            <div className="second-section__form-basket">
              <form
                className="form form__basket"
                onSubmit={(e) => {
                  e.preventDefault();
                  createOrder(total, valueDelivery, navigate);
                }}
              >
                <h1>Общая сумма: {total}руб</h1>
                {total > 0 ? (
                  <button type="submit" className="btn my-1 start__order">
                    Оформить заказ{" "}
                    <img
                      src={NextArrow}
                      width={20}
                      style={{ margin: "0 0 0 10px " }}
                    />
                  </button>
                ) : (
                  <h1 style={{ textAlign: "center", color: "#c00a99" }}>
                    Для оформления заказа необходимо добавить товар в корзину!
                  </h1>
                )}
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

Basketpage.propTypes = {
  addProductCardToMyBasket: PropTypes.func.isRequired,
  removeProductCardToMyBasket: PropTypes.func.isRequired,
  addProductCardToMyFavorites: PropTypes.func.isRequired,
  removeProductCardToMyFavorites: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  userWork: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userWork: state.userWork
});

export default connect(mapStateToProps, {
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites,
  createOrder
})(Basketpage);
