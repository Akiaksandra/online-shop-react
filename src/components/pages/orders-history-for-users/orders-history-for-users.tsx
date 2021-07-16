import React, { useEffect } from 'react';
import './orders-history-for-users.scss';
import { useDispatch } from 'react-redux';
import { clearUsersErrorAction } from '../../../store/users-reducer/users-actions';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';
import { updateOrder } from '../../../store/users-reducer/users-actions';
import { useAppSelector } from '../../../types/hooks';
import { OrdersHistory } from '../../../types/store-types';
import { UsersThunkType } from '../../../types/thunk-types';
import ButtonComponent from '../../button';

const OrdersHistoryForUsers: React.FC = () => {

  const dispatch = useDispatch();

  const { ordersHistory, currentUser, loading, errorUsers } = useAppSelector(state => state.users);

  useEffect(() => {
    return () => {dispatch(clearUsersErrorAction())};
  }, [dispatch])

  const createButtonText = (status: string): string | null => {
    switch (status) {
      case ("waiting for payment"):
        return "Оплатить"
      case ("in transit"):
        return "Подтвердить получение"
      case ("delivered"):
        return "Оставить отзыв"        
      default: return null;          
    };
  }

  const createNewStatus = (status: string): string | null => {
    switch (status) {
      case ("waiting for payment"):
        return "in transit"
      case ("in transit"):
        return "delivered"     
      default: return null;          
    };
  }

  const createHandleFunc = (status: string, id: string): UsersThunkType => {
    const newStatus = createNewStatus(status);
    const newData = { orderStatus: newStatus};
    return updateOrder(JSON.stringify(newData), id, currentUser ? currentUser._id: "");
  }

  const createCurrentButton = (status: string, id: string): JSX.Element => {
    const buttonText = createButtonText(status);
    const handleFunc = () => dispatch(createHandleFunc(status, id))
    return (<ButtonComponent onClick={handleFunc} disabled={ status === "delivered" } text={buttonText} />)
  }

  const createItems = (array: OrdersHistory): JSX.Element[] => {
    const newArray = array.map(({_id, orderStatus, orderPrice, orderDileviryInfo, orderProducts}) => {
      return (
        <li className = "history-item" key = {_id}>
          <ul className = "history-item-details">
            <li>Номер заказа <span>{_id}</span></li>
            <li>Статус заказа <span>{orderStatus}</span></li>
            <li>Стоимость заказа <span>{orderPrice}р.</span></li>
            <li>Вид доставки <span>{orderDileviryInfo.deliveryType}</span></li>
            <li className = "history-item-details-button">{createCurrentButton(orderStatus, _id)}</li>
          </ul>
          <ul className = "history-item-products">
            {
              orderProducts.map(({title, count, price, img, _id}) => {
                return (
                  <li key = {_id}>
                    <img src={img} alt="img"/>
                    <p className = "history-item-products-title"><span>{title}</span></p>
                    <p>Количество <span>{count}</span></p>
                    <p>Итоговая стоимость <span>{count ? count : 0 * +price}р.</span></p>
                  </li>
                )
              })
            }
          </ul> 
        </li>
      )
    });

    return newArray;
  }

  const items = ordersHistory && createItems(ordersHistory);

  if (loading) return <Spinner />

  if (errorUsers) return <ErrorIndicator errorText = {errorUsers}/>
  
  return (
    <main className = "history-content">
      <ul className = "history-list">
        {items}
      </ul>
    </main>
  )
}

export default OrdersHistoryForUsers;