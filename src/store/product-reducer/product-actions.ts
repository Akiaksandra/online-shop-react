import {FETCH_ERROR_PRODUCT, FETCH_START_PRODUCT, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_SUCCESS, DELETE_CURRENT_PRODUCT, SORT_PRODUCTS, FILTER_PRODUCTS, CLEAR_PRODUCTS_ERROR, CLEAR_FILTERS_ACTION} from './product-consts';
import { getResource, postResource, getResourceId, deleteResourceId, updateResourceId } from '../../server';
import createFilterUrl from './create-filter-url';
import createSortUrl from './create-sort-url';

import { AllProducts, IFilterParams, IProduct, SortParam } from '../../types/store-types';
import { ClearFiltersAction, ClearProductsErrorAction, DeleteCurrentProduct, FetchErrorAction, FetchProductsSuccessAction, FetchProductSuccessAction, FetchStartAction, FilterProductsAction, ProductsActionTypes, SortProductsAction } from '../../types/action-types';
import { Dispatch } from 'redux';

const fetchStartAction = (payload: string = ""): FetchStartAction  => ({ type: FETCH_START_PRODUCT, payload });

const fetchErrorAction = (payload: string =""): FetchErrorAction => {
  return ({ type: FETCH_ERROR_PRODUCT, payload })
}

export const clearProductsErrorAction = (): ClearProductsErrorAction => ({ type: CLEAR_PRODUCTS_ERROR });

const clearFiltersAction = (): ClearFiltersAction => ({ type: CLEAR_FILTERS_ACTION });

export const deleteCurrentProduct = (): DeleteCurrentProduct => ({ type: DELETE_CURRENT_PRODUCT });

const fetchProductsSuccessAction = (payload: AllProducts): FetchProductsSuccessAction => ({ type: FETCH_PRODUCTS_SUCCESS, payload });

export const fetchProductSuccessAction = (payload: IProduct): FetchProductSuccessAction => ({ type: FETCH_PRODUCT_SUCCESS, payload });

export const sortProductsAction = (payload: SortParam): SortProductsAction => ({ type: SORT_PRODUCTS, payload});
export const filterProductsAction = (payload: IFilterParams): FilterProductsAction => ({ type: FILTER_PRODUCTS, payload});

export const fetchProducts = (sortValue: SortParam = "", filters: IFilterParams) => {
  return async (dispatch: Dispatch<ProductsActionTypes>)=> {
    dispatch(fetchStartAction());
    try {
      const sortParam: string = createSortUrl(sortValue);
      const filterParam: string = createFilterUrl(filters);
      const response = await getResource('products', filterParam, sortParam)
      dispatch(fetchProductsSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке товаров"))
    }
  }
}  

export const addProduct = (data: IProduct) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    dispatch(fetchStartAction());
    try {
      await postResource('products', data);
      const response = await getResource('products')
      dispatch(fetchProductsSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при добавлении товара"))
    }
  }
}  

export const deleteProductAction = (data: any) => {
  console.log('data: ', data);
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    dispatch(fetchStartAction());
    try {
      await deleteResourceId('products', data);
      const response = await getResource('products')
      dispatch(fetchProductsSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при удалении товара"))
    }
  }
} 

export const updateProduct = (data: IProduct, id: string) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    dispatch(fetchStartAction());
    try {
      const updateData = {
        category: data.category,
        description: data.description,
        img: data.img,
        manufacturer: data.manufacturer,
        price: data.price,
        quantity: data.quantity,
        title: data.title,
      }
      await updateResourceId('products', JSON.stringify(updateData), id);
      const response = await getResource('products')
      dispatch(fetchProductsSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при обновлении товара"))
    }
  }
}  

export const fetchProduct = (id: string) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    dispatch(fetchStartAction());
    try {
      const response = await getResourceId('products', id)
      dispatch(fetchProductSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке товара"))
    }
  }
}

export const clearFilters = () => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    dispatch(fetchStartAction());
    try {
      clearFiltersAction();
      const response = await getResource('products')
      dispatch(fetchProductsSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке товаров"))
    }
  }
}
