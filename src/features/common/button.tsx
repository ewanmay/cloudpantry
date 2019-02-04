import {Button as NativeButton, View} from 'react-native'
import * as React from 'react';

class Button extends React.Component {
  render() {
    const { onPress, title, color, disabled} = this.props;
    return(
      <View>
        <NativeButton 
          onPress={onPress}
          title={title}
          color={color}
          disabled={disabled}
        />
      </View>
    )
  }
}

export default Button;