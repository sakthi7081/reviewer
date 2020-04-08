import { combineReducers } from "redux";
import home from "./home";

const createReducer = asyncReducers =>
  combineReducers({
    home,     
    ...asyncReducers
  });

export default createReducer;