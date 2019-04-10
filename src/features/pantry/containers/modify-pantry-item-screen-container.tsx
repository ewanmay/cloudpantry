import { connect } from "react-redux";
import ModifyItemScreen from '../components/modify-pantry-item-screen'
import { pantryActions } from "../../../ducks/pantry";
import { PantryItem, PantryGroup } from '../../../ducks/pantry/interfaces';

const mapStateToProps = ({ pantry }: any) => {
  const { 
    error, 
    itemForm, 
    currentGroup,
    itemToEditId
  } = pantry
  return {
    error,
    itemForm,
    currentGroup,
    itemToEditId
  };
};

const mapDispatchToProps = (dispatch: any) => {
  const {
    pantryItemFormNameChanged,
    pantryItemFormQuantityChanged,
    pantryItemFormDateChanged,
    pantryItemFormPriceChanged,
    pantryItemFormValidateFailed,
    pantryItemFormValidateReset,
    modifyPantryItem
  } = pantryActions
  return {
    formNameChanged: (name: string) => {
      dispatch(pantryItemFormNameChanged(name));
    },
    formQuantityChanged: (name: string) => {
      dispatch(pantryItemFormQuantityChanged(name));
    },
    formDateChanged: (name: string) => {
      dispatch(pantryItemFormDateChanged(name));
    },
    formPriceChanged: (price: string) => {
      dispatch(pantryItemFormPriceChanged(price))
    },
    formValidateFailed: (error: string) => {
      dispatch(pantryItemFormValidateFailed(error))
    },
    formValidateReset: () => {
      dispatch(pantryItemFormValidateReset())
    },
    modifyPantryItem: (
      pantryItem: PantryItem,
      pantryGroup: PantryGroup
    ) => {
      dispatch(modifyPantryItem(pantryItem, pantryGroup));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyItemScreen);