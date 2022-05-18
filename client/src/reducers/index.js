import { combineReducers } from "redux";

// Import Reducers
import alert from "./alert";
import user from "./users";
import productCard from "./productCard";

export default combineReducers({
  alert,
  user,
  productCard
});
