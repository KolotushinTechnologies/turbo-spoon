import api from "../utils/api";
import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_ERROR,
  CLEAR_PRODUCT
} from "./types";

// Get All Products
// @route    GET http://localhost:5000/api/product-cards/all?category=categoryName
// @desc     Get all product cards
// @access   Public
export const getAllProductCards = () => async (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT });

  try {
    const res = await api.get("/product-cards/all");
    // const res = await axios.get("http://localhost:5000/api/product-cards/all");
    // console.log(res);

    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// @route    GET http://localhost:5000/api/product-cards/:product_card
// @desc     Get product card by ID(Populate reviews and description)
// @access   Public
export const getProductCardById = (productCardId) => async (dispatch) => {
  try {
    const res = await api.get(`/product-cards/${productCardId}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// @route    POST http://localhost:5000/api/product-cards/create-review/:product_card
// @desc     Create review for product card
// @access   Private
export const createReviewForProductCard =
  (text, productCardId) => async (dispatch) => {
    try {
      const res = await api.post(
        `/product-cards/create-review/${productCardId}`,
        { text }
      );

      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data
      });

      dispatch(setAlert("Вы Успешно Оставили Отзыв На Товар!", "success"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PRODUCT_ERROR
      });
    }
  };
