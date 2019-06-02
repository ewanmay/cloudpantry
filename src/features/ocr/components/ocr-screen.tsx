import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import NotScanningScreen from './not-scanning-screen'
import ScanningScreen from './scanning-screen'

interface screenComponent extends React.Component {
  navigationOptions?: Object;
}
const ReceiptScanningScreen: screenComponent = ({ startTransmitting, stopTransmitting, transmitting, error }) => {
  console.log(error);
  const view = transmitting ?
    <ScanningScreen stopTransmitting={stopTransmitting} />
    : <NotScanningScreen startTransmitting={startTransmitting} />;
  return (
    <View>
      {view}
    </View>
  )
}

ReceiptScanningScreen.navigationOptions = {
  header: null
};

export default ReceiptScanningScreen