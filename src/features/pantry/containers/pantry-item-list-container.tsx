import PantryItemList from "../components/pantry-item-list";
import { connect } from "react-redux";
import { selectPantryItem } from "../../../ducks/pantry/actions";
const mapStateToProps = ({ pantry }: any) => {
  const { selectedItem, currentGroup } = pantry;
  console.log(pantry);
  return {
    selectedItem,
    currentGroup
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectPantryItem: (item: number) => {
      dispatch(selectPantryItem(item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryItemList);
