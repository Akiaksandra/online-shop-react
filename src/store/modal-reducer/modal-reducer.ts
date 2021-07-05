import { IModal } from '../../types/store-types';
import { ModalActionTypes, ModalTypesNames } from '../../types/action-types';

const defaultState: IModal = {
  isOpenModal: false,
  aim: null,
};

const modalReducer = (state = defaultState, action: ModalActionTypes ): IModal => {
  switch(action.type) {
    case ModalTypesNames.OPEN_MODAL:
      return {...state, isOpenModal: true, aim: action.payload};
    case ModalTypesNames.CLOSE_MODAL: 
      return {...state, isOpenModal: false, aim: null };
    default: return state;  
  }
}
export default modalReducer;