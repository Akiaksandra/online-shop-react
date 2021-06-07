import React from 'react';
import useStyles from '../modal/use-styles';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../store/modal-reducer/modal-actions';
import { deleteProductAction } from '../../store/product-reducer/product-actions';
import { deleteCurrentProduct } from '../../store/product-reducer/product-actions';
import LoadingModal from '../modal/loading-modal';
import SuccessModal from '../modal/success-modal';
import ErrorModal from '../modal/error-modal';

const DeleteProductFunc = (() => {
  
  const { currentProduct, loading, errorProducts } = useSelector(state => state.products)

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModalAction());
  } 

  const handleDeleteItem = async () => {
    await dispatch(deleteProductAction(currentProduct._id));
    dispatch(deleteCurrentProduct())
  }

  if (loading) return <LoadingModal text = {"Происходит удаление товара..."} />

  if (errorProducts) return <ErrorModal errorText = {errorProducts} />

  if (!currentProduct) return <SuccessModal text = {"Товар успешно удален!"}/>

  if (currentProduct) return (
    <div className={classes.paper}>
    <h2 className ="transition-modal-title">Вы уверены, что хотите удалить товар?</h2>
    <div className ="transition-modal-content">
      <Button variant="contained" color="primary" className={classes.button} onClick={handleCloseModal}>
        Отменить
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={handleDeleteItem}>
        Удалить
      </Button>
    </div>
  </div>
  )
})

export default DeleteProductFunc;