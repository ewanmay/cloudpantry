import { Authenticator, Greetings, SignIn, ConfirmSignIn, RequireNewPassword, SignUp, ConfirmSignUp, VerifyContact, ForgotPassword } from 'aws-amplify-react-native';
import * as React from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';

class AppAuthenticator extends React.Component {
  render() {
    return (

      <Authenticator
        // Optionally hard-code an initial state
        authState="signIn"
        // Pass in an already authenticated CognitoUser or FederatedUser object
        authData={this.props.cognitoUser || "username"}
        // Fired when Authentication State changes
        onStateChange={(authState) => console.log(authState)}
        // A theme object to override the UI / styling
        theme={this.props.myCustomTheme}
        // Pass in an aws-exports configuration
        amplifyConfig={this.props.myAWSExports}
        // Pass in a message map for error strings
        errorMessage={this.props.myMessageMap}
      >
      {/*  */}
        {/* <SignIn federated={this.props.federated} />
        <ConfirmSignIn />
        <RequireNewPassword />
        <SignUp />
        <ConfirmSignUp />
        <VerifyContact />
        <ForgotPassword /> */}
      </Authenticator>

    )
  }
}

export default AppAuthenticator;