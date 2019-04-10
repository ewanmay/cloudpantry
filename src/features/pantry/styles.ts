import {StyleSheet} from 'react-native';
export const colors = {
  black: "#23292E",
  gray: "#d5d5d5",
  lightGreen: "#55ad7a",
  paleBlue: "#1e5d88",
  darkerBlue: "#334d5c"
};

export const pantryItemStyles = StyleSheet.create({
  containerStyle: {
    alignSelf: "stretch",
    backgroundColor: 'white',
    borderBottomColor: colors.paleBlue,
    borderBottomWidth: 2
  },  
  titleStyle: {
    color: colors.darkerBlue,
    fontSize: 28,
    fontFamily: "questrial",
    padding: 10,
    flex: 4
  },
  textStyle: {
    color: "black",
    padding: 6,
    fontFamily: "questrial",
  },
  columnStyle: {
    flexDirection: "row",
  },
  expandedContainerStyle: {
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "black",
    borderBottomColor: colors.paleBlue,
    borderBottomWidth: 2,
  
    minHeight: "80%"
  }
});

export const pantryMenu = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    width: "50%",
    backgroundColor: colors.paleBlue,
    zIndex: 5,
    borderRadius: 10,
    // zIndex: 1
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    padding: 10,
    fontFamily: "questrial"
  },
  touchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    zIndex: 9
  }
});

export const pantryScreenStyles = StyleSheet.create({
  errorStyle: {
    fontSize: 16,
    fontFamily: "questrial",
    color: "red"
  },
  headerStyle: {
    fontFamily: "questrial",
    fontSize: 26
  },
  containerStyle: {
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  },
  headerContainer: {
    width: "100%",
    height: 80,
    paddingLeft: 20,
    paddingTop: 20
  },
  fieldInputTitle: {
    color: colors.darkerBlue,
    fontSize: 24,
    padding: 10,
    fontFamily: "questrial"
  },
  touchableTextStyle: {
    color: colors.darkerBlue,
    fontSize: 24,
    padding: 10,
    fontFamily: "questrial"
  },
  touchableContainerStyle: {
    flexDirection: "column",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  submitButton: {
    flexDirection: "column",
    backgroundColor: colors.darkerBlue,
    height: "10%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 20
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    padding: 10,
    fontFamily: "questrial"
  },
  fieldInputStyle: {
    flex: 3,
    padding: 10,
    fontSize: 16,
    fontFamily: "questrial"
  },
  fieldContainerStyle: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    margin: 20
  },
  pantryListContainer: {
    flexDirection: "column",
    minHeight: 60,
    margin: 20,
    display: 'flex'
  }
});
