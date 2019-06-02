import PantryScreen from "../components/pantry-screen";
import { connect } from "react-redux";
import { PantryGroup, PantryItem } from "../../../ducks/pantry/interfaces";
import { createPantryItem, deletePantryItem, toggleMenu, retrievePantry } from "../../../ducks/pantry/actions";
const mapStateToProps = ({ pantry }: any) => {
  const { items, groups, currentGroup, menuOpen, loadingPantry, noPantries} = pantry;
  console.log(noPantries);
  return {
    groups,
    currentGroup,
    noPantries,
    menuOpen,
    loadingPantry
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
    toggleMenu: (turnOn: boolean) => {
      dispatch(toggleMenu(turnOn))
    },
    retrievePantry: () => {
      dispatch(retrievePantry())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryScreen);
