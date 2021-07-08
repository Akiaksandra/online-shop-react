import React from 'react';
import useStyles from '../modal/use-styles';
import { closeModalAction } from '../../store/modal-reducer/modal-actions';
import { deleteProductAction } from '../../store/product-reducer/product-actions';
import { deleteCurrentProduct } from '../../store/product-reducer/product-actions';
import LoadingModal from '../modal/loading-modal';
import SuccessModal from '../modal/success-modal';
import ErrorModal from '../modal/error-modal';
import { useAppSelector } from '../../types/hooks';
import { useDispatch } from 'react-redux';
import ButtonComponent from '../button';

const DeleteProductFunc = () => {
  
  const { currentProduct, loading, errorProducts } = useAppSelector(state => state.products)

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCloseModal = (): void => {
    dispatch(deleteCurrentProduct())
    dispatch(closeModalAction());
  } 

  const handleDeleteItem = async (): Promise<void> => {
    await dispatch(deleteProductAction(currentProduct?._id));
    dispatch(deleteCurrentProduct())
  }

  if (loading) return <LoadingModal text = {"Происходит удаление товара..."} />

  if (errorProducts) return <ErrorModal errorText = {errorProducts} />

  if (!currentProduct) return <SuccessModal text = {"Товар успешно удален!"}/>

  if (currentProduct) return (
    <div className={classes.paper}>
    <h2 className ="transition-modal-title">Вы уверены, что хотите удалить товар?</h2>
    <div className ="transition-modal-content">
      <ButtonComponent className={classes.button} onClick={handleCloseModal} text="Отменить" />
      <ButtonComponent color="secondary" className={classes.button} onClick={handleDeleteItem} text="Удалить" />
    </div>
  </div>
  )
  return null;
}

export default DeleteProductFunc;