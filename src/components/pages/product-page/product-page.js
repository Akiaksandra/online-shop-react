import React, { useEffect } from 'react';
import './product-page.scss';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch} from 'react-redux';
import { fetchProduct, deleteCurrentProduct, clearProductsErrorAction } from '../../../store/product-reducer/product-actions';
import { updateUserCart } from '../../../store/users-reducer/users-actions';
import { openModal } from '../../../store/modal-reducer/modal-actions';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';

const ProductPage = ({match}) => {

  const { id } = match.params;
  
  const dispatch = useDispatch();

  const { currentProduct, loading, errorProducts } = useSelector(state => state.products);
  const { isLogin, userCart } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchProduct(id));
    return (() => {
      dispatch(deleteCurrentProduct()); 
      dispatch(clearProductsErrorAction())
    })
  }, []);  

  
  const handleAddToCart = (event) => {
    const newItem = {...currentProduct};
    const hasData = userCart.products.length > 0 ? userCart.products.reduce((acc, el) => el._id === newItem._id ? acc = el.count + 1 : acc, 1) : 1;
    newItem.count = hasData;
    let newProducts = null;
    hasData === 1 ? newProducts = [...userCart.products, newItem] : newProducts = userCart.products.map(el => el._id === newItem._id ? newItem : el);
    const newData = {products: newProducts};
    console.log('newData: ', newData);
    dispatch(updateUserCart(JSON.stringify(newData), userCart._id));
  }

  const openLogin = () => dispatch(openModal("login"))

  const currentOnClick = isLogin ? handleAddToCart : openLogin;

  if (loading) return <Spinner />

  if (errorProducts) return <ErrorIndicator errorText = {errorProducts}/>

  return (
    <div className="itemPageContainer">
      <div className="item">
        <div className="content">
          <img src={currentProduct && currentProduct.img} alt="img" className="image"/>
          <div className="info">
            <div className="header">
              <span className="title">{currentProduct && currentProduct.title}</span>
              <span className="availability">{currentProduct && currentProduct.quantity > 0 ? "В наличии" : "Нет в наличии"}</span>
            </div>
            <div className="paramsAndPrice">
              <div className="params">
                <p className="paramItem">Категории <span>{currentProduct && currentProduct.category.join()}</span></p>
                <p className="paramItem">Артикул <span>....</span></p>
                <p className="paramItem">Параметры <span>...</span></p>
              </div>
              <div className="price">
                <span>{currentProduct && currentProduct.price}р</span>
                <Button variant="contained" color="primary"onClick={currentOnClick}>
                  В корзину
                </Button>
              </div>
            </div>
            <div className="manufactureAndCountry">
              <p className="paramItem">Страна производителя <span>Китай</span></p>
              <p className="paramItem">Производитель <span>{currentProduct && currentProduct.manufacturer}</span></p>
            </div>
          </div>  
          <div className="description">
            <p className="title">Полное описание</p>
            <p>{currentProduct && currentProduct.description}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage;