import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native';

const NotTransmittingScreen = ({startTransmitting}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => startTransmitting()}>
      <Text>Claim Hardware</Text>
          
      </TouchableOpacity>
    </View>
  );
}

export default NotTransmittingScreen