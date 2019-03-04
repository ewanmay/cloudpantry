export interface PantryItem {
  name: string,
  quantity: number,
  id: number
  photo?: string,
  price?: number,
  expirationDate?: string,
}

export interface PantryItemForm {
  name: string,
  quantity: string,
  price: string,
  expirationDate: string
}
export interface PantryGroup {
  id: string,
  name: string,
  pantryItems: Array<PantryItem>,
  dateCreated: string
}

export interface initialPantryStateInterface {
  groups: Array<PantryGroup>,
  groupNameField: string,
  error: string,
  currentGroup: PantryGroup | null,
  menuOpen: boolean,
  itemForm: PantryItemForm
}

