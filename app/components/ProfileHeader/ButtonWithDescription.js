import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';



export default class ButtonWithDescription extends Component {

  back = () => this.props.navigation.navigate('AllCards');
  render() {
    return (
      <TouchableOpacity
        onPress={this.back}>
          <View style={{flexDirection:'column', alignItems:'center'}}>
              <View style={styles.icon}>
                  <Icon name={this.props.pictureName} style={{ color: '#fff' }}/>
              </View>
              <Text style={{color:'#668b9d'}}>
                  {this.props.description}
              </Text>
          </View>
      </TouchableOpacity>
    )
  }
}
