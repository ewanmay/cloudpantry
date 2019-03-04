import * as React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity } from "react-native";
import { pantryScreenStyles } from   "../styles";
import { Icon } from "react-native-elements";
import { PantryGroup } from "../../../ducks/pantry/interfaces";
import AddPantryMenu from "./add-pantry-menu";
import { toggleMenu } from "../../../ducks/pantry/actions";
import CreateNewGroupButton from "./create-new-group-button";
import PantryItemList from './pantry-item-list';
interface screenComponent extends React.Component {
  navigationOptions?: Object;
}

function renderScreen(
  groups: Array<PantryGroup>,
  navigation: any,
  currentGroup: PantryGroup,
  menuOpen: boolean,
  toggleMenu: any,
  retrievePantry: any
) {
  const {
    touchableContainerStyle,
    touchableTextStyle,
    headerStyle,
    containerStyle,
    headerContainer,
    pantryListContainer
  } = pantryScreenStyles;
  if (groups.length === 0) { retrievePantry() }
  console.log(currentGroup);
  if (groups.length > 0) {
    return (
      <View style={containerStyle}>
        <View style={headerContainer}>
          <Text style={headerStyle}>{currentGroup.name}</Text>
          <TouchableHighlight
            style={{ position: "absolute", right: 20, top: 20, zIndex: 1, paddingBottom: 20 }}
          >
            <Icon
              name="md-menu"
              type="ionicon"
              color="#334d5c"
              size={32}
              onPress={() => toggleMenu(!menuOpen)}
            />
          </TouchableHighlight>

          {PantryMenu(menuOpen, navigation, toggleMenu)}
        </View>
        <View style={pantryListContainer}>
          <PantryItemList currentGroup={currentGroup} />
        </View>
      </View>
    );
  }
  return <CreateNewGroupButton navigation={navigation} />;
}

function PantryMenu(menuOpen: boolean, navigation: any, toggleMenu: any) {
  const menuItems = [
    { title: "Add Group", route: "CreateGroup" },
    { title: "Create Item", route: "CreateItem" }
    // { title: "Modify Pantry", route: "ModifyItems" }
  ];
  return menuOpen ? (
    <AddPantryMenu menuItems={menuItems} navigation={navigation} toggleMenu={toggleMenu} />
  ) : null;
}

const PantryScreen: screenComponent = ({
  groups,
  currentGroup,
  navigation,
  toggleMenu,
  menuOpen,
  retrievePantry
}: any) => {
  const { containerStyle } = pantryScreenStyles;
  return (
    <View style={containerStyle}>
      {renderScreen(groups, navigation, currentGroup, menuOpen, toggleMenu, retrievePantry)}
    </View>
  );
};

PantryScreen.navigationOptions = {
  header: null
};

export default PantryScreen;
