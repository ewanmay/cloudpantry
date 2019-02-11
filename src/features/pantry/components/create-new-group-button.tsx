import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { pantryScreenStyles } from "../styles";
import { pantryActions } from '../../../ducks/pantry';

function CreateNewGroupButton({navigation}: any) {
  console.log(navigation)
  const { touchableContainerStyle, touchableTextStyle} = pantryScreenStyles
  return(
  <TouchableOpacity
      style={touchableContainerStyle}
      onPress={() => handlePress(navigation, "CreateGroup")}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={touchableTextStyle}>Create a new group</Text>
        {/* <Icon
          reverse
          name="users"
          type="font-awesome"
          color="#334d5c"
          size={32}
        /> */}
      </View>
    </TouchableOpacity>
  );
}

function handlePress(navigation: any, route: string)  {
  pantryActions.navigateReset()
  navigation.navigate(route)
}

export default CreateNewGroupButton;