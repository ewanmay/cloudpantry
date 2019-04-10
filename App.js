//React Native
import React, { Component } from 'react';
import { Platform } from 'react-native';
//Redux
import reducers from './src/ducks/reducers'
import ReduxThunk from "redux-thunk";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
//Amplify
import { withAuthenticator } from 'aws-amplify-react-native';
//Navigation
import { setTopLevelNavigator } from './src/utils/navigationService'
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
//Screens
import { PantryScreen, CreateItemScreen, CreateGroupScreen, ModifyItemScreen } from './src/features/pantry';
import NfcScreen from './src/features/nfc/container/nfc-screen-container';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={(navigator) => {
            setTopLevelNavigator(navigator);
          }}
        />
      </Provider>
    );
  }
}

const stackNav = createMaterialTopTabNavigator({
  Pantry: {
    screen: createStackNavigator(
      {
        PantryHome: PantryScreen,
        CreateGroup: CreateGroupScreen,
        CreateItem: CreateItemScreen,
        ModifyItem: ModifyItemScreen
      },
      {
        initialRouteName: "PantryHome"
      }
    ),
    navigationOptions: () => ({
      header: null
    })
  },
  Claim: {
    screen: createStackNavigator(
      {
        ClaimScreen: NfcScreen
      },
      {
        initialRouteName: "ClaimScreen"
      }
    ),

    navigationOptions: () => ({
      header: null
    })
  }
},
  {
    initialRouteName: "Pantry"
  });

let federated = {
  google_client_id: '', // Enter your google_client_id here
  facebook_app_id: '378738719341266', // Enter your facebook_app_id here
  amazon_client_id: '' // Enter your amazon_client_id here
};
const AppNavigator = createAppContainer(stackNav);

export default withAuthenticator(App, federated = { federated });