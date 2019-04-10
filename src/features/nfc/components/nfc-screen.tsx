import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import NotTransmittingScreen from './not-transmitting-screen'
import TransmittingScreen from './transmitting-screen'

interface screenComponent extends React.Component {
  navigationOptions?: Object;
}
const NfcScreen: screenComponent = ({ startTransmitting, stopTransmitting, transmitting, error }) => {
  console.log(error);
  // const view = transmitting ?
  //   <TransmittingScreen stopTransmitting={stopTransmitting} />
  //   : <NotTransmittingScreen startTransmitting={startTransmitting} />;
  return (
    <View>
      <Text>
        NFC Claiming Feature coming soon!
      </Text>
    </View>
  )
}

NfcScreen.navigationOptions = {
  header: null
};

export default NfcScreen