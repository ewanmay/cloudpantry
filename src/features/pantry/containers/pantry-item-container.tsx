import PantryItem from "../components/pantry-item";
import { connect } from "react-redux";
import { selectPantryItem, setFormValuesForEdit, deletePantryItem } from "../../../ducks/pantry/actions";
import { PantryGroup, PantryItem as PantryItemInterface } from "../../../ducks/pantry/interfaces";
const mapStateToProps = ({ pantry }: any) => {
  const { selectedItem, currentGroup } = pantry;
  return {
    currentGroup,
    selectedItem
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectPantryItem: (item: number) => {
      dispatch(selectPantryItem(item));
    },
    setFormValuesForEdit: (pantryItem: PantryItemInterface) => {
      dispatch(setFormValuesForEdit(pantryItem))
    },
    deletePantryItem: (pantryItem: PantryItemInterface, currentGroup: PantryGroup) => {
      dispatch(deletePantryItem(pantryItem, currentGroup))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryItem);
