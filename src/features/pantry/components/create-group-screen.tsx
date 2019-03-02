import * as React from "react";
import { Text, View, TouchableHighlight, TextInput, KeyboardAvoidingView } from "react-native";
import { v4 } from "uuid";
import { pantryScreenStyles } from "../styles";
import { PantryGroup } from '../../../ducks/pantry/interfaces';

interface screenComponent extends React.StatelessComponent {
  navigationOptions?: Object;
}

const CreateGroupScreen: screenComponent = ({
  groupNameField,
  groupNameChanged,
  createPantryGroup,
  groups
}: any) => {
  const {
    containerStyle,
    fieldInputStyle,
    fieldInputTitle,
    fieldContainerStyle,
    submitButton,
    submitButtonText
  } = pantryScreenStyles;
  return (
    <KeyboardAvoidingView style={containerStyle}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={fieldInputTitle}>What's the group called?</Text>
        <View style={fieldContainerStyle}>
          <TextInput
            value={groupNameField}
            onChangeText={text => groupNameChanged(text)}
            style={fieldInputStyle}
            autoCorrect={false}
            placeholderTextColor={"#6c8eec"}
            placeholder={"Home"}
            secureTextEntry={false}
          />
        </View>
        <TouchableHighlight
          style={submitButton}
          onPress={() =>
            createPantryGroupAction(groupNameField, createPantryGroup, groups)
          }
        >
          <Text style={submitButtonText}>Submit</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

function createPantryGroupAction(
  groupFieldName: string,
  createPantryGroup: Function,
  pantryGroups: Array<PantryGroup>
) {
  const newGroup = {
    id: v4(),
    name: groupFieldName,
    memberIds: [],
    pantryItems: []
  };
  createPantryGroup(newGroup, pantryGroups);
}

CreateGroupScreen.navigationOptions = {
  title: null,
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowOpacity: 0
  },
  headerTintColor: 'black',
};

export default CreateGroupScreen