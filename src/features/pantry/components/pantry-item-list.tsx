import * as React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';
import PantryItemElement from './pantry-item';
import { PantryItem } from '../../../ducks/pantry/interfaces';

const PantryItemList = ({ currentGroup }: any) => {
  const { pantryItems } = currentGroup;
  // console.log(pantryItems);

  return ( <View>
    <Text style={{fontSize: 15}}>Pantry</Text>
    {renderItems(pantryItems)}
    </View>)
}

const renderItems = (pantryItems: Array<PantryItem>) => {
  return pantryItems.map(item => <PantryItemElement key={item.id} details={item} />)
}

export default PantryItemList