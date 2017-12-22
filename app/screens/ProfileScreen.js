import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { ProfileHeader } from '../components/ProfileHeader';
export default class ProfileScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header title={'Profile'}/>
        <ProfileHeader/>
      </Container>
    )
  };
}
