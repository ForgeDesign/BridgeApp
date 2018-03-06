import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

class CardInputSmall extends React.Component {
  static propTypes = {
    isEnabled: PropTypes.bool
  }

  state = {
    isFocused: false
  }

  focus = () => this.CardInputSmallRef.focus()

  render() {
    const { isEnabled, ...otherProps } = this.props
    const { isFocused } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={(ref) => this.CardInputSmallRef = ref}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={styles.input}
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

export default CardInputSmall;
