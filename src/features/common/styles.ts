import { StyleSheet } from 'react-native';

export const fieldStyles = StyleSheet.create({    
  fieldContainerStyle: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5
  },
  fieldLabelStyle: {
      fontSize: 18,
      paddingLeft: 20,
      flex: 1,
      fontFamily: 'questrial'
  },
  fieldInputStyle: {
      flex: 3, 
      padding: 10,
      fontSize: 16,
  },
})
