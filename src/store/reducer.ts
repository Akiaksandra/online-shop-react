import { combineReducers } from "redux";
import productReducer from './product-reducer';
import modalReducer from './modal-reducer';
import usersReducer from './users-reducer';

const reducer = combineReducers({
  products: productReducer, 
  modal: modalReducer,
  users: usersReducer,
});

export default reducer;