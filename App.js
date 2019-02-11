import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { withAuthenticator } from 'aws-amplify-react-native';
import { PantryScreen,  CreateItemScreen,  CreateGroupScreen} from './src/features/pantry';
import { createStore, applyMiddleware } from "redux";
import {setTopLevelNavigator} from './src/utils/navigationService'
import reducers from './src/ducks/reducers'
import ReduxThunk from "redux-thunk";
import PantryItem from './src/features/pantry/components/pantry-item';
import {API } from 'aws-amplify'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {

  render() {
    // const store = createStore()
    const item = {
      name: "Bell Peppers",
      price: "12.5",
      quantity: "2",
      expirationDate: "",
      id: "97add10b-57d4-4cb2-894f-1a8b0077e690"
    }
    console.log(item);
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

const stackNav = createStackNavigator({
  pantry: {
    screen: createStackNavigator(
      {
        PantryHome: PantryScreen,
        CreateGroup: CreateGroupScreen,
        CreateItem: CreateItemScreen,
      },
      {
        initialRouteName: "PantryHome"
      }
    ),
    navigationOptions: () => ({
      header: null
    })
  }
});

let federated = {
  google_client_id: '', // Enter your google_client_id here
  facebook_app_id: '378738719341266', // Enter your facebook_app_id here
  amazon_client_id: '' // Enter your amazon_client_id here
};
const AppNavigator = createAppContainer(stackNav);

export default withAuthenticator(App, federated={federated});