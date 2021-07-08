import React from 'react';
import { Button } from '@material-ui/core';
import { closeModalAction } from '../../store/modal-reducer/modal-actions';
import { clearUsersErrorAction } from '../../store/users-reducer/users-actions';
import { clearProductsErrorAction } from '../../store/product-reducer/product-actions';
import { useDispatch } from 'react-redux';
import useStyles from './use-styles';
import { Error } from '../../types/store-types';
import ButtonComponent from '../button';

const ErrorModal: React.FC<{errorText: Error}> = ({errorText}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCloseModal = (): void => {
    dispatch(closeModalAction());
    dispatch(clearUsersErrorAction());
    dispatch(clearProductsErrorAction())
  } 

  return (
    <div className={classes.paper}>
     <h2 className ="transition-modal-title">{errorText}</h2>
     <div className ="transition-modal-content">
     <ButtonComponent className={classes.button} onClick={handleCloseModal} text="Окей" />
      </div>
  </div>
  )
};

export default ErrorModal;