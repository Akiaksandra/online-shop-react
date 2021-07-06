import { IOpenModalAction, ICloseModalAction, ModalTypesNames } from '../../types/action-types';
import { ModalThunkType } from '../../types/thunk-types';

export const openModalAction = (payload: string):IOpenModalAction => {
  return ({ type: ModalTypesNames.OPEN_MODAL, payload })
};

export const closeModalAction = (payload: string = ""):ICloseModalAction => ({ type: ModalTypesNames.CLOSE_MODAL, payload});

export const openModal = (aim: string): ModalThunkType => {
  return async (dispatch) => {
    dispatch(openModalAction(aim))
    };
}  
