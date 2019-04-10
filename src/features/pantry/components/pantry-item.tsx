import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, UIManager } from "react-native";
import { PantryItem, PantryGroup } from "../../../ducks/pantry/interfaces";
import { pantryItemStyles } from "../styles";
import { Icon } from 'react-native-elements';
import { navigate } from '../../../utils/navigationService'
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
interface PantryItemProps {
  details: PantryItem,
  currentGroup: PantryGroup,
  selectedItem: string,
  selectPantryItem: any,
  deletePantryItem: any,
  setFormValuesForEdit: any
}

const thePantryItem = ({ details, selectedItem, selectPantryItem, setFormValuesForEdit, currentGroup, deletePantryItem }: PantryItemProps) => {
  const { containerStyle, textStyle, titleStyle, columnStyle, expandedContainerStyle } = pantryItemStyles;
  const { id, name, quantity, price, expirationDate } = details;

  if (id === selectedItem) {
    return (
      <TouchableWithoutFeedback onPress={() => selectPantryItem(null)}>
        <View style={containerStyle}>

          <View style={columnStyle}>
            <Text style={titleStyle} numberOfLines={1}>{name}</Text>
            <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={{ margin: 15 }}>
              <TouchableWithoutFeedback
                style={{ flex: 1}}>

                <Icon
                  name="md-create"
                  type="ionicon"
                  color="#334d5c"
                  size={28}
                  onPress={() => {

                    setFormValuesForEdit(details)
                    navigate('ModifyItem', {});
                  }}
                />

              </TouchableWithoutFeedback>
              </View>
            <View style={{ margin: 15 }}>
              <TouchableWithoutFeedback
                style={{ flex: 1}}>

                <Icon
                  name="md-trash"
                  type="ionicon"
                  color="#334d5c"
                  size={28}
                  onPress={() => deletePantryItem(details, currentGroup)}
                />

              </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View style={columnStyle}>
            {quantity ? <Text style={textStyle} numberOfLines={1}>Quantity: {quantity}</Text> : null}
          </View>
          <View style={columnStyle}>
            {price ? <Text style={textStyle} numberOfLines={1}>Price: ${price}</Text> : null}
          </View>
          <View style={columnStyle}>
            {expirationDate ? <Text style={textStyle} numberOfLines={1}>Expiry Date: {expirationDate}</Text> : <Text style={textStyle}>Expiry</Text>}
          </View>
        </View >
      </TouchableWithoutFeedback >
    );
  }
  else {
    return (
      <TouchableWithoutFeedback onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); selectPantryItem(details.id); }}>
        <View style={containerStyle}>
          <View style={columnStyle}>
            <Text style={titleStyle} numberOfLines={1}>{name}</Text></View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export default thePantryItem;
