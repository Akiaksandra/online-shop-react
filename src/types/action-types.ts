import { Error, ICurrentUser, OrdersHistory, UserCart, Order, AllProducts, IProduct, SortParam, IFilterParams } from './store-types';

import { OPEN_MODAL, CLOSE_MODAL } from '../store/modal-reducer/modal-consts';
import {FETCH_ERROR_USER, FETCH_START_USER, FETCH_USER_SUCCESS,  LOGOUT_USER_SUCCESS, CLEAR_USERS_ERROR, FETCH_USER_CART_SUCCESS, FETCH_ORDERS_HISTORY_SUCCESS, CLEAR_ORDERS_HISTORY, SET_CURRENT_ORDER_SUCCESS, CLEAR_CURRENT_ORDER } from '../store/users-reducer/user-consts';
import { FETCH_START_PRODUCT, FETCH_ERROR_PRODUCT, CLEAR_PRODUCTS_ERROR, CLEAR_FILTERS_ACTION, DELETE_CURRENT_PRODUCT, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_SUCCESS, SORT_PRODUCTS, FILTER_PRODUCTS } from '../store/product-reducer/product-consts';

//========== ACTIONS-MODAL ==============

export interface IOpenModalAction {
  type: typeof OPEN_MODAL, 
  payload: string,
}

export interface ICloseModalAction {
  type: typeof CLOSE_MODAL, 
  payload: string,
}

export type ModalActionTypes = IOpenModalAction | ICloseModalAction;

//========== ACTIONS-USERS ==============

export interface FetchStartAction {
  type: typeof FETCH_START_USER | typeof FETCH_START_PRODUCT, 
  payload: string,
}

export interface FetchErrorAction {
  type: typeof FETCH_ERROR_USER | typeof FETCH_ERROR_PRODUCT,
  payload: Error,
}

export interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS,
  payload: ICurrentUser,
}

export interface FetchUserCartSuccessAction {
  type: typeof FETCH_USER_CART_SUCCESS,
  payload: UserCart,
}

export interface FetchOrdersHistorySuccessAction {
  type: typeof FETCH_ORDERS_HISTORY_SUCCESS,
  payload: OrdersHistory,
}

export interface SetCurrentOrderSuccessAction {
  type: typeof SET_CURRENT_ORDER_SUCCESS,
  payload: Order,
}

export interface ClearUsersErrorAction {
  type: typeof CLEAR_USERS_ERROR,
  payload: string,
}

export interface ClearOrdersHistoryAction {
  type: typeof CLEAR_ORDERS_HISTORY,
  payload: string,
}

export interface ClearCurrentOrderAction {
  type: typeof CLEAR_CURRENT_ORDER,
  payload: string,
}

export interface LogOutAction {
  type: typeof LOGOUT_USER_SUCCESS,
  payload: string,
}

export type UserActionTypes = FetchStartAction | FetchErrorAction | FetchUserSuccessAction | FetchUserCartSuccessAction | FetchOrdersHistorySuccessAction | SetCurrentOrderSuccessAction | ClearUsersErrorAction | ClearOrdersHistoryAction | ClearCurrentOrderAction | LogOutAction;

//========== ACTIONS-PRODUCTS ==============
export interface ClearProductsErrorAction {
  type: typeof CLEAR_PRODUCTS_ERROR,
}

export interface ClearFiltersAction {
  type: typeof CLEAR_FILTERS_ACTION,
}

export interface DeleteCurrentProduct {
  type: typeof DELETE_CURRENT_PRODUCT,
}

export interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS,
  payload: AllProducts,
}

export interface FetchProductSuccessAction {
  type: typeof FETCH_PRODUCT_SUCCESS,
  payload: IProduct,
}

export interface SortProductsAction {
  type: typeof SORT_PRODUCTS,
  payload: SortParam,
}

export interface FilterProductsAction {
  type: typeof FILTER_PRODUCTS,
  payload: IFilterParams,
}

export type ProductsActionTypes = FetchStartAction | FetchErrorAction | ClearProductsErrorAction | ClearFiltersAction | DeleteCurrentProduct | FetchProductsSuccessAction | FetchProductSuccessAction | SortProductsAction | FilterProductsAction;