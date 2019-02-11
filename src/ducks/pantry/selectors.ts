import { PantryGroup, PantryItem } from './interfaces'

export const removePantryItem = (pantryItem: PantryItem, pantryGroup: PantryGroup) => {
  const newPantryItemArray =  pantryGroup.pantryItems.filter(({name}) => pantryItem.name !== name) 
  return { ...pantryGroup, pantryItems: newPantryItemArray}
}

export function modifyPantryItems(pantryItems: Array<PantryItem>, modifiedItem: PantryItem) {
  const index = pantryItems.findIndex(item => item.id === modifiedItem.id);
  pantryItems[index] = modifiedItem
  return pantryItems
}

export function modifyPantryGroups(pantryGroups: Array<PantryGroup>, modifiedGroup: PantryGroup) {
  const index = pantryGroups.findIndex((item: PantryGroup) => item.id === modifiedGroup.id);
  pantryGroups[index] = modifiedGroup
  return pantryGroups
}

export function addPantryGroup(pantryGroups: Array<PantryGroup>, newGroup: PantryGroup) {
  pantryGroups.push(newGroup);   
  return pantryGroups;
}

export function addPantryItem(pantryGroup: PantryGroup, newItem: PantryItem) {
  pantryGroup.pantryItems.push(newItem)
  return pantryGroup
}