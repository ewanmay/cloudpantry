import React, { Component } from 'react';
import { View, Text } from "react-native";
import { PantryItem } from "../../../ducks/pantry/interfaces";
import { pantryItemStyles } from "../styles";


const PantryListHeader = () => {
  const { containerStyle, textStyle, columnStyle } = pantryItemStyles;
  return (
    <View style={containerStyle}>
      <View style={columnStyle}><Text>Name</Text></View>
      <View style={columnStyle}><Text>Quantity</Text></View>
      <View style={columnStyle}><Text >Price</Text></View>
      <View style={columnStyle}><Text numberOfLines={1}>Expiration Date</Text></View>
    </View>
  );
};

export default PantryListHeader;
