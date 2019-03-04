import React, { Component } from 'react';
import { View, Text } from "react-native";
import { PantryItem } from "../../../ducks/pantry/interfaces";
import { pantryItemStyles } from "../styles";

interface PantryItemProps {
  details: PantryItem
}

const thePantryItem = ({ details }: PantryItemProps) => {
  const { containerStyle, textStyle, columnStyle } = pantryItemStyles;
  const { id, name, quantity, price, expirationDate } = details;
  return (
    <View style={containerStyle}>
      <View style={columnStyle}>
        <Text style={textStyle} numberOfLines={1}>{name}</Text></View>
      <View style={columnStyle}>
        {quantity ? <Text style={textStyle}>{quantity}</Text> : null}
      </View>
      <View style={columnStyle}>
        {price ? <Text style={textStyle}>${price}</Text> : null}
      </View>
      <View style={columnStyle}>
        {expirationDate ? <Text style={textStyle}>{expirationDate}</Text> : <Text style={textStyle}>Expiry</Text>}
      </View>
    </View>
  );
};

export default thePantryItem;
