import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { ProfileHeader } from '../components/ProfileHeader';
import { CardPreview } from '../components/CardPreview';
export default class ProfileScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header title={'Profile'}/>
        <ProfileHeader/>
        <CardPreview title={'My Cards.'} tagline={''} buisname={'John Doe'} phonenum={'1-800-555-5555'}/>

      </Container>
    )
  };
}
