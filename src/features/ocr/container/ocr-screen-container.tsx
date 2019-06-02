import OcrScreen from "../components/ocr-screen";
import { connect } from "react-redux";
import  { startTransmitting, stopTransmitting } from "../../../ducks/ocr/actions";
const mapStateToProps = ({ocr}: any) => {
  const { transmitting, error } = ocr;
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
)(OcrScreen);
