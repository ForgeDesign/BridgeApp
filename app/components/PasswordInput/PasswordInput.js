import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

class PasswordInput extends React.Component {
  static propTypes = {
    isEnabled: PropTypes.bool
  }

  state = {
    isFocused: false
  }

  focus = () => this.passwordInputRef.focus()

  render() {
    const { isEnabled, ...otherProps } = this.props
    const { isFocused } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Icon
            style={styles.icon}
            name={'ios-lock-outline'}/>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={(ref) => this.passwordInputRef = ref}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            maxLength={32}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'steelblue'}
            selectionColor={'white'}
            name={'password'}
            placeholder={'Password'}
            retunKeyType={'done'}
            secureTextEntry={true}
            onFocus={() => this.setState({ isFocused: true})}
            onBlur={() => this.setState({ isFocused: false})}
            {...otherProps}/>
        </View>
      </View>
    )
  }
}

export default PasswordInput;
