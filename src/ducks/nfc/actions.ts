import {
  START_TRANSMIT,
  STOP_TRANSMIT,
  TRANSMIT_FAILED

} from './types'
import { Dispatch } from "redux";
import { Auth } from 'aws-amplify'

import NfcManager, { Ndef } from 'react-native-nfc-manager'

const transmitData = async () => {
  const bytes = Ndef.encodeMessage([
    Ndef.textRecord("hello, world")
  ]);
  
  const response = await NfcManager.start({
    onSessionClosedIOS: () => {
      console.log('ios session closed');
    }
  })
  console.log(response)
  await NfcManager.registerTagEvent(
    tag => {
      console.log('Tag Discovered', tag);
    },
    'Hold your device over the tag'
  );
  const res = await NfcManager.requestNdefWrite(bytes, { format: true })
  return res;

}


const startTransmitting = () => async (dispatch: Dispatch) => {
  dispatch({
    type: START_TRANSMIT
  })
  try {
    await transmitData()
  }
  catch (e) {
    console.log('Transmit Failed', e)
    dispatch({
      type: TRANSMIT_FAILED,
      payload: e
    })
  }
}

const stopTransmitting = () => (dispatch: Dispatch) => {
  dispatch({
    type: STOP_TRANSMIT
  })
}

export {
  startTransmitting,
  stopTransmitting
}