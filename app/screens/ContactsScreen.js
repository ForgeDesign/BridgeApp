import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';

import { Container } from '../components/Container';
import { Header } from '../components/Header';

export default class ContactsScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title={'Contacts'}/>
        <View style={{
          borderBottomColor: '#003E5B',
          borderBottomWidth: 4,
          shadowOffset: { width: 0, height:2.8 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1}}/>
      </Container>
    )
  }
}
