import React from 'react';
import { Button } from '@material-ui/core';
import { closeModalAction } from '../../store/modal-reducer/modal-actions';
import { clearUsersErrorAction } from '../../store/users-reducer/users-actions';
import { clearProductsErrorAction } from '../../store/product-reducer/product-actions';
import { useDispatch } from 'react-redux';
import useStyles from './use-styles';

const ErrorModal = ({errorText}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModalAction());
    dispatch(clearUsersErrorAction());
    dispatch(clearProductsErrorAction())
  } 

  return (
    <div className={classes.paper}>
     <h2 className ="transition-modal-title">{errorText}</h2>
     <div className ="transition-modal-content">
      <Button variant="contained" color="primary" className={classes.button} onClick={handleCloseModal}>
         Окей
       </Button>
      </div>
  </div>
  )
};

export default ErrorModal;