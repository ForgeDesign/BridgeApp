import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';

var {height, width} = Dimensions.get('window');

export default class LoginScreen extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoginPress: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  render() {
    const { email, password } = this.state
    const { navigate } = this.props.navigation
    const { isLoading, onLoginPress } = this.props
    const isValid = email !== '' && password !== ''
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.main}>
          <View style={styles.imageView}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}/>
          </View>
          <View style={styles.credView}>
            <EmailInput
              withRef={true}
              editable={!isLoading}
              onChangeText={(value) => this.setState({email: value })}
              isEnabled={!isLoading}/>
            <PasswordInput
              withRef={true}
              editable={!isLoading}
              onChangeText={(value) => this.setState({password: value })}
              isEnabled={!isLoading}/>
          </View>
          <View style={styles.miscView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Main')}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
            <View style={styles.iconRow}>
              <View style={styles.icon}>
                <Text style={styles.iconText}>f</Text>
              </View>
              <View style={styles.icon}>
                <Text style={styles.iconText}>{'in'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.footView}>
            <View style={styles.footNest}>
              <Text style={styles.footerText}>{'Dont have an account yet?'}</Text>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = EStyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '$primaryBlue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    flex: .6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: width*.4,
    width: width*.6,
  },
  credview: {
    flex: .15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miscview: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width*.45,
    height: width*.11,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 14,
    color: '$primaryBlue',
  },
  forgotText: {
    fontSize: 12,
    color: 'black',
    alignSelf: 'center'
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: width*.08,
    height: width*.08,
    borderRadius: width*.04,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    backgroundColor: 'white'
  },
  iconText: {
    fontSize: 16,
    color: '$primaryBlue',
    fontWeight: 'bold'
  },
  footView: {
    flex: .25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footNest: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '$inputText',
  },
  registerButton: {
    margin: 5,
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

});
