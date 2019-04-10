import { combineReducers } from 'redux';
import pantryReducer from './pantry';
import nfcReducer from './nfc'
export default combineReducers({
    pantry: pantryReducer,
    nfc: nfcReducer
});