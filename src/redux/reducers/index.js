import { combineReducers } from "redux";

// import CounterReducer from "./Counter";
import RecipeReducer from "./Recipes";
import authReducer from "./auth";

const reducers = combineReducers({
  recipes: RecipeReducer,
  auth: authReducer,
});

export default reducers;
