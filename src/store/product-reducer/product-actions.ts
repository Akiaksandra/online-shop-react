import { getResource, postResource, getResourceId, deleteResourceId, updateResourceId } from '../../server';
import createFilterUrl from './create-filter-url';
import createSortUrl from './create-sort-url';

import { AllProducts, IFilterParams, IProduct, SortParam } from '../../types/store-types';
import { ClearFiltersAction, ClearProductsErrorAction, DeleteCurrentProduct, FetchErrorAction, FetchProductsSuccessAction, FetchProductSuccessAction, FetchStartAction, FilterProductsAction, ProductTypesNames, SortProductsAction } from '../../types/action-types';
import { ProductsThunkType } from '../../types/thunk-types';
import { UpdateData } from '../../types/server-types';

const fetchStartAction = (payload: string = ""): FetchStartAction  => ({ type: ProductTypesNames.FETCH_START_PRODUCT, payload });

const fetchErrorAction = (payload: string =""): FetchErrorAction => {
  return ({ type: ProductTypesNames.FETCH_ERROR_PRODUCT, payload })
}

export const clearProductsErrorAction = (): ClearProductsErrorAction => ({ type: ProductTypesNames.CLEAR_PRODUCTS_ERROR });

const clearFiltersAction = (): ClearFiltersAction => ({ type: ProductTypesNames.CLEAR_FILTERS_ACTION });

export const deleteCurrentProduct = (): DeleteCurrentProduct => ({ type: ProductTypesNames.DELETE_CURRENT_PRODUCT });

const fetchProductsSuccessAction = (payload: AllProducts): FetchProductsSuccessAction => ({ type: ProductTypesNames.FETCH_PRODUCTS_SUCCESS, payload });

export const fetchProductSuccessAction = (payload: IProduct): FetchProductSuccessAction => ({ type: ProductTypesNames.FETCH_PRODUCT_SUCCESS, payload });

export const sortProductsAction = (payload: SortParam): SortProductsAction => ({ type: ProductTypesNames.SORT_PRODUCTS, payload});
export const filterProductsAction = (payload: IFilterParams): FilterProductsAction => ({ type: ProductTypesNames.FILTER_PRODUCTS, payload});

export const fetchProducts = (sortValue: SortParam = "", filters: IFilterParams): ProductsThunkType => {
  return async (dispatch)=> {
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

export const addProduct = (data: IProduct | string): ProductsThunkType => {
  return async (dispatch) => {
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

export const deleteProductAction = (data: any): ProductsThunkType => {
  return async (dispatch) => {
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

export const updateProduct = (data: IProduct, id: string): ProductsThunkType => {
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const updateData: UpdateData = {
        category: data.category,
        description: data.description,
        img: data.img,
        manufacturer: data.manufacturer,
        price: +data.price,
        quantity: +data.quantity,
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

export const fetchProduct = (id: string): ProductsThunkType => {
  return async (dispatch) => {
    dispatch(fetchStartAction());
    try {
      const response = await getResourceId('products', id)
      dispatch(fetchProductSuccessAction(response.data));
    } catch (e) {
      dispatch(fetchErrorAction("Произошла ошибка при загрузке товара"))
    }
  }
}

export const clearFilters = (): ProductsThunkType => {
  return async (dispatch) => {
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
