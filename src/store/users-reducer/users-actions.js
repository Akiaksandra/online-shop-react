import {FETCH_ERROR_USER, FETCH_START_USER, FETCH_USER_SUCCESS,  LOGOUT_USER_SUCCESS, CLEAR_USERS_ERROR, FETCH_USER_CART_SUCCESS, FETCH_ORDERS_HISTORY_SUCCESS, CLEAR_ORDERS_HISTORY, SET_CURRENT_ORDER_SUCCESS, CLEAR_CURRENT_ORDER } from './user-consts';
import { getResource, postResource, updateResourceId } from '../../server'

const fetchStartAction = () => ({ type: FETCH_START_USER });

const fetchErrorAction = (payload) => {
  return ({ type: FETCH_ERROR_USER, payload })
}

const fetchUserSuccessAction = (payload) => ({ type: FETCH_USER_SUCCESS, payload });

const fetchUserCartSuccessAction = (payload) => ({ type: FETCH_USER_CART_SUCCESS, payload });

const fetchOrdersHistorySuccessAction = (payload) => ({ type: FETCH_ORDERS_HISTORY_SUCCESS, payload });

const setCurrentOrderSuccessAction = (payload) => ({ type: SET_CURRENT_ORDER_SUCCESS, payload });

export const clearUsersErrorAction = () => ({ type: CLEAR_USERS_ERROR });
export const clearOrdersHistoryAction = () => ({ type: CLEAR_ORDERS_HISTORY });
export const clearCurrentOrderAction = () => ({ type: CLEAR_CURRENT_ORDER });

export const logOutAction = () => ({ type: LOGOUT_USER_SUCCESS });

export const checkEmailAndPassword = (email, password) => {
  return async dispatch => {
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

export const fetchUserCart = (id) => {
  return async dispatch => {
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

export const fetchUserOrdersHistory = (id) => {
  return async dispatch => {
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

export const fetchAllUOrdersHistory = () => {
  return async dispatch => {
    dispatch(fetchStartAction());
    try {
      const response = await getResource('orders-history');
      dispatch(fetchOrdersHistorySuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке истории заказов"))
    }
  }
}

const createUserCart = (id) => {
  return async dispatch => {
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

export const createNewOrder = (data ) => {
  return async dispatch => {
    dispatch(fetchStartAction());
    try {
      const response = await postResource('orders-history', data);
      dispatch(setCurrentOrderSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при создании заказа"))
    }
  }
}

export const updateUserCart = (data, id) => {
  return async dispatch => {
    dispatch(fetchStartAction());
    try {
      const response = await updateResourceId('userscarts', data, id);
      dispatch(fetchUserCartSuccessAction(response.data));     
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при работе с корзиной"))
    }
  }
}

export const updateOrder = (data, id, userId) => {
  return async dispatch => {
    dispatch(fetchStartAction());
    try {
      updateResourceId('orders-history', data, id);
      dispatch(fetchUserOrdersHistory(userId));     
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при работе с заказами"))
    }
  }
}

