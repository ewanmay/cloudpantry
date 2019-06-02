import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const StartScanningScreen = ({startTransmitting}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => startTransmitting()}>
      <Text>Claim Hardware</Text>
          
      </TouchableOpacity>
    </View>
  );
}

export default StartScanningScreen