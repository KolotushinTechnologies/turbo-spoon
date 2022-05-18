import { getMyProfile } from "../../../services/users";
import api from "../utils/api";
import setAlert from "./alert";
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  //
  GET_MY_USER_PROFILE,
  AUTH_ERROR,
  //
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  //
  UPDATE_MY_PROFILE,
  USER_ERROR,
  //
  GET_MY_BASKET,
  GET_MY_FAVORITES,
  GET_MY_ORDERS
} from "./types";

// Get My User Profile (User will get him profile after login or registration)
// @route    GET http://localhost:5000/api/users
// @desc     Get user by token(Get My Profile)
// @access   Private
export const getMyUserProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/users");

    dispatch({
      type: GET_MY_USER_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Registration User
// @route    POST http://localhost:5000/api/users/registration
// @desc     Register user
// @access   Public
export const registration = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users/registration", formData);

    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data
    });

    dispatch(getMyProfile());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTRATION_FAIL
    });
  }
};

// Login User
// @route    POST http://localhost:5000/api/users/login
// @desc     Authenticate user & get token(Login User)
// @access   Public
export const login = (login, password) => async (dispatch) => {
  try {
    const res = await api.post("/users/login", { login, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(getMyProfile());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout User
export const logout = () => ({ type: LOGOUT });

// Update User Profile
// @route    PUT http://localhost:5000/api/users/settings
// @desc     User settings
// @access   Private
export const updateMyProfile = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.put("/users/settings", formData);

    dispatch({
      type: UPDATE_MY_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Ваш Профиль Обновлен!", "success"));

    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: USER_ERROR
    });
  }
};

// Get User Basket
// @route    GET http://localhost:5000/api/users/my-basket
// @desc     Get my basket
// @access   Private
export const getMyBasket = () => async (dispatch) => {
  try {
    const res = await api.get("/users/my-basket");

    dispatch({
      type: GET_MY_BASKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
};

// Add Product Card To User Basket
// @route    POST http://localhost:5000/api/users/add-product-to-basket/:product_card
// @desc     Add product card to my basket
// @access   Private
export const addProductCardToMyBasket =
  (productCardId, navigate) => async (dispatch) => {
    try {
      const res = await api.post(
        `/users/add-product-to-basket/${productCardId}`
      );

      dispatch({
        type: UPDATE_MY_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("Товар Был Добавлен Вам В Корзину!", "success"));

      navigate("/my-basket");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: USER_ERROR
      });
    }
  };

// Remove Product Card From User Basket
// @route    PUT http://localhost:5000/api/users/remove-product-to-basket/:product_card
// @desc     Remove product card from my basket
// @access   Private
export const removeProductCardToMyBasket =
  (productCardId, navigate) => async (dispatch) => {
    try {
      const res = await api.post(
        `/users/remove-product-to-basket/${productCardId}`
      );

      dispatch({
        type: UPDATE_MY_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("Товар Был Удален Из Вашей Корзины!", "success"));

      navigate("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: USER_ERROR
      });
    }
  };

// Create User Order
// @route    POST http://localhost:5000/api/users/create-order
// @desc     Create order(Send Email Message)
// @access   Private
export const createOrder = (price, navigate) => async (dispatch) => {
  try {
    const res = await api.post("/users/create-order", { price });

    dispatch({
      type: UPDATE_MY_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Ваш Заказ Успешно Оформлен!", "success"));

    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: USER_ERROR
    });
  }
};

// Get User Favorites
// @route    GET http://localhost:5000/api/users/my-favorites
// @desc     Get my favorites
// @access   Private
export const getMyFavorites = () => async (dispatch) => {
  try {
    const res = await api.get("/users/my-favorites");

    dispatch({
      type: GET_MY_FAVORITES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
};

// Add Product Card To User Favorites
// @route    POST http://localhost:5000/api/users/add-product-to-favorites/:product_card
// @desc     Add product card to my favorites
// @access   Private
export const addProductCardToMyFavorites =
  (productCardId, navigate) => async (dispatch) => {
    try {
      const res = await api.post(
        `/users/add-product-to-favorites/${productCardId}`
      );

      dispatch({
        type: UPDATE_MY_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("Товар Был Добавлен Вам В Избранное!", "success"));

      navigate("/my-basket");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: USER_ERROR
      });
    }
  };

// @route    PUT http://localhost:5000/api/users/remove-product-to-favorites/:product_card
// @desc     Remove product card from my favorites
// @access   Private
export const removeProductCardToMyFavorites =
  (productCardId, navigate) => async (dispatch) => {
    try {
      const res = await api.post(
        `/users/remove-product-to-favorites/${productCardId}`
      );

      dispatch({
        type: UPDATE_MY_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("Товар Был Удален Из Вашего Избранного!", "success"));

      navigate("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: USER_ERROR
      });
    }
  };
