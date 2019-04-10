import * as React from "react";
import { Text, View, TouchableHighlight, ActivityIndicator, LayoutAnimation } from "react-native";
import { pantryScreenStyles, colors } from "../styles";
import { Icon } from "react-native-elements";
import { PantryGroup } from "../../../ducks/pantry/interfaces";
import AddPantryMenu from "./add-pantry-menu";
import CreateNewGroupButton from "./create-new-group-button";
import PantryItemList from '../containers/pantry-item-list-container';
interface screenComponent extends React.Component {
  navigationOptions?: Object;
}

function renderScreen(
  groups: Array<PantryGroup>,
  navigation: any,
  currentGroup: PantryGroup,
  menuOpen: boolean,
  loadingPantry: boolean,
  toggleMenu: (menuOpen: boolean) => {},
  retrievePantry: () => {}
) {
  const {
    headerStyle,
    containerStyle,
    headerContainer,
    pantryListContainer,
  } = pantryScreenStyles;
  if (groups.length === 0) {
    retrievePantry()
  }
  if (loadingPantry) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.lightGreen} />
      </View>
    )
  }
  if (groups.length > 0 && currentGroup.name) {
    console.log("Current Group: ", currentGroup)
    return (
      <View style={containerStyle}>
        <View style={headerContainer}>
          <Text style={headerStyle}>{currentGroup.name}</Text>
          <TouchableHighlight
            style={{ position: "absolute", right: 60, top: 20, zIndex: 1, paddingBottom: 20 }}>

            <Icon
              name="md-refresh"
              type="ionicon"
              color="#334d5c"
              size={32}
              onPress={() => retrievePantry()}
            />

          </TouchableHighlight>
          <TouchableHighlight
            style={{ position: "absolute", right: 20, top: 20, zIndex: 10, paddingBottom: 20 }}
          >
            <Icon
              name="md-menu"
              type="ionicon"
              color="#334d5c"
              size={32}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                toggleMenu(!menuOpen);
              }}
            />
          </TouchableHighlight>
          {PantryMenu(menuOpen, navigation, toggleMenu)}
        </View>
        <View style={pantryListContainer}>
          <PantryItemList />
        </View>
      </View>
    );
  }
  else {
    return <CreateNewGroupButton navigation={navigation} />;
  }
}

const PantryMenu = (menuOpen: boolean, navigation: any, toggleMenu: any) => {
  const menuItems = [
    { title: "Add Group", route: "CreateGroup" },
    { title: "Create Item", route: "CreateItem" }
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
  retrievePantry,
  loadingPantry
}: any) => {
  const { containerStyle } = pantryScreenStyles;
  return (
    <View style={containerStyle}>
      {renderScreen(groups, navigation, currentGroup, menuOpen, loadingPantry, toggleMenu, retrievePantry)}
    </View>
  );
};

PantryScreen.navigationOptions = {
  header: null
};

export default PantryScreen;
