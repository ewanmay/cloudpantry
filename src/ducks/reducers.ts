import { combineReducers } from 'redux';
import {authReducer} from './auth';
import pantryReducer from './pantry';

export default combineReducers({
    auth: authReducer,
    pantry: pantryReducer
});