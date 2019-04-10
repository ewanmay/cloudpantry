import { connect } from "react-redux";
import PantryItemScreen from '../components/create-pantry-item-screen'
import { pantryActions } from "../../../ducks/pantry";
import { PantryItem, PantryGroup } from '../../../ducks/pantry/interfaces';

const mapStateToProps = ({ pantry }: any) => {
  const { 
    error, 
    itemForm, 
    currentGroup
  } = pantry
  return {
    error,
    itemForm,
    currentGroup
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
    createPantryItem
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
    createPantryItem: (
      pantryItem: PantryItem,
      pantryGroup: PantryGroup
    ) => {
      dispatch(createPantryItem(pantryItem, pantryGroup));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryItemScreen);