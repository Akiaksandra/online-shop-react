import { FETCH_START_USER, FETCH_ERROR_USER, LOGOUT_USER_SUCCESS, FETCH_USER_CART_SUCCESS, FETCH_USER_SUCCESS, CLEAR_USERS_ERROR, FETCH_ORDERS_HISTORY_SUCCESS, CLEAR_ORDERS_HISTORY, SET_CURRENT_ORDER_SUCCESS, CLEAR_CURRENT_ORDER} from './user-consts';
import { UserActionTypes, UsersTypesNames } from '../../types/action-types';
import { IUsers } from '../../types/store-types'

const defaultState: IUsers = {
  currentUser: null,
  ordersHistory: null,    
  userCart: null,
  loading: false,
  errorUsers: false,
  isLogin: false,
  currentOrder: false,
};
 // ТИПИЗАЦИЯ action: UserActionTypes !!!!!!!!!
const usersReducer = (state = defaultState, action: UserActionTypes): IUsers => {
  switch(action.type) {
    case UsersTypesNames.FETCH_START_USER:
    return {...state, loading: true};
    case UsersTypesNames.FETCH_ERROR_USER:
      return {...state, loading: false, errorUsers: action.payload};
    case UsersTypesNames.CLEAR_USERS_ERROR:
      return {...state, errorUsers: false};    
    case UsersTypesNames.CLEAR_ORDERS_HISTORY:
      return {...state, ordersHistory: null};      
    case UsersTypesNames.CLEAR_CURRENT_ORDER:
      return {...state, currentOrder: false};         
    case UsersTypesNames.LOGOUT_USER_SUCCESS: // РАЗЛОГИН
      return {...state,  loading: false, isLogin: false, currentUser: null, userCart: null, ordersHistory: null, currentOrder: false};    
    case UsersTypesNames.FETCH_USER_CART_SUCCESS: // Получение корзины юзера
      return {...state,  loading: false, userCart: action.payload};
    case UsersTypesNames.FETCH_ORDERS_HISTORY_SUCCESS: // Получение корзины юзера
      return {...state,  loading: false, ordersHistory: action.payload};   
    case UsersTypesNames.SET_CURRENT_ORDER_SUCCESS: // Текущий заказ
      return {...state,  loading: false, currentOrder: action.payload};            
    case UsersTypesNames.FETCH_USER_SUCCESS: // Получение текущего юзера
      return {...state, loading: false, currentUser: action.payload, isLogin: true};
    default: return state;  
  }
}
export default usersReducer;