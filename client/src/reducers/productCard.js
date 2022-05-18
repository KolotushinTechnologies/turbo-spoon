import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_ERROR,
  CLEAR_PRODUCT
} from "../actions/types";

const initialState = {
  product: null,
  products: [],
  loading: true,
  error: {}
};

function productCardReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        product: null
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null
      };
  }
}

export default productCardReducer;
