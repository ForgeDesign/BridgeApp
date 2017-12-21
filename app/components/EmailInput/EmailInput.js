import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

class EmailInput extends React.Component {
  static propTypes = {
    isEnabled: PropTypes.bool
  }

  state = {
    isFocused: false
  }

  focus = () => this.emailInputRef.focus()

  render() {
    const { isEnabled, ...otherProps } = this.props
    const { isFocused } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Icon
            style={styles.icon}
            name={'ios-mail-outline'}/>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={(ref) => this.emailInputRef = ref}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            maxLength={32}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'steelblue'}
            selectionColor={'#797979'}
            name={'email'}
            placeholder={'Email'}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            onFocus={() => this.setState({ isFocused: true})}
            onBlur={() => this.setState({ isFocused: false})}
            {...otherProps}/>
        </View>
      </View>
    )
  }
}

export default EmailInput;
