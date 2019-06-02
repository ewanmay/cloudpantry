import {
  START_TRANSMIT,
  STOP_TRANSMIT,
  TRANSMIT_FAILED
} from "./types";
import { AnyAction } from "redux";
import reduceReducers from "reduce-reducers";

const initialOcrState = {
  transmitting: false,
  error: ''
};

const ocrReducer = (state = initialOcrState, action: AnyAction) => {
  switch (action.type) {
    case START_TRANSMIT: 
      return { ...state, transmitting: true, error:'' }
    case STOP_TRANSMIT: 
      return { ...state, transmitting: false, error:''}
    case TRANSMIT_FAILED: 
      return {...state, error: action.payload}
    default:
      return state;
  }
};


export default reduceReducers(ocrReducer);
