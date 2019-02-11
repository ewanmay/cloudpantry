import { TOGGLE_MENU, GROUP_NAME_FIELD_CHANGE } from './types';
import { Dispatch } from 'redux';

export const loading = (dispatch: Dispatch) => {
  dispatch({ type: TOGGLE_MENU, payload: false });
  dispatch({ type: GROUP_NAME_FIELD_CHANGE, payload: '' });
};