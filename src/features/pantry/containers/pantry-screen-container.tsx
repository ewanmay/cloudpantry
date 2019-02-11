import PantryScreen from "../components/pantry-screen";
import { connect } from "react-redux";
import { PantryGroup, PantryItem } from "../../../ducks/pantry/interfaces";
import { createPantryItem, deletePantryItem, modifyPantryItem, toggleMenu } from "../../../ducks/pantry/actions";
const mapStateToProps = ({ pantry }: any) => {
  const { items, groups, currentGroup, menuOpen} = pantry;
  return {
    items,
    groups,
    currentGroup,
    menuOpen
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createPantryItem: (pantryItem: PantryItem, pantryGroup: PantryGroup) => {
      dispatch(createPantryItem(pantryItem, pantryGroup));
    },
    deletePantryItem: (pantryItem: PantryItem, pantryGroup: PantryGroup) => {
      dispatch(deletePantryItem(pantryItem, pantryGroup));
    },
    modifyPantryItem: (pantryItem: PantryItem, pantryGroup: PantryGroup) => {
      dispatch(modifyPantryItem(pantryItem, pantryGroup));
    },
    toggleMenu: (turnOn: boolean) => {
      dispatch(toggleMenu(turnOn))
    }

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryScreen);
