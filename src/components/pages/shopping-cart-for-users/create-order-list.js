import React from 'react';
import './shopping-cart.scss';
import { useSelector } from 'react-redux';

const CreateOrderList = () => {
  
  const { currentOrder } = useSelector(state => state.users);

  const newArray = currentOrder.orderProducts.map(({_id, title, price, count, img, category}) => {
    const commonPrice = +price * +count;

    return (
      <li className="cart-item" key={_id}>
        <img src={img} alt="img" className="cart-item-image"/>
        <div className="cart-item-info">
          <span className="cart-item-title">{title}</span>
          <span className="cart-item-category">{category.join(", ")}</span>
        </div>
        <input type="number" className="cart-item-count" min="1" value={count} disabled/>
        <span className="cart-item-price">{commonPrice}р</span>
        </li>
    )
  }
  )
  return  (
    <div className="cart-content">
      <ul className="cart-list">
        {newArray}
      </ul>
    </div>
    
  );
}

export default CreateOrderList;