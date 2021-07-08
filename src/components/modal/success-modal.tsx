import React from 'react';
import useStyles from './use-styles';
import { closeModalAction } from '../../store/modal-reducer/modal-actions';
import { useDispatch } from 'react-redux';
import { fetchUserCart, fetchUserOrdersHistory } from '../../store/users-reducer/users-actions';
import { clearFilters } from '../../store/product-reducer/product-actions';
import { useAppSelector } from '../../types/hooks';
import ButtonComponent from '../button';

const SuccessModal: React.FC<{ text: string, needCartRequest?: boolean, needClearFilters?: boolean }> = ({ text, needCartRequest = false, needClearFilters = false }) => {

  const dispatch = useDispatch();
  const classes = useStyles();

  const { currentUser } = useAppSelector(state => state.users);

  const handleCloseModal = () => {
    dispatch(closeModalAction());
    needCartRequest && dispatch(fetchUserCart(currentUser ? currentUser._id : "")); // ts
    needCartRequest && dispatch(fetchUserOrdersHistory(currentUser ? currentUser._id : ""));
    needClearFilters && dispatch(clearFilters());
  } 

  return (
    <div className={classes.paper}>
    <h2 className ="transition-modal-title">{text}</h2>
    <div className ="transition-modal-content">
      <ButtonComponent className={classes.button} onClick={handleCloseModal} text="Окей" />
    </div>
  </div>
  )
}

export default SuccessModal;