import { combineReducers } from "redux";

// Import Reducers
import alert from "./alert";
import userWork from "./users";
import productCard from "./productCard";

export default combineReducers({
  alert,
  userWork,
  productCard
});
