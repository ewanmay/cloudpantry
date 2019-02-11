import { AnyAction } from "redux";
import reduceReducers from "reduce-reducers";
import {
  FETCH_PANTRY,
  CREATE_PANTRY_ITEM_SUCCESS,
  CREATE_PANTRY_ITEM_FAILURE,
  MODIFY_PANTRY_ITEM,
  BATCH_CREATE_PANTRY_ITEMS,
  CREATE_PANTRY_GROUP_SUCCESS,
  CREATE_PANTRY_GROUP_FAILURE,
  DELETE_PANTRY_ITEM_SUCCESS,
  CHANGE_PANTRY_GROUP,
  DELETE_PANTRY_ITEM_FAILURE,
  CHANGE_PANTRY_GROUP_FAILURE,
  GROUP_NAME_FIELD_CHANGE,
  TOGGLE_MENU,
  PANTRY_ITEM_NAME_CHANGE,
  PANTRY_ITEM_QUANTITY_CHANGE,
  PANTRY_ITEM_EXPIRATION_DATE_CHANGE,
  PANTRY_ITEM_FORM_VALIDATE_FAILURE,
  PANTRY_ITEM_FORM_VALIDATE_RESET,
  PANTRY_ITEM_FORM_RESET,
  PANTRY_ITEM_PRICE_CHANGE,

} from "./types";
import { initialPantryStateInterface } from "./interfaces";

export const initialPantryState: initialPantryStateInterface = {
  groups: [],
  groupNameField: "",
  error: "",
  currentGroup: null,
  menuOpen: false,
  itemForm: {
    name: '',
    quantity: '',
    price: '',
    expirationDate: ''
  }
};

const pantryItemsReducer = (state = initialPantryState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_PANTRY:
      return action.payload || false;
    case BATCH_CREATE_PANTRY_ITEMS:
      return { ...state, currentGroup: action.payload };
    case MODIFY_PANTRY_ITEM:
      return { ...state, currentGroup: action.payload };
    case CREATE_PANTRY_ITEM_SUCCESS:
      return { ...state, currentGroup: action.payload };
    case CREATE_PANTRY_ITEM_FAILURE:
      return { ...state, error: action.payload };
    case DELETE_PANTRY_ITEM_SUCCESS:
      return { ...state, currentGroup: action.payload };
    case DELETE_PANTRY_ITEM_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const pantryGroupsReducer = (state = initialPantryState, action: AnyAction) => {
  switch (action.type) {
    case CREATE_PANTRY_GROUP_SUCCESS:
      const { groups, currentGroup } = action.payload;
      return { ...state, groups: groups, currentGroup: currentGroup };
    case CREATE_PANTRY_GROUP_FAILURE:
      return { ...state, error: action.payload };
    case CHANGE_PANTRY_GROUP:
      return { ...state, currentGroup: action.payload };
    case CHANGE_PANTRY_GROUP_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const formReducer = (state = initialPantryState, action: AnyAction) => {
  switch (action.type) {
    case GROUP_NAME_FIELD_CHANGE:
      return { ...state, groupNameField: action.payload };
    case PANTRY_ITEM_NAME_CHANGE:
      return { ...state, itemForm: { ...state.itemForm, name: action.payload }};
    case PANTRY_ITEM_QUANTITY_CHANGE:
      return { ...state, itemForm: { ...state.itemForm, quantity: action.payload }};
    case PANTRY_ITEM_EXPIRATION_DATE_CHANGE:
      return { ...state, itemForm: { ...state.itemForm, expirationDate: action.payload }  };
      case PANTRY_ITEM_PRICE_CHANGE:
      return { ...state, itemForm: { ...state.itemForm, price: action.payload } };
    case PANTRY_ITEM_FORM_VALIDATE_FAILURE:
      return { ...state, error: action.payload };
    case  PANTRY_ITEM_FORM_VALIDATE_RESET: 
      return { ...state, error: '' };
    case PANTRY_ITEM_FORM_RESET: 
      return { ...state, itemForm: { 
        name: '',
        quantity: '',
        price: '',
        expirationDate: ''}}
    default:
      return state;
  }
};

const pageReducer = (state = initialPantryState, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, menuOpen: action.payload };
    default:
      return state;
  }
};
export default reduceReducers(
  pantryGroupsReducer,
  formReducer,
  pantryItemsReducer,
  pageReducer
);
