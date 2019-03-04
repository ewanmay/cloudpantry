import * as React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';
import PantryItemElement from './pantry-item';
import PantryListHeader from './pantry-item-list-header';
import { PantryItem } from '../../../ducks/pantry/interfaces';

const PantryItemList = ({ currentGroup }: any) => {
  const { pantryItems } = currentGroup;
  // console.log(pantryItems);

  return (<View>
    <Text style={{ fontSize: 20   }}>Pantry</Text>
    {renderItems(pantryItems)}
  </View>)
}

const renderItems = (pantryItems: Array<PantryItem>) => {
  console.log(pantryItems)
  let pantryElements;
  if (pantryItems && pantryItems.length > 0) {
    pantryElements = pantryItems.map(item => <PantryItemElement key={item.id} details={item} />)
    return (
      <View>
        <PantryListHeader />
        {pantryElements}
      </View>
    )
  }

  return <Text>Create some items!</Text>
}

export default PantryItemList