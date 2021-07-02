import { OPEN_MODAL, CLOSE_MODAL } from './modal-consts';
import { IOpenModalAction, ICloseModalAction, ModalActionTypes } from '../../types/action-types';
import { Dispatch } from 'redux';

export const openModalAction = (payload: string):IOpenModalAction => {
  return ({ type: OPEN_MODAL, payload })
};

export const closeModalAction = (payload: string = ""):ICloseModalAction => ({ type: CLOSE_MODAL, payload});

export const openModal = (aim: string) => {
  return async (dispatch: Dispatch<ModalActionTypes>) => {
    dispatch(openModalAction(aim))
    };
}  
