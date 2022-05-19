// Import Engine
import React, { Fragment, useEffect, useState } from "react";
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

// Import Components
import BasketProducts from "./BasketProducts";

// Import Styles
import Spinner from "../layout/Spinner";

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

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Корзина({user?.basket?.length})</h1>
          <BasketProducts
            events={events}
            favorites={user.favorites}
            basket={userBasket}
            addProductCardToMyBasket={addProductCardToMyBasket}
            addProductCardToMyFavorites={addProductCardToMyFavorites}
            removeProductCardToMyBasket={removeProductCardToMyBasket}
            removeProductCardToMyFavorites={removeProductCardToMyFavorites}
            navigate={navigate}
            loading={loading}
          />

          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              createOrder(total, navigate);
            }}
          >
            <h1>Итого: ({total}) Рублей</h1>
            {total > 0 ? (
              <input
                type="submit"
                className="btn btn-primary my-1"
                value="Оформить Заказ!"
              />
            ) : (
              <input
                disabled
                type="submit"
                className="btn btn-primary my-1"
                value="Оформить Заказ!"
              />
            )}
          </form>
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
