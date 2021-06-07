import {FETCH_ERROR_PRODUCT, FETCH_START_PRODUCT, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_SUCCESS, DELETE_CURRENT_PRODUCT, SORT_PRODUCTS, FILTER_PRODUCTS, CLEAR_PRODUCTS_ERROR, CLEAR_FILTERS_ACTION} from './product-consts';
import { getResource, postResource, getResourceId, deleteResourceId, updateResourceId } from '../../server';
import createFilterUrl from './create-filter-url';
import createSortUrl from './create-sort-url';

const fetchStartAction = () => ({ type: FETCH_START_PRODUCT });

const fetchErrorAction = (payload) => {
  return ({ type: FETCH_ERROR_PRODUCT, payload })
}

export const clearProductsErrorAction = () => ({ type: CLEAR_PRODUCTS_ERROR });

const crearFiltersAction = () => ({ type: CLEAR_FILTERS_ACTION });

export const deleteCurrentProduct = () => ({ type: DELETE_CURRENT_PRODUCT });

const fetchProductsSuccessAction = (payload) => ({ type: FETCH_PRODUCTS_SUCCESS, payload });

export const fetchProductSuccessAction = (payload) => ({ type: FETCH_PRODUCT_SUCCESS, payload });

export const fetchProducts = (sortValue = "", filters = "") => {
  return async dispatch => {
    dispatch(fetchStartAction());
    try {
      const sortParam = createSortUrl(sortValue);
      const filterParam = createFilterUrl(filters);
      const response = await getResource('products', filterParam, sortParam)
      dispatch(fetchProductsSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке товаров"))
    }
  }
}  

export const addProduct = (data) => {
  return async dispatch => {
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

export const deleteProductAction = (data) => {
  return async dispatch => {
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

export const updateProduct = (data, id) => {
  return async dispatch => {
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

export const fetchProduct = (id) => {
  return async dispatch => {
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
  return async dispatch => {
    dispatch(fetchStartAction());
    try {
      crearFiltersAction();
      const response = await getResource('products')
      dispatch(fetchProductsSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке товаров"))
    }
  }
}
export const sortProductsAction = (payload) => ({ type: SORT_PRODUCTS, payload});
export const filterProductsAction = (payload) => ({ type: FILTER_PRODUCTS, payload});