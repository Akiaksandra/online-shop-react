import { Error, ICurrentUser, OrdersHistory, UserCart, Order, AllProducts, IProduct, SortParam, IFilterParams } from './store-types';

//========== ACTIONS-MODAL ==============

export enum ModalTypesNames {
  OPEN_MODAL = "[MODAL] OPEN_MODAL",
  CLOSE_MODAL = "[MODAL] CLOSE_MODAL",
}

export interface IOpenModalAction {
  type: ModalTypesNames.OPEN_MODAL, 
  payload: string,
}

export interface ICloseModalAction {
  type: ModalTypesNames.CLOSE_MODAL, 
  payload: string,
}

export type ModalActionTypes = IOpenModalAction | ICloseModalAction;

//========== ACTIONS-USERS ==============

export enum UsersTypesNames {
  FETCH_START_USER = '[USERS] FETCH_START_USER',
  FETCH_ERROR_USER = '[USERS] FETCH_ERROR_USER',
  FETCH_USER_SUCCESS = '[USERS] FETCH_USER_SUCCESS',
  FETCH_USER_CART_SUCCESS = '[USERS] FETCH_USER_CART_SUCCESS',
  FETCH_ORDERS_HISTORY_SUCCESS = '[USERS] FETCH_ORDERS_HISTORY_SUCCESS',
  SET_CURRENT_ORDER_SUCCESS = '[USERS] SET_CURRENT_ORDER_SUCCESS',
  CLEAR_USERS_ERROR = '[USERS] CLEAR_USERS_ERROR',
  CLEAR_ORDERS_HISTORY = '[USERS] CLEAR_ORDERS_HISTORY',
  CLEAR_CURRENT_ORDER = '[USERS] CLEAR_CURRENT_ORDER',
  LOGOUT_USER_SUCCESS = '[USERS] LOGOUT_USER_SUCCESS',
}

export interface FetchStartAction {
  type: UsersTypesNames.FETCH_START_USER | ProductTypesNames.FETCH_START_PRODUCT, 
  payload: string,
}

export interface FetchErrorAction {
  type: UsersTypesNames.FETCH_ERROR_USER | ProductTypesNames.FETCH_ERROR_PRODUCT,
  payload: Error,
}

export interface FetchUserSuccessAction {
  type: UsersTypesNames.FETCH_USER_SUCCESS,
  payload: ICurrentUser,
}

export interface FetchUserCartSuccessAction {
  type: UsersTypesNames.FETCH_USER_CART_SUCCESS,
  payload: UserCart,
}

export interface FetchOrdersHistorySuccessAction {
  type: UsersTypesNames.FETCH_ORDERS_HISTORY_SUCCESS,
  payload: OrdersHistory,
}

export interface SetCurrentOrderSuccessAction {
  type: UsersTypesNames.SET_CURRENT_ORDER_SUCCESS,
  payload: Order,
}

export interface ClearUsersErrorAction {
  type: UsersTypesNames.CLEAR_USERS_ERROR,
  payload: string,
}

export interface ClearOrdersHistoryAction {
  type: UsersTypesNames.CLEAR_ORDERS_HISTORY,
  payload: string,
}

export interface ClearCurrentOrderAction {
  type: UsersTypesNames.CLEAR_CURRENT_ORDER,
  payload: string,
}

export interface LogOutAction {
  type: UsersTypesNames.LOGOUT_USER_SUCCESS,
  payload: string,
}

export type UserActionTypes = FetchStartAction | FetchErrorAction | FetchUserSuccessAction | FetchUserCartSuccessAction | FetchOrdersHistorySuccessAction | SetCurrentOrderSuccessAction | ClearUsersErrorAction | ClearOrdersHistoryAction | ClearCurrentOrderAction | LogOutAction;

//========== ACTIONS-PRODUCTS ==============

export enum ProductTypesNames {
  CLEAR_PRODUCTS_ERROR = '[PRODUCTS] CLEAR_PRODUCTS_ERROR',
  CLEAR_FILTERS_ACTION = '[PRODUCTS] CLEAR_FILTERS_ACTION',
  DELETE_CURRENT_PRODUCT = '[PRODUCTS] DELETE_CURRENT_PRODUCT',
  FETCH_PRODUCTS_SUCCESS = '[PRODUCTS] FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCT_SUCCESS = '[PRODUCTS] FETCH_PRODUCT_SUCCESS',
  SORT_PRODUCTS = '[PRODUCTS] SORT_PRODUCTS',
  FILTER_PRODUCTS = '[PRODUCTS] FILTER_PRODUCTS',
  FETCH_START_PRODUCT = "[PRODUCTS] FETCH_START_PRODUCT",
  FETCH_ERROR_PRODUCT ="[PRODUCTS] FETCH_ERROR_PRODUCT",
}
export interface ClearProductsErrorAction {
  type: ProductTypesNames.CLEAR_PRODUCTS_ERROR,
}

export interface ClearFiltersAction {
  type: ProductTypesNames.CLEAR_FILTERS_ACTION,
}

export interface DeleteCurrentProduct {
  type: ProductTypesNames.DELETE_CURRENT_PRODUCT,
}

export interface FetchProductsSuccessAction {
  type: ProductTypesNames.FETCH_PRODUCTS_SUCCESS,
  payload: AllProducts,
}

export interface FetchProductSuccessAction {
  type: ProductTypesNames.FETCH_PRODUCT_SUCCESS,
  payload: IProduct,
}

export interface SortProductsAction {
  type: ProductTypesNames.SORT_PRODUCTS,
  payload: SortParam,
}

export interface FilterProductsAction {
  type: ProductTypesNames.FILTER_PRODUCTS,
  payload: IFilterParams,
}

export type ProductsActionTypes = FetchStartAction | FetchErrorAction | ClearProductsErrorAction | ClearFiltersAction | DeleteCurrentProduct | FetchProductsSuccessAction | FetchProductSuccessAction | SortProductsAction | FilterProductsAction;