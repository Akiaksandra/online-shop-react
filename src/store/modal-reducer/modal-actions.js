import { OPEN_MODAL, CLOSE_MODAL } from './modal-consts';

export const openModalAction = (payload) => {
  return ({ type: OPEN_MODAL, payload })
};

export const closeModalAction = (payload) => ({ type: CLOSE_MODAL, payload });

export const openModal = (aim ) => {
  return async dispatch => {
    dispatch(openModalAction(aim))
    };
}  
