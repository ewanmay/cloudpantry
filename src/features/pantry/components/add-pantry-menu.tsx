import * as React from "react";
import { View, Text, TouchableHighlight, GestureResponderEvent } from "react-native";
import { v4 } from "uuid";
import { pantryMenu } from "../styles";

interface menuItem {
  title: string;
  route: string;
}

const AddPantryMenu = ({ navigation, menuItems, toggleMenu}: any) => {
  const { containerStyle } = pantryMenu;
  return (
    <View style={containerStyle}>
      {renderMenuItems(menuItems, navigation, toggleMenu)}
    </View>
  );
};

function handlePress(e: GestureResponderEvent, menuRef: TouchableHighlight | null, route: string, navigation: any, toggleMenu: any) {
  if(menuRef) {
  toggleMenu(false);
  navigation.navigate(route);
  }
};

function renderMenuItems(menuItems: Array<menuItem>, navigation: any, toggleMenu: any) {
  let menuRef: TouchableHighlight | null = null;
  const { textStyle, touchableStyle } = pantryMenu;
  return menuItems.map(({ title, route }: menuItem) => {
    return(
    <TouchableHighlight
      style={touchableStyle}
      ref={menu => menuRef = menu}
      onPress={(e) => handlePress(e, menuRef, route, navigation, toggleMenu)}
      key={v4()}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableHighlight>);
  });
};

export default AddPantryMenu;
