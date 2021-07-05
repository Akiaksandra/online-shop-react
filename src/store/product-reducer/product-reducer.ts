import { IFilterParams,IProducts } from '../../types/store-types'
import { ProductsActionTypes, ProductTypesNames } from '../../types/action-types';

const initFilters: IFilterParams = {
  category: "all",
  minPrice: 1,
  maxPrice: 100000,
  manufacturer: {
    "samsung": false,
    "xiaomi": false,
    "lg": false,
    "sony": false,
    "philips": false,
    "horizont": false,
  },
  availability: false,
  search: "",
}

const defaultState: IProducts = {
  allProducts: [],
  currentProduct: null,
  loading: false,
  errorProducts: false,
  sortParam: 'data_down',
  filterParams: initFilters,
};

const productReducer = (state = defaultState, action:ProductsActionTypes):IProducts => {
  switch(action.type) {
    case ProductTypesNames.FETCH_START_PRODUCT:
      return {...state, loading: true};
    case ProductTypesNames.FETCH_ERROR_PRODUCT:
      return {...state, loading: false, errorProducts: action.payload}; 
    case ProductTypesNames.CLEAR_PRODUCTS_ERROR:
      return {...state, errorProducts: false};        
    case ProductTypesNames.FETCH_PRODUCTS_SUCCESS: // Получение товаров
      return {...state, loading: false, allProducts: action.payload};
    case ProductTypesNames.FETCH_PRODUCT_SUCCESS: // Получение товарА
      return {...state, loading: false, currentProduct: action.payload};
    case ProductTypesNames.DELETE_CURRENT_PRODUCT: // Удаление текущего товара
      return {...state, loading: false, currentProduct: null};
    case ProductTypesNames.SORT_PRODUCTS: // Добавление параметра сортировки
      return {...state, loading: false, sortParam: action.payload};  
    case ProductTypesNames.FILTER_PRODUCTS: // Добавление параметра сортировки
      return {...state, loading: false, filterParams: action.payload}; 
    case ProductTypesNames.CLEAR_FILTERS_ACTION: // Добавление параметра сортировки
      return {...state, sortParam: 'data_down', filterParams: initFilters};       
    default: return state;  
  }
}

export default productReducer;