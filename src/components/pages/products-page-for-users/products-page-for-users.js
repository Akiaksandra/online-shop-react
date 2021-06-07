import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { InputLabel, FormControl, Select, MenuItem, Grid, Card, IconButton } from '@material-ui/core';
import { fetchProducts, sortProductsAction, clearProductsErrorAction } from '../../../store/product-reducer/product-actions';
import { updateUserCart } from '../../../store/users-reducer/users-actions'
import { useHistory } from 'react-router-dom';
import { PRODUCTS } from '../../../utils/consts';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';
import Navigation from '../../navigation';
// import { fetchAllUsers } from '../../../store/users-reducer/users-actions';

const ProductsPageForUsers = () => {

  const { allProducts, loading, sortParam, filterParams, errorProducts } = useSelector(state => state.products);
  const { minPrice, maxPrice, manufacturer, availability } =  useSelector(state => state.products.filterParams);
  const { userCart, isLogin } = useSelector(state => state.users);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeSortValue = (event) => {
    dispatch(sortProductsAction(event.target.value));
  }

  const handleClick = (e, id) => {
      e.preventDefault(); 
      history.push(`${PRODUCTS}/${id}`)
  }

  const handleAddToCart = (item) => {
    const newItem = {...item};
    const hasData = userCart.products.length > 0 ? userCart.products.reduce((acc, el) => el._id === newItem._id ? acc = el.count + 1 : acc, 1) : 1;
    newItem.count = hasData;
    let newProducts = null;
    hasData === 1 ? newProducts = [...userCart.products, newItem] : newProducts = userCart.products.map(el => el._id === newItem._id ? newItem : el);
    const newData = {products: newProducts}
    dispatch(updateUserCart(JSON.stringify(newData), userCart._id));
  }

  useEffect(() => {
    dispatch(fetchProducts(sortParam, filterParams));
    return () => dispatch(clearProductsErrorAction())
  }, [sortParam, minPrice, maxPrice, manufacturer, availability]);


  const createItems = (arr) => {
    const itemsCards = arr.map(item => {
      return (
        <Grid item md={3} sm={4} xs={6} className={styles.gridItem} key={item._id}>
          <Card className={styles.itemCard} >
              <img src={item.img} alt={item.title} className={styles.image}/>
              <h2 className={styles.title}>{item.title}</h2>
              <div className={styles.info}>
              <div className={styles.desc}>
                  <span>Цена {item.price}р.</span>
                  <a href='/' onClick={(e) => handleClick(e, item._id)}>Подробнее...</a>
                </div>
                {isLogin ? 
                <IconButton aria-label="add" className={styles.button} onClick={() => handleAddToCart(item)}>
                  <AddShoppingCartIcon fontSize="inherit"/>
                </IconButton> : null}
                
              </div>
            </Card>
          </Grid>
      )
    })
    return itemsCards; 
  }

  const filterAllProducts = (arr) => {
    const filterByCategory = (arrForCategory) => {
      let result = arrForCategory;
      if (filterParams.category !== "all") result = arrForCategory.filter(el => el.category.includes(filterParams.category ));
      return result;
    }
    const filterBySearch = (arrForSearch) => {
      let result = arrForSearch;
      if (filterParams.search !== "") result = arrForSearch.filter(el => el.title.toLowerCase().indexOf(filterParams.search) !== -1);
      return result;
    }

    const filterByCategoryRes = filterByCategory(arr);
    const filterAllRes = filterBySearch(filterByCategoryRes);
    return filterAllRes;
  }
  const needProducts = filterAllProducts(allProducts);

  const productsCards = createItems(needProducts);
  const searchResults = needProducts.length > 0 ? `Найдено товаров по вашему запросу: ${needProducts.length} `: "По вашему запросу ничего не найдено";

  if (loading) return <Spinner />

  if (errorProducts) return <ErrorIndicator errorText = {errorProducts}/>

  return (
    <div>
    <Navigation />
    <div className={styles.mainPageContainer}>
    <p className={styles.searchResults}>{searchResults}</p>
      <FormControl variant="outlined" className={styles.sorting}>
        <InputLabel>Сортировка</InputLabel>
        <Select
          label="Сортировка"
          value={sortParam}
          onChange={handleChangeSortValue}
        >
          <MenuItem value={'data_down'}>По дате добавления (сначала новые)</MenuItem>
          <MenuItem value={'data_up'}>По дате добавления (сначала старые)</MenuItem>
          <MenuItem value={'alphabet'}>По алфавиту</MenuItem>
          <MenuItem value={'price_down'}>По цене (сначала дорогие)</MenuItem>
          <MenuItem value={'price_up'}>По цене (сначала дешевые)</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {productsCards}
      </Grid>

    </div>
    </div>
  )
}

export default ProductsPageForUsers;