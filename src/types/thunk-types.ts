import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { ModalActionTypes, ProductsActionTypes, UserActionTypes } from './action-types';

export type ProductsThunkType = ThunkAction<Promise<void>, RootState, unknown, ProductsActionTypes>;
export type UsersThunkType = ThunkAction<Promise<void>, RootState, unknown, UserActionTypes>;
export type ModalThunkType = ThunkAction<Promise<void>, RootState, unknown, ModalActionTypes>;