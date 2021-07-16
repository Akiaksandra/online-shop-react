import React from 'react';
import styles from './styles.module.scss';
import './header.scss'
import { TextField,  InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Filters from '../filters-for-user';
import { Link } from 'react-router-dom';
import { openModal } from '../../store/modal-reducer/modal-actions';
import { useDispatch } from 'react-redux';
import { filterProductsAction } from '../../store/product-reducer/product-actions';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../types/hooks';
import { ModalThunkType } from '../../types/thunk-types';
import ButtonComponent from '../button';


const Header: React.FC = () => {

  const location = useLocation();

  const dispatch = useDispatch();

  const { filterParams  } = useAppSelector(state => state.products);
  const { search } = useAppSelector(state => state.products.filterParams);
  const { isLogin, currentUser} = useAppSelector(state => state.users)

  const isAdmin = currentUser ? currentUser.isAdmin === "true" : false;

  const handleChangeSearchValue = (event: React.FocusEvent<HTMLInputElement>): void => {
    const newSearch = event.target.value.toLowerCase();
    if (search === newSearch) return;
    const newFilterParams = {...filterParams, search: newSearch}
    dispatch(filterProductsAction(newFilterParams));
  }

  const setClassName = (value: string): string | undefined => {
    return location.pathname === value ? "active-button" : undefined;
  }
  const openLogin = (): ModalThunkType => dispatch(openModal("login"))
  const openLogout = (): ModalThunkType => dispatch(openModal("logout"))

  const currentButton = !isLogin ? 
        <ButtonComponent onClick={openLogin} text="Войти" forKey="Войти"/> :
        <ButtonComponent  onClick={openLogout} text="Выйти" forKey="Выйти"/> 

  const needCart = (!isAdmin && isLogin) ?         
                      <Link to="/cart"> 
                        <ButtonComponent className={setClassName('/cart')} text="Корзина" forKey="Корзина"/>
                      </Link> : null
  const needHistoryOrder = (isLogin || isAdmin) ? 
                    <Link to="/orders-history"> 
                      <ButtonComponent className={setClassName('/orders-history')} text="Заказы" forKey="Заказы"/>
                  </Link> : null;
  const needFilters = (!isAdmin && location.pathname === "/products" ) ? <Filters /> : null;
  return (
    
    <div className={styles.header}>
      <div className={styles.headerConstant}>
        <TextField 
                  placeholder="Поиск по товарам. Например, фильтр для аквариума" 
                  className={styles.headerInput} 
                  variant="outlined"
                  onBlur = {handleChangeSearchValue}

                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}/>        
        {currentButton}
      </div>
      
      <div className={styles.headerTabs}>
        <Link to="/products"> 
          <ButtonComponent className={setClassName('/products')} text="Товары" forKey="Товары" />
        </Link>
        {needHistoryOrder}
        {needCart}
      </div>
      {needFilters}
    </div>
  )
};

export default Header;

