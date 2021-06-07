import { OPEN_MODAL, CLOSE_MODAL } from './modal-consts';

const defaultState = {
  isOpenModal: false,
  aim: null,
};

const modalReducer = (state = defaultState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return {...state, isOpenModal: true, aim: action.payload};
    case CLOSE_MODAL: 
      return {...state, isOpenModal: false, aim: null };
    default: return state;  
  }
}
export default modalReducer;