import {FETCH_ERROR_PRODUCT, FETCH_START_PRODUCT, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_SUCCESS, DELETE_CURRENT_PRODUCT, SORT_PRODUCTS, FILTER_PRODUCTS, CLEAR_PRODUCTS_ERROR, CLEAR_FILTERS_ACTION } from './product-consts';

const initFilters = {
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

const defaultState = {
  allProducts: [],
  currentProduct: null,
  loading: false,
  errorProducts: false,
  sortParam: 'data_down',
  filterParams: initFilters,
};

const productReducer = (state = defaultState, action) => {
  switch(action.type) {
    case FETCH_START_PRODUCT:
      return {...state, loading: true};
    case FETCH_ERROR_PRODUCT:
      return {...state, loading: false, errorProducts: action.payload}; 
    case CLEAR_PRODUCTS_ERROR:
      return {...state, errorProducts: false};        
    case FETCH_PRODUCTS_SUCCESS: // Получение товаров
      return {...state, loading: false, allProducts: action.payload};
    case FETCH_PRODUCT_SUCCESS: // Получение товарА
      return {...state, loading: false, currentProduct: action.payload};
    case DELETE_CURRENT_PRODUCT: // Удаление текущего товара
      return {...state, loading: false, currentProduct: null};
    case SORT_PRODUCTS: // Добавление параметра сортировки
      return {...state, loading: false, sortParam: action.payload};  
    case FILTER_PRODUCTS: // Добавление параметра сортировки
      return {...state, loading: false, filterParams: action.payload}; 
    case CLEAR_FILTERS_ACTION: // Добавление параметра сортировки
      return {...state, sortParam: 'data_down', filterParams: initFilters};       
    default: return state;  
  }
}

export default productReducer;