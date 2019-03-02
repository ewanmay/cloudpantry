
import CreateGroupScreen from '../components/create-group-screen';
import { pantryActions } from "../../../ducks/pantry";
import { connect } from "react-redux";
import { PantryGroup } from "../../../ducks/pantry/interfaces";

const mapStateToProps = ({pantry}: any) => {
  const { groupNameField, groups } = pantry;
  return {
    groupNameField,
    groups
  };
};

const mapDispatchToProps = (dispatch: any) => {
  const { createPantryGroup, groupNameChanged } = pantryActions
  return {
    createPantryGroup: (
      newGroup: PantryGroup,
      pantryGroups: Array<PantryGroup>
    ) => dispatch(createPantryGroup(newGroup, pantryGroups)),
    groupNameChanged: (text: string) => dispatch(groupNameChanged(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupScreen);
