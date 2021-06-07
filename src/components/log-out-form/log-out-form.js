import React from 'react';
import useStyles from '../modal/use-styles';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { closeModalAction } from '../../store/modal-reducer/modal-actions';
import { logOutAction } from '../../store/users-reducer/users-actions'

const LogOutForm = (() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModalAction());
  } 
  const handleLogOut = () => {
    dispatch(logOutAction());
    dispatch(closeModalAction());
  }

  return (
    <div className={classes.paper}>
    <h2 className ="transition-modal-title">Вы уверены, что хотите выйти из аккаунта?</h2>
    <div className ="transition-modal-content">
      <Button variant="contained" color="primary" className={classes.button} onClick={handleCloseModal}>
        Остаться
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={handleLogOut}>
        Уйти
      </Button>
    </div>
  </div>
  )
})

export default LogOutForm;