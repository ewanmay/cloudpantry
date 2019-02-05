import * as React from 'react';
import { View, Text } from 'react-native';
import Button from '../../common/button';
import Field from '../../common/field';
import { Auth } from 'aws-amplify';
// import { authActions } from "../../../ducks/auth";
class LoginScreen extends React.Component {

  async displayUser() {
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false
    })
    return user;
  }

  render() {
    return(
      <View>
        <Text>
          Login Page
          User Properties:
          {this.displayUser()}
        </Text>
        
        {/* <Field />
        <Button/> */}
      </View>
    )
  }
};

// const mapStateToProps = ({ auth }: stateProps) => {
//   return {
//       email: auth.email,
//       password: auth.password,
//       loading: auth.loading,
//       error: auth.error,
//       confirmation: auth.confirmation,
//       showPopup: auth.showPopup,
//   }
// }

// export default connect(mapStateToProps, authActions)(LoginScreen);
export default LoginScreen;