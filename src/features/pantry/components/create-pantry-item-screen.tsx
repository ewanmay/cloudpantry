import * as React from "react";
import { Text, View, TouchableHighlight } from "react-native";

import { v4 } from "uuid";
import { pantryScreenStyles } from "../styles";
import Field from "../../common/field";

const CreatePantryItemScreen: screenComponent = ({
  navigation,
  formNameChanged,
  formQuantityChanged,
  formPriceChanged,
  formDateChanged,
  formValidateFailed,
  formValidateReset,
  createPantryItem,
  error,
  itemForm,
  currentGroup
}: any) => {
  const { submitButton, submitButtonText, errorStyle } = pantryScreenStyles;
  const { name, quantity, expirationDate, price } = itemForm;
  return (
    <View
      style={{ backgroundColor: "white", height: "100%", alignItems: "center" }}
    >
      <Field
        onChangeText={(name: string) => formNameChanged(name)}
        value={name}
        label="Name"
        placeholder="Bell Peppers"
        secure={false}
      />
      <Field
        onChangeText={(quantity: string) => formQuantityChanged(quantity)}
        value={quantity}
        label="Quantity"
        placeholder="2 cups"
        secure={false}
      />
      <Field
        onChangeText={(price: string) => formPriceChanged(price)}
        value={price}
        label="Price"
        placeholder="$12.50"
        secure={false}
      />
      <Field
        onChangeText={(expirationDate: string) =>
          formDateChanged(expirationDate)
        }
        value={expirationDate}
        label="Expiration Date"
        placeholder="July 7th, 2018"
        secure={false}
      />
      <Text style={errorStyle}>{error} </Text>
      <TouchableHighlight
        onPress={() => {          
          formValidateReset();
          const { validated, error }: any = validateFormValues({
            name,
            quantity,
            price
          });
          if (validated) {
            createPantryItem(
              { name, price, quantity, expirationDate, id: v4() },
              currentGroup
            );
            navigation.navigate("PantryHome");
          }
          return formValidateFailed(error);
        }}
        style={submitButton}
      >
        <Text style={submitButtonText}>Submit</Text>
      </TouchableHighlight>
    </View>
  );
};

function validateFormValues({ name, quantity, price }: any) {
  if(!name) {
    return { validated: false, error: "Please provide a name"}
  };
  if(!quantity) {
    return { validated: false, error: "Please enter a quantity"}
  };
  if(price && isNaN(price)) {
    return { validated: false, error: "Price is not a number"}
  };
  return { validated: true, error: ''}
}

interface screenComponent extends React.StatelessComponent {
  navigationOptions?: Object;
}

CreatePantryItemScreen.navigationOptions = {
  title: null,
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowOpacity: 0
  },
  headerTintColor: "black"
};

export default CreatePantryItemScreen;
