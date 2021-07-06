import React from 'react';
import useStyles from './use-styles';
import { Modal, Backdrop, DialogContent } from '@material-ui/core';
import LogInForm from '../log-in-form';
import { useDispatch} from 'react-redux';
import { closeModalAction } from '../../store/modal-reducer/modal-actions';
import LogOutForm from '../log-out-form';
import NewProductForm from '../new-product-form';
import DeleteProductFunc from '../delete-product';
import { useAppSelector } from '../../types/hooks';
import { deleteCurrentProduct } from '../../store/product-reducer/product-actions';

const TransitionsModal: React.FC = () => {

  const classes = useStyles();

  const { isOpenModal, aim } = useAppSelector(state => state.modal)
  

  const dispatch = useDispatch();
  
  const handleClose = (): void => {
    dispatch(closeModalAction())
    if (aim === "editProduct") dispatch(deleteCurrentProduct())
  }

  const findCurrentComponent = (): JSX.Element | null => {
    switch (aim) {
      case ("newProduct"): 
      case ("editProduct"):
        return <NewProductForm />
      case ("login"):
        return (<LogInForm />)
      case ("logout"):
        return (<LogOutForm />)  
      case ("deleteProduct"):
        return <DeleteProductFunc />;
      default: return null  
    }
  }

  const currentComponent = findCurrentComponent()
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-content"
        className={classes.modal}
        open={isOpenModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogContent className={classes.dialog}>
          {currentComponent}
        </DialogContent>
      </Modal>
    </div>
  );
}

export default TransitionsModal;