import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

class CardInput extends React.Component {
  static propTypes = {
    isEnabled: PropTypes.bool
  }

  state = {
    isFocused: false
  }

  focus = () => this.CardInputRef.focus()

  render() {
    const { isEnabled, ...otherProps } = this.props
    const { isFocused } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={(ref) => this.CardInputRef = ref}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
            maxLength={32}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'grey'}
            selectionColor={'black'}
            retunKeyType={'done'}
            onFocus={() => this.setState({ isFocused: true})}
            onBlur={() => this.setState({ isFocused: false})}
            {...otherProps}/>
        </View>
      </View>
    )
  }
}

export default CardInput;
