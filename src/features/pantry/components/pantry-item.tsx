import React, { Component } from 'react';
import { View, Text } from "react-native";
import { PantryItem } from "../../../ducks/pantry/interfaces";
import { pantryItemStyles } from "../styles";

interface PantryItemProps {
  details: PantryItem
}

const thePantryItem = ({ details }: PantryItemProps) => {
  const { containerStyle, textStyle } = pantryItemStyles;
  const { id, name, quantity, price, expirationDate } = details;
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{name}</Text>
      {quantity ? <Text style={textStyle}>{quantity}</Text> : null}
      {price ? <Text style={textStyle}>{price}</Text> : null}
      {expirationDate ? <Text style={textStyle}>{expirationDate}</Text> : <Text style={textStyle}>Expiry</Text>}
    </View>
  );
};

export default thePantryItem;
