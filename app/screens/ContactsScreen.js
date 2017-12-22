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
      </Container>
    )
  }
}
