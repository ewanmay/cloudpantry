import * as React from 'react';
import { View, Text } from 'react-native';
import Button from '../../common/button';
import Field from '../../common/field';
// import { authActions } from "../../../ducks/auth";
class LoginScreen extends React.Component {

  render() {
    return(
      <View>
        <Text>
          Login Page
        </Text>
        <Field
        onChangeText={(password: string) => this.props.passwordChanged(password)}
        value={this.props.password}
        label='Password'
        placeholder='password'
        secure={true}
    />
         
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