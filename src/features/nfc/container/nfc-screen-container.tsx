import NfcScreen from "../components/nfc-screen";
import { connect } from "react-redux";
import  { startTransmitting, stopTransmitting } from "../../../ducks/nfc/actions";
const mapStateToProps = ({ nfc, pantry }: any) => {
  const { items, groups, currentGroup, menuOpen, loadingPantry} = pantry;
  const { transmitting, error } = nfc;
  return {
    transmitting,
    error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    startTransmitting: () => {
      dispatch(startTransmitting());
    },
    stopTransmitting: () => {
      dispatch(stopTransmitting());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NfcScreen);
