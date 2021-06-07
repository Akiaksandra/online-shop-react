import { FETCH_START_USER, FETCH_ERROR_USER, LOGOUT_USER_SUCCESS, FETCH_USER_CART_SUCCESS, FETCH_USER_SUCCESS, CLEAR_USERS_ERROR, FETCH_ORDERS_HISTORY_SUCCESS, CLEAR_ORDERS_HISTORY, SET_CURRENT_ORDER_SUCCESS, CLEAR_CURRENT_ORDER} from './user-consts';

const defaultState = {
  currentUser: null,
  ordersHistory: null,    
  userCart: null,
  loading: false,
  errorUsers: false,
  isLogin: false,
  currentOrder: false,
};

const usersReducer = (state = defaultState, action) => {
  switch(action.type) {
    case FETCH_START_USER:
    return {...state, loading: true};
    case FETCH_ERROR_USER:
      return {...state, loading: false, errorUsers: action.payload};
    case CLEAR_USERS_ERROR:
      return {...state, errorUsers: false};    
    case CLEAR_ORDERS_HISTORY:
      return {...state, ordersHistory: null};      
    case CLEAR_CURRENT_ORDER:
      return {...state, currentOrder: false};         
    case LOGOUT_USER_SUCCESS: // РАЗЛОГИН
      return {...state,  loading: false, isLogin: false, currentUser: null, userCart: null, ordersHistory: null, isAdmin: false, currentOrder: false};    
    case FETCH_USER_CART_SUCCESS: // Получение корзины юзера
      return {...state,  loading: false, userCart: action.payload};
    case FETCH_ORDERS_HISTORY_SUCCESS: // Получение корзины юзера
      return {...state,  loading: false, ordersHistory: action.payload};   
    case SET_CURRENT_ORDER_SUCCESS: // Текущий заказ
      return {...state,  loading: false, currentOrder: action.payload};            
    case FETCH_USER_SUCCESS: // Получение текущего юзера
      return {...state, loading: false, currentUser: action.payload, isLogin: true};
    default: return state;  
  }
}
export default usersReducer;