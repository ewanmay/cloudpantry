import {
  START_TRANSMIT,
  STOP_TRANSMIT,
  TRANSMIT_FAILED
} from "./types";
import { AnyAction } from "redux";
import reduceReducers from "reduce-reducers";

const initialNfcState = {
  transmitting: false,
  error: ''
};

const nfcReducer = (state = initialNfcState, action: AnyAction) => {
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


export default reduceReducers(nfcReducer);
