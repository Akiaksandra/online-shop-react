import React from 'react';
import './shopping-cart.scss';
import './shopping-cart.scss';
import { Checkbox } from '@material-ui/core';
import useStyles from './use-styles';
import { IProduct } from '../../../types/store-types';
import ButtonComponent from '../../button';

type PropsType = {
  array: IProduct[], 
  handleClick: (event: React.MouseEvent<HTMLElement>, id: string) => void, 
  selected: Array<string>, 
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void, 
  handleDelete: () => void,
}

const CreateCartList: React.FC<PropsType> = (props) => {
  const classes = useStyles();
  
  const { array, handleClick, selected, handleSelectAllClick, handleDelete } = props;

  const newArray = array.map(({_id, title, price, count, category, img}) => {
    const isSelected = (id: string) => {
      return selected.indexOf(id) !== -1;
    } 
    const isItemSelected = isSelected(_id ? _id : "");
    const commonPrice = +price * (count ? +count : 0);

    return (

      <li className="cart-item" key={_id} onClick={(event) => handleClick(event, _id ? _id : "")}>
        <Checkbox
          color="primary"
          checked={isItemSelected}
        />
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
      {
        newArray.length > 0 ? 
        <React.Fragment >
          <ul className="cart-list">
            {newArray}
          </ul>
          <div className="cart-actions">
          <Checkbox
            color="primary"
            checked={array.length > 0 && selected.length === array.length}
            onChange={handleSelectAllClick}
          />
          <span>Выбрать все</span>
          <ButtonComponent className={classes.buttonWhite} variant="outlined" onClick={handleDelete} text="Удалить" disabled={ !(selected.length > 0)}/>  
          </div>
        </React.Fragment>
        : <h3 className="empty-cart">В корзине сейчас пусто...</h3>
      }
    </div>
    
  );
}

export default CreateCartList;
