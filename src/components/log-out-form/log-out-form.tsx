import React from 'react';
import useStyles from '../modal/use-styles';
import { useDispatch } from 'react-redux';
import { closeModalAction } from '../../store/modal-reducer/modal-actions';
import { logOutAction } from '../../store/users-reducer/users-actions'
import ButtonComponent from '../button';

const LogOutForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCloseModal = (): void => {
    dispatch(closeModalAction());
  } 
  const handleLogOut = (): void => {
    dispatch(logOutAction());
    dispatch(closeModalAction());
  }

  return (
    <div className={classes.paper}>
    <h2 className ="transition-modal-title">Вы уверены, что хотите выйти из аккаунта?</h2>
    <div className ="transition-modal-content">
      <ButtonComponent className={classes.button} onClick={handleCloseModal} text="Остаться" />
      <ButtonComponent color="secondary" className={classes.button} onClick={handleLogOut}text="Уйти" />
    </div>
  </div>
  )
}

export default LogOutForm;