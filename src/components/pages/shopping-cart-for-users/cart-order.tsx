import React from 'react';
import useStyles from './use-styles';
import { useDispatch } from 'react-redux';
import { clearCurrentOrderAction, updateOrder } from '../../../store/users-reducer/users-actions';
import { useAppSelector } from '../../../types/hooks';
import Spinner from '../../spinner';
import ButtonComponent from '../../button';

const CartOrder: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentOrder, currentUser } = useAppSelector(state => state.users);

  if(currentOrder === null) return <Spinner />
  const { orderDileviryInfo: { deliveryType, town, street, house, flat, floor, phone, initials, comment }, orderPrice, _id } = currentOrder;

  const handleReturnToCart = (): void => {
    dispatch(clearCurrentOrderAction());
  }

  const handlePay = (): void => {
    const newData = { orderStatus: "in transit"};
    dispatch(updateOrder(JSON.stringify(newData), currentOrder._id, currentUser ? currentUser._id : ""))
    dispatch(clearCurrentOrderAction());
  }

  let deliveryTypeLabel = null;
  switch (deliveryType) {
    case ('post'):
      deliveryTypeLabel = "почтой";
      break;
    case ('courier'):
      deliveryTypeLabel = "Курьером";
      break; 
    default: return null;   
  }
  return (
    <div className="cart-sidebar">
      <div className="cart-sidebar-header">
        <span className="cart-sidebar-count"><strong>Заказ</strong> {_id}</span>
        <span className="cart-sidebar-price"><strong>{orderPrice}р</strong></span>
      </div>
      <div className="cart-sidebar-content">
        <span className="cart-sidebar-details"><strong>Способ доставки</strong> {deliveryTypeLabel}</span>
        <span className="cart-sidebar-details"><strong>По адресу</strong><br/> {town} {street} д.{house} {flat? `кв.${flat}` : null} {floor? `этаж ${floor}` : null}</span>
        <span className="cart-sidebar-details"><strong>Получатель</strong><br/> {initials} </span>
        <span className="cart-sidebar-details"><strong>Телефон</strong> {phone}</span>
        {comment ? <span className="cart-sidebar-details"><strong>Комментарии</strong> {comment}</span> : null}
      </div>
        <ButtonComponent className={classes.button} onClick={handlePay} text="Оплатить"/>
        <ButtonComponent className={classes.button} variant="outlined" style={{backgroundColor: "#fff"}} onClick={handleReturnToCart} text="Вернуться в корзину"/>
    </div> 
  )
}

export default CartOrder;