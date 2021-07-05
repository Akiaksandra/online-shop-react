import { UserActionTypes, UsersTypesNames } from '../../types/action-types';
import { IUsers } from '../../types/store-types'

const defaultState: IUsers = {
  currentUser: null,
  ordersHistory: null,    
  userCart: null,
  loading: false,
  errorUsers: false,
  isLogin: false,
  currentOrder: null,
};

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
      return {...state, currentOrder: null};         
    case UsersTypesNames.LOGOUT_USER_SUCCESS: // РАЗЛОГИН
      return {...state,  loading: false, isLogin: false, currentUser: null, userCart: null, ordersHistory: null, currentOrder: null};    
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