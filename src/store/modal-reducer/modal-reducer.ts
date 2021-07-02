import { OPEN_MODAL, CLOSE_MODAL } from './modal-consts';
import { IModal } from '../../types/store-types';
import { ModalActionTypes } from '../../types/action-types';

const defaultState: IModal = {
  isOpenModal: false,
  aim: null,
};

const modalReducer = (state = defaultState, action: ModalActionTypes ): IModal => {
  switch(action.type) {
    case OPEN_MODAL:
      return {...state, isOpenModal: true, aim: action.payload};
    case CLOSE_MODAL: 
      return {...state, isOpenModal: false, aim: null };
    default: return state;  
  }
}
export default modalReducer;