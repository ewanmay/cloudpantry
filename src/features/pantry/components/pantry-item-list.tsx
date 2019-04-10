import * as React from 'react';
import { Component } from 'react';
import { View, Text, FlatList, ListRenderItem } from 'react-native';
import PantryItemElement from '../containers/pantry-item-container';
import PantryListHeader from './pantry-item-list-header';
import { PantryGroup } from '../../../ducks/pantry/interfaces';

interface PantryItemListProps {
  currentGroup: PantryGroup
}
  
const _renderItem  = ({item}) => {
  return <PantryItemElement key={item.id} details={item} />
}
const _keyExtractor = (item, index) => item.id


const PantryItemList = ({ currentGroup }: PantryItemListProps) => {
  const {pantryItems} = currentGroup
  console.log("Pantry Item List", currentGroup)
  if (pantryItems && pantryItems.length > 0) {
    return (
      <View style={{height: '90%'}}>
        <Text style={{ fontSize: 20 }}>Pantry</Text>
        <FlatList
          data={pantryItems}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}>
        </FlatList>
      </View>
    )
  }
  return <Text>Create some items!</Text>
}

export default PantryItemList 