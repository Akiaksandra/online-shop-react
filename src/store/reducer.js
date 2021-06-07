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

// import {FETCH_ERROR, FETCH_START, FETCH_PRODUCTS_SUCCESS, FETCH_USER_SUCCESS, FETCH_USER_CART_SUCCESS,FETCH_ALL_USERS_SUCCESS, LOGOUT_USER_SUCCESS, OPEN_MODAL, CLOSE_MODAL, FETCH_PRODUCT_SUCCESS, DELETE_CURRENT_PRODUCT} from '../utils/consts';
// const defaultState = {
//   currentUser: {
//     userInfo: {
//       userEmail: null,
//       userId: null,  
//       isAdmin: false,
//     },
//     userOrdersHistory: {
//       orderId: null,
//       orderStatus: null,
//       orderProducts: [],
//       orderPrice: null,
//       orderDileviryInfo: {
//         deliveryType: null,
//         town: null,
//         street: null,
//         house: null,
//         flat: null,
//         floor: null,
//         phone: null,
//         initials: null,
//         comment: null,
//       }
//     },
//   },
//   userCart: [], // массив товаров в корзине (только для пользователей)
//   allProducts: [],
//   currentProduct: {},
//   allUsers: [], // для админа
//   status: {  
//     loading: false,
//     error: false,
//     modal: {
//       isOpenModal: false,
//       aim: null,
//     },
//     isLogin: false,
//   }
// };

// const reducer = (state = defaultState, action) => {
//   switch(action.type) {
//     case FETCH_START:
//       return {...state, status: {...state.status, loading: true}};
//     case FETCH_ERROR:
//       return {...state, status: {...state.status, loading: false, error: true, alert: action.payload}};
      
//     case FETCH_PRODUCTS_SUCCESS: // Получение товаров
//       return {...state, status: {...state.status,  loading: false }, allProducts: action.payload};
//     case FETCH_PRODUCT_SUCCESS: // Получение товарА
//       return {...state, status: {...state.status,  loading: false }, currentProduct: action.payload};
//     case DELETE_CURRENT_PRODUCT: // Удаление текущего товара
//       return {...state, status: {...state.status,  loading: false }, currentProduct: {}};
//     case FETCH_USER_SUCCESS: // Получение текущего юзера
//       return {...state, status: {...state.status,  loading: false, isLogin: true }, currentUser: action.payload};
//     case LOGOUT_USER_SUCCESS: // РАЗЛОГИН
//       return {...state, status: {...state.status,  loading: false, isLogin: false }, currentUser: null};
//     case FETCH_USER_CART_SUCCESS: // Получение корзины юзера
//       return {...state, status: {...state.status,  loading: false }, userCart: action.payload};
//     case FETCH_ALL_USERS_SUCCESS: //Получение всех юзеров
//       return {...state, status: {...state.status,  loading: false }, allUsers: action.payload};
//     default: return state;  

//     case OPEN_MODAL: // Получение товаров
//       return {...state, status: { ...state.status, modal: {isOpenModal: true, aim: action.payload}}};
//     case CLOSE_MODAL: // Получение товаров
//       return {...state, status: { ...state.status, modal: {isOpenModal: false, aim: null }}};
//   }
// }

// export default reducer;
