import {
  FETCH_PANTRY,
  CREATE_PANTRY_ITEM_SUCCESS,
  MODIFY_PANTRY_ITEM,
  BATCH_CREATE_PANTRY_ITEMS,
  CREATE_PANTRY_GROUP_SUCCESS,
  CREATE_PANTRY_GROUP_FAILURE,
  CHANGE_PANTRY_GROUP,
  CHANGE_PANTRY_GROUP_FAILURE,
  DELETE_PANTRY_ITEM_SUCCESS,
  DELETE_PANTRY_ITEM_FAILURE,
  GROUP_NAME_FIELD_CHANGE,
  TOGGLE_MENU,
  PANTRY_ITEM_NAME_CHANGE,
  PANTRY_ITEM_QUANTITY_CHANGE,
  PANTRY_ITEM_EXPIRATION_DATE_CHANGE,
  PANTRY_ITEM_PRICE_CHANGE,
  PANTRY_ITEM_FORM_VALIDATE_FAILURE,
  PANTRY_ITEM_FORM_VALIDATE_RESET,
  PANTRY_ITEM_FORM_RESET,
  CREATE_PANTRY_ITEM_FAILURE
} from "./types";
import { navigate } from "../../utils/navigationService";
import { Dispatch } from "redux";
import { PantryGroup,  PantryItem } from "./interfaces";
import { removePantryItem, addPantryGroup, addPantryItem } from "./selectors";
import { loading } from "./operations";
import { Auth, API } from 'aws-amplify'

export const navigateReset = () => async (dispatch: Dispatch) => {
  loading(dispatch);
};

export const createPantryGroup = (
  newGroup: PantryGroup,
  pantryGroups: Array<PantryGroup>
) => async (dispatch: Dispatch) => {
  try {
    const { memberIds, id, name } = newGroup;
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      const returning = { ...newGroup, memberIds: memberIds.push(user.uid) };

      const updatedPantryGroups = addPantryGroup(pantryGroups, returning );
      const init = {
        members: returning.memberIds,
        name: returning.name,
        id: returning.name,
        pantryIds: returning.pantryItems
      }
      console.log(init);
      const res = await API.post("groupAPI", "/pantry", init)
      console.log(res);

      dispatch({
        type: CREATE_PANTRY_GROUP_SUCCESS,
        payload: { groups: updatedPantryGroups, currentGroup: returning }
      });
      navigate("PantryHome", {});
    }
  } catch (error) {
    dispatch({ type: CREATE_PANTRY_GROUP_FAILURE, payload: error });
    console.log("Pantry group creation failed");
  }
};

export const changePantryGroup = (
  pantryGroups: Array<PantryGroup>,
  name: string
) => async (dispatch: Dispatch) => {
  try {
    const newGroup = pantryGroups.find(
      pantryGroup => pantryGroup.name === name
    );
    dispatch({ type: CHANGE_PANTRY_GROUP, payload: newGroup });
  } catch (error) {
    dispatch({ type: CHANGE_PANTRY_GROUP_FAILURE, payload: error });
  }
};

export const modifyPantryItem = (
  pantryItem: PantryItem,
  pantryGroup: PantryGroup
) => async (dispatch: Dispatch) => { };

export const deletePantryItem = (
  pantryItem: PantryItem,
  pantryGroup: PantryGroup
) => async (dispatch: Dispatch) => {
  try {
    const user = await Auth.currentAuthenticatedUser();

  } catch (error) {
    dispatch({ type: DELETE_PANTRY_ITEM_FAILURE, payload: error });
  }
};

export const pantryItemFormValidateFailed = (error: string) => (
  dispatch: Dispatch
) => {
  dispatch({ type: PANTRY_ITEM_FORM_VALIDATE_FAILURE, payload: error })
};

export const pantryItemFormValidateReset = () => (
  dispatch: Dispatch
) => {
  dispatch({ type: PANTRY_ITEM_FORM_VALIDATE_RESET })
}

export const createPantryItem = (
  pantryItem: PantryItem,
  pantryGroup: PantryGroup
) => async (dispatch: Dispatch) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { id: pantryItemId } = pantryItem;
    if (user) {
      console.log(pantryItem, pantryGroup)
      // await firebase
      //   .database()
      //   .ref(`groups/${pantryGroup.id}/${pantryItemId}`)
      //   .set(pantryItem);
      const updatedPantryGroup = addPantryItem(pantryGroup, pantryItem);
      console.log(updatedPantryGroup)
      dispatch({
        type: CREATE_PANTRY_ITEM_SUCCESS,
        payload: updatedPantryGroup
      });
      dispatch({ 
        type: PANTRY_ITEM_QUANTITY_CHANGE
      })
    }
  } catch (error) {
    dispatch({ type: CREATE_PANTRY_ITEM_FAILURE, payload: error });
  }
};

export const groupNameChanged = (text: string) => (dispatch: Dispatch) => {
  dispatch({
    type: GROUP_NAME_FIELD_CHANGE,
    payload: text
  });
};
// export const createPantryItem = (pantryItem: PantryItem) => async (dispatch: Dispatch) => {
//     dispatch({ type: CREATE_PANTRY_ITEM, payload: pantryItem });
//     navigateTo({ routeName: 'Home' })
// }

export const toggleMenu = (turnOn: boolean) => (dispatch: Dispatch) => {
  console.log("Toggled");
  dispatch({
    type: TOGGLE_MENU,
    payload: turnOn
  });
};

export const pantryItemFormNameChanged = (name: string) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: PANTRY_ITEM_NAME_CHANGE,
    payload: name
  });
};

export const pantryItemFormQuantityChanged = (quantity: string) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: PANTRY_ITEM_QUANTITY_CHANGE,
    payload: quantity
  });
};

export const pantryItemFormDateChanged = (date: string) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: PANTRY_ITEM_EXPIRATION_DATE_CHANGE,
    payload: date
  });
};

export const pantryItemFormPriceChanged = (price: string) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: PANTRY_ITEM_PRICE_CHANGE,
    payload: price
  });
};

export default {
  groupNameChanged,
  createPantryGroup,
  changePantryGroup,
  deletePantryItem,
  createPantryItem,
  modifyPantryItem,
  navigateReset,
  toggleMenu,
  pantryItemFormNameChanged,
  pantryItemFormQuantityChanged,
  pantryItemFormDateChanged,
  pantryItemFormPriceChanged,
  pantryItemFormValidateFailed,
  pantryItemFormValidateReset
};
