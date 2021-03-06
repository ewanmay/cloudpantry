import { API, Auth } from 'aws-amplify';
import { Dispatch } from "redux";
import { navigate } from "../../utils/navigationService";
import { PantryGroup, PantryItem } from "./interfaces";
import { loading } from "./operations";
import { addPantryGroup, addPantryItem } from "./selectors";
import {
  CHANGE_PANTRY_GROUP,
  CHANGE_PANTRY_GROUP_FAILURE,
  CREATE_PANTRY_GROUP_FAILURE,
  CREATE_PANTRY_GROUP_SUCCESS,
  CREATE_PANTRY_ITEM_FAILURE,
  CREATE_PANTRY_ITEM_SUCCESS,
  DELETE_PANTRY_ITEM_FAILURE,
  DELETE_PANTRY_ITEM_SUCCESS,
  GROUP_NAME_FIELD_CHANGE,
  LOADING_PANTRY,
  MODIFY_PANTRY_ITEM_FAILURE,
  MODIFY_PANTRY_ITEM_SUCCESS,
  NO_PANTRY_GROUPS,
  PANTRY_ITEM_EXPIRATION_DATE_CHANGE,
  PANTRY_ITEM_FORM_RESET,
  PANTRY_ITEM_FORM_VALIDATE_FAILURE,
  PANTRY_ITEM_FORM_VALIDATE_RESET,
  PANTRY_ITEM_NAME_CHANGE,
  PANTRY_ITEM_PRICE_CHANGE,
  PANTRY_ITEM_QUANTITY_CHANGE,
  RETRIEVED_PANTRY_GROUP,
  SELECT_PANTRY_ITEM,
  SET_FORM_VALUES_FOR_EDIT,
  TOGGLE_MENU
} from "./types";

export const navigateReset = () => async (dispatch: Dispatch) => {
  loading(dispatch);
};

export const createPantryGroup = (
  newGroup: PantryGroup,
  pantryGroups: Array<PantryGroup>
) => async (dispatch: Dispatch) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
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

      if (!userResponse.id) {
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
        const data = {
          body: updatedUser
        }
        const createUserResponse = await API.put("user", "/user", data);
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
  modifiedItem: PantryItem,
  pantryGroup: PantryGroup
) => async (dispatch: Dispatch) => {

  try {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      const modifiedItems = pantryGroup.pantryItems.map(item => {
        if (item.id === modifiedItem.id) {
          return modifiedItem;
        }
        else {
          return item;
        }
      });
      const modifiedGroup = {
        ...pantryGroup, pantryItems: modifiedItems
      }
      const init = {
        body: {
          name: modifiedGroup.name,
          id: modifiedGroup.id,
          pantryIds: modifiedGroup.pantryItems,
          dateCreated: modifiedGroup.dateCreated
        },
        headers: {}
      }
      const res = await API.post("user", "/pantry", init);
      dispatch({
        type: MODIFY_PANTRY_ITEM_SUCCESS,
        payload: modifiedGroup
      });
      dispatch({ type: PANTRY_ITEM_FORM_RESET })
      navigate("PantryHome", {});
    }
  } catch (error) {
    dispatch({ type: MODIFY_PANTRY_ITEM_FAILURE, payload: error });
    console.log("Pantry item modification failed", error);
  }
};


export const deletePantryItem = (
  itemToDelete: PantryItem,
  pantryGroup: PantryGroup
) => async (dispatch: Dispatch) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      const modifiedItems = pantryGroup.pantryItems.filter(({ id }) => itemToDelete.id !== id);
      const modifiedGroup = {
        ...pantryGroup, pantryItems: modifiedItems || []
      }
      const init = {
        body: {
          name: modifiedGroup.name,
          id: modifiedGroup.id,
          pantryIds: modifiedGroup.pantryItems,
          dateCreated: modifiedGroup.dateCreated
        },
        headers: {}
      }
      const res = await API.post("user", "/pantry", init);
      dispatch({
        type: DELETE_PANTRY_ITEM_SUCCESS,
        payload: modifiedGroup
      });
      return
    }
  } catch (error) {
    dispatch({ type: DELETE_PANTRY_ITEM_FAILURE, payload: error });
    console.log("Pantry item modification failed", error);
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

export const setFormValuesForEdit = (pantryItem: PantryItem) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_FORM_VALUES_FOR_EDIT,
    payload: pantryItem
  })
}

export const retrievePantry = () => async (dispatch: Dispatch) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    dispatch({ type: LOADING_PANTRY });
    if (user) {
      const myInit = { // OPTIONAL       
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        queryStringParameters: {
          id: user.attributes.sub,
          name: user.username
        }
      }

      console.log("Sending request");

      const response = await API.get("user", `/user?id=${user.attributes.sub},name=${user.username}`, myInit);
      if (response.id) {
        const newInit = { // OPTIONAL       
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
      else {
        console.log("What the fuck is going on")
        dispatch({ type: NO_PANTRY_GROUPS })
      }
    }
  } catch (error) {
    dispatch({ type: CREATE_PANTRY_ITEM_FAILURE, payload: error });
    console.log(error);
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

export const selectPantryItem = (item: number) => (dispatch: Dispatch) => {
  dispatch({
    type: SELECT_PANTRY_ITEM,
    payload: item
  })

}

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
