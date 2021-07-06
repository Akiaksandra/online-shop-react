import React, { useState, useEffect } from 'react';
import './shopping-cart.scss';
import CartOrder from './cart-order';
import CartForm from './cart-form';
import CreateCartList from './create-cart-list';
import CreateOrderList from './create-order-list';
import { useDispatch } from 'react-redux';
import { updateUserCart, createNewOrder, clearUsersErrorAction, clearCurrentOrderAction, fetchUserOrdersHistory } from '../../../store/users-reducer/users-actions';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';
import { useAppSelector } from '../../../types/hooks';
import { OrderDileviryInfo } from '../../../types/store-types';

const ShoppingCartForUsers: React.FC = () => {

  const { userCart, loading, errorUsers, currentUser, currentOrder } = useAppSelector(state => state.users)
  const [selected, setSelected] = useState<Array<string>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    return () =>  {
      dispatch(clearUsersErrorAction())
      dispatch(clearCurrentOrderAction());
    };
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string): void => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: Array<string> = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected.concat(id));
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      if (userCart === null) return;
      const newSelected = userCart.products?.map((el) => el._id); 
      setSelected(newSelected) ;
      return;
    }
    setSelected([]);
  }; 


  const handleDelete = (): void => {
    if (userCart === null) return; //ts
    const newProducts = userCart.products.filter(el => !selected.includes(el._id));
    const newData = {products: newProducts};
    dispatch(updateUserCart(JSON.stringify(newData), userCart._id));
    setSelected([]);
  }

  const calculateCommonPrice = (): number => {
    if (userCart === null) return 0; //ts
    const selectedItems = selected.map(selectId => userCart.products.find(el => el._id === selectId));
    const selectedItemsPrice = selectedItems.reduce((acc, el) => el ? (acc += +el.price * (el.count ? +el.count : 0)) : acc, 0)
    return selectedItemsPrice;
  }

  const calculateCommonCount = (): number => selected.length;

  const onSubmitForm = async (formData: OrderDileviryInfo) => {
    if (userCart === null || currentUser === null) return; //ts
    const selectedId = [...selected]
    const selectedItems = selectedId.map(selectId => userCart.products.find(el => el._id === selectId));
    const selectedItemsPrice = selectedItems.reduce((acc, el) => el ? (acc += +el.price * (el.count ? +el.count : 0)) : acc, 0);
    const newOrder = {
        forUser: currentUser._id,
        orderProducts: selectedItems,
        orderPrice: selectedItemsPrice,
        orderDileviryInfo: formData,
        orderStatus: 'waiting for payment',
      };
      await dispatch(createNewOrder(JSON.stringify(newOrder)))
      dispatch(fetchUserOrdersHistory(currentUser._id))
      setSelected([]);
      const newProducts = userCart.products.filter(el => !selectedId.includes(el._id))
      const newData = { products: newProducts }
      dispatch(updateUserCart(JSON.stringify(newData), userCart._id));
    }  

  if (loading) return <Spinner />

  if (errorUsers) return <ErrorIndicator errorText = {errorUsers}/>

  const commonPrice = calculateCommonPrice();
  const commonCount = calculateCommonCount();

  const sidebar = currentOrder ? <CartOrder />  
                                  :  <CartForm 
                                      commonCount = {commonCount}
                                      commonPrice = {commonPrice}
                                      onSubmitForm={onSubmitForm}
                                      />
    const content = currentOrder ? <CreateOrderList />
                                  : <CreateCartList 
                                    array={userCart ? userCart.products : []} 
                                    handleClick={handleClick} 
                                    selected={selected} 
                                    handleSelectAllClick={handleSelectAllClick} 
                                    handleDelete={handleDelete}/>
    return (
      <div className="cart-container">
        {content}
        {sidebar}
        </div>
    )
}

export default ShoppingCartForUsers;

