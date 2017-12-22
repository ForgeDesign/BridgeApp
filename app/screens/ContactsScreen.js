import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';

import { Navbar } from '../components/Navbar';

export default class ContactsScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Contacts</Text>
      </View>
    )
  }
}
