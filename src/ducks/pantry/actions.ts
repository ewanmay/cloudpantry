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
  CREATE_PANTRY_ITEM_FAILURE,
  RETRIEVED_PANTRY_GROUP
} from "./types";
import { navigate } from "../../utils/navigationService";
import { Dispatch } from "redux";
import { PantryGroup, PantryItem } from "./interfaces";
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
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    if (user) {
      let myInit = { // OPTIONAL       
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        queryStringParameters: {
          'id': user.attributes.sub,
          'name': user.username
        }
      }
      const userResponse = await API.get("user", `/user?id=${user.attributes.sub},name=${user.username}`, myInit);
      console.log(userResponse);
      if (!userResponse) {
        const data = {
          body: {
            name: user.username,
            id: user.attributes.sub,
            groups: [newGroup.id],
            current_group: newGroup.id,
            date_created: new Date().toISOString()
          },
          headers: {}
        }
        const createUserResponse = await API.post("user", "/user", data);
      }
      else {
        let updatedGroups = userResponse.groups;
        updatedGroups.push(newGroup.id);
        let updatedUser = { ...userResponse, current_group: newGroup.id, groups: updatedGroups }
        console.log(updatedUser);
        const data = {
          body: updatedUser
        }
        const createUserResponse = await API.put("user", "/user", data);
        console.log(createUserResponse)
      }
      const updatedPantryGroups = addPantryGroup(pantryGroups, newGroup);
      const init = {
        body: {
          members: [],
          name: newGroup.name,
          id: newGroup.id,
          pantryIds: newGroup.pantryItems,
          dateCreated: new Date().toISOString()
        },
        headers: {}
      }
      const res = await API.post("user", "/pantry", init);

      dispatch({
        type: CREATE_PANTRY_GROUP_SUCCESS,
        payload: { groups: updatedPantryGroups, currentGroup: newGroup }
      });
      navigate("PantryHome", {});
    }
  } catch (error) {
    dispatch({ type: CREATE_PANTRY_GROUP_FAILURE, payload: error });
    console.log("Pantry group creation failed", error);
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
  pantryGroup: PantryGroup,
) => async (dispatch: Dispatch) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      const updatedPantryGroup = addPantryItem(pantryGroup, pantryItem);
      const { name, id, pantryItems, dateCreated } = updatedPantryGroup

      const init = {
        body: {
          name,
          id,
          pantryIds: pantryItems,
          dateCreated
        },
        headers: {}
      }

      const res = await API.post("user", "/pantry", init)
      console.log(updatedPantryGroup, res)
      dispatch({
        type: CREATE_PANTRY_ITEM_SUCCESS,
        payload: updatedPantryGroup
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_PANTRY_ITEM_FAILURE, payload: error });
  }
};

export const groupNameChanged = (text: string) => (dispatch: Dispatch) => {
  dispatch({
    type: GROUP_NAME_FIELD_CHANGE,
    payload: text
  });
};



export const retrievePantry = () => async (dispatch: Dispatch) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      let myInit = { // OPTIONAL       
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        queryStringParameters: {
          id: user.attributes.sub,
          name: user.username
        }
      }

      let response = await API.get("user", `/user?id=${user.attributes.sub},name=${user.username}`, myInit);
      if (response.id) {
        let newInit = { // OPTIONAL       
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          queryStringParameters: {
            id: response.current_group
          }
        }
        const res = await API.get("user", `/pantry`, newInit);
        const { id, name, pantryIds, dateCreated } = res
        const formattedGroup = {
          id,
          name,
          pantryItems: pantryIds,
          dateCreated
        }
        dispatch({
          type: RETRIEVED_PANTRY_GROUP,
          payload: {
            groups: [formattedGroup],
            currentGroup: formattedGroup
          }
        });
      }
      return
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_PANTRY_ITEM_FAILURE, payload: error });
  }
};

export const toggleMenu = (turnOn: boolean) => (dispatch: Dispatch) => {
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
