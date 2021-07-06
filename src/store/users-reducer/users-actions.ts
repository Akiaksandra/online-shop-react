import { getResource, postResource, updateResourceId } from '../../server';

import { ICurrentUser, UserCart, OrdersHistory, Order, AllProducts } from '../../types/store-types';
import { FetchErrorAction, FetchStartAction, FetchUserSuccessAction, FetchUserCartSuccessAction, FetchOrdersHistorySuccessAction, SetCurrentOrderSuccessAction, ClearUsersErrorAction, ClearOrdersHistoryAction, LogOutAction, ClearCurrentOrderAction, UsersTypesNames } from '../../types/action-types';
import { UsersThunkType } from '../../types/thunk-types';

const fetchStartAction = (payload: string = ""): FetchStartAction => ({ type: UsersTypesNames.FETCH_START_USER, payload });

const fetchErrorAction = (payload: string): FetchErrorAction => ({ type: UsersTypesNames.FETCH_ERROR_USER, payload })

const fetchUserSuccessAction = (payload: ICurrentUser): FetchUserSuccessAction => ({ type: UsersTypesNames.FETCH_USER_SUCCESS, payload });

const fetchUserCartSuccessAction = (payload: UserCart): FetchUserCartSuccessAction => ({ type: UsersTypesNames.FETCH_USER_CART_SUCCESS, payload });

const fetchOrdersHistorySuccessAction = (payload: OrdersHistory): FetchOrdersHistorySuccessAction => ({ type: UsersTypesNames.FETCH_ORDERS_HISTORY_SUCCESS, payload });

const setCurrentOrderSuccessAction = (payload: Order): SetCurrentOrderSuccessAction => ({ type: UsersTypesNames.SET_CURRENT_ORDER_SUCCESS, payload });

export const clearUsersErrorAction = (payload: string = ""): ClearUsersErrorAction => ({ type: UsersTypesNames.CLEAR_USERS_ERROR, payload });

export const clearOrdersHistoryAction = (payload: string = ""): ClearOrdersHistoryAction => ({ type: UsersTypesNames.CLEAR_ORDERS_HISTORY, payload });

export const clearCurrentOrderAction = (payload: string = ""): ClearCurrentOrderAction => ({ type: UsersTypesNames.CLEAR_CURRENT_ORDER, payload});

export const logOutAction = ( payload: string = "" ): LogOutAction => ({ type: UsersTypesNames.LOGOUT_USER_SUCCESS, payload  });

export const checkEmailAndPassword = (email: string, password: string): UsersThunkType => {
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const filterParams = `"email" : "${email}","password" : "${password}"`;
      const response = await getResource('myusers', filterParams);
      if (response.data.length > 0) dispatch(fetchUserSuccessAction(response.data[0]))
      else dispatch(fetchErrorAction("Произошла ошибка при загрузке пользователя"))
     
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке пользователя"))
    }
  }
}  

export const fetchUserCart = (id: string): UsersThunkType => {
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const filterParams = `"forUser" : "${id}"`;
      const response = await getResource('userscarts', filterParams);
      if (response.data.length > 0) dispatch(fetchUserCartSuccessAction(response.data[0]));
      else dispatch(createUserCart(id))
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке корзины"))
    }
  }
}  

export const fetchUserOrdersHistory = (id: string): UsersThunkType => {
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const filterParams = `"forUser" : "${id}"`;
      const response = await getResource('orders-history', filterParams);
      dispatch(fetchOrdersHistorySuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке истории заказов"))
    }
  }
}

export const fetchAllUOrdersHistory = (): UsersThunkType => {
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const response = await getResource('orders-history');
      dispatch(fetchOrdersHistorySuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке истории заказов"))
    }
  }
}

const createUserCart = (id: string): UsersThunkType => {
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const data = `{"forUser" : "${id}", "products" : []}`
      const response = await postResource('userscarts', data);
      dispatch(fetchUserCartSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при создании корзины"))
    }
  }
}

export const createNewOrder = (data: Order | string): UsersThunkType => {
  console.log('data: ', data);
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const response = await postResource('orders-history', data);
      dispatch(setCurrentOrderSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при создании заказа"))
    }
  }
}

export const updateUserCart = (data: { products: AllProducts} | string, id: string): UsersThunkType => {
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const response = await updateResourceId('userscarts', data, id);
      dispatch(fetchUserCartSuccessAction(response.data));     
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при работе с корзиной"))
    }
  }
}

export const updateOrder = (data: Order | string, id: string, userId: string): UsersThunkType => {
  console.log('data: ', data);
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      updateResourceId('orders-history', data, id);
      dispatch(fetchUserOrdersHistory(userId));     
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при работе с заказами"))
    }
  }
}

