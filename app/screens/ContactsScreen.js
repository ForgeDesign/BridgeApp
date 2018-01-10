import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView } from 'react-native';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ActivityCard } from '../components/ActivityCard'

export default class ContactsScreen extends React.Component {

  state={
    activity:
      [
        {
          connector: "Brian Amin",
          connectee: "Mary Lewis",
          connectorpath: require("../assets/images/brianamin.jpg"),
          time: "21m"
        },
        {
          connector: "Mark Brown",
          connectee: "David Rodriguez",
          connectorpath: require("../assets/images/markbrown.jpg"),
          time: "3h"
        },
        {
          connector: "Frank Barnes",
          connectee: "Mark Brown",
          connectorpath: require("../assets/images/frankbarnes.jpg"),
          time: "8h"
        }
      ]
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title={'Activity'}/>
        <View style={{
          borderBottomColor: '#003E5B',
          borderBottomWidth: 4,
          shadowOffset: { width: 0, height:2.8 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1}}/>
        <ScrollView style={{ flex: 1, marginTop: 6 }}>
          {this.state.activity.map((ref, key) =>
            <ActivityCard
              key={key}
              connector={ref.connector}
              connectee={ref.connectee}
              connectorpath={ref.connectorpath}
              time={ref.time}/>
          )}
        </ScrollView>
      </Container>
    )
  }
}
