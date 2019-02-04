import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { LandingScreen, LoginScreen, RegisterScreen } from './src/features/auth';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './aws-config';
import {withAuthenticator } from 'aws-amplify-react-native';
import AppAuthenticator from './src/features/auth/components/authenticator';
Amplify.configure(awsConfig);
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {
  async signIn(e) {
    console.log(e);
  }
  render() {
    const federated = {
    google_client_id: '', // Enter your google_client_id here
    facebook_app_id: '378738719341266', // Enter your facebook_app_id here
    amazon_client_id: '' // Enter your amazon_client_id here
  };
    return (
      <AppAuthenticator
      myAWSExports={awsConfig}
      federated={federated}
      signIn={this.signIn}
      >
        <AppNavigator />
      </AppAuthenticator>

    );
  }
}

const stackNav = createStackNavigator({
  loginFlow: {
    screen: createStackNavigator(
      {
        Landing: LandingScreen,
        Register: RegisterScreen,
        Login: LoginScreen
      },
      {
        initialRouteName: "Login"
      }
    ),
    navigationOptions: () => ({
      header: null
    })
  }
});

const AppNavigator = createAppContainer(stackNav);

export default withAuthenticator(App);