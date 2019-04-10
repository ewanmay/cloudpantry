import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native';
import { NfcManager, Ndef } from 'react-native-nfc-manager'
const TransmittingScreen = ({ stopTransmitting }) => {

  return (
    <View>

      <TouchableOpacity onPress={() => stopTransmitting()}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>);
}

export default TransmittingScreen