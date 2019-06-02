import { combineReducers } from 'redux';
import pantryReducer from './pantry';
import ocrReducer from './ocr';
export default combineReducers({
    pantry: pantryReducer,
    ocr: ocrReducer
});