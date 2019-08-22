import { combineReducers } from "redux";
import currentUser from "./currentUser";
import companyReducer from './companyReducer';


const rootReducer = combineReducers({
  userInfo: currentUser,
  companies: companyReducer
});

export default rootReducer;