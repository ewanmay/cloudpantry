import {
  START_TRANSMIT,
  STOP_TRANSMIT,
  TRANSMIT_FAILED

} from './types'
import { Dispatch } from "redux";
import { Auth } from 'aws-amplify'

const scanData = async () => {


}


const startTransmitting = () => async (dispatch: Dispatch) => {
  dispatch({
    type: START_TRANSMIT
  })
  try {
    // await transmitData()
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