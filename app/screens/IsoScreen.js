import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView } from 'react-native';
import { Fab, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';

export default class IsoScreen extends React.Component {


  constructor(){
    super();
    this.state = {
      people:
        [
          {
            "name": "George Washington",
            "location": "Westmoreland, VA",
            "imagepath": require("../assets/images/george.jpg")
          },
          {
            "name": 'Thomas Jefferson',
            "location": 'Shadwell, VA',
            "imagepath": require("../assets/images/tommy.jpg")
          }
        ],
      active: true
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title={'Connect'}/>
        <ScrollView style={styles.scroll}>
          {this.state.people.map((person) =>
            <PersonCard
              name={person.name}
              location={person.location}
              imagepath={person.imagepath}/>
          )}
        </ScrollView>
        <Fab
          active={this.state.active}
          direction='up'
          style={styles.fab}
          position='bottomRight'
          onPress={() => this.setState({active: !this.state.active})}>
          <Icon name="md-add"/>
        </Fab>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '$offwhite',
  },
  fab: {
    backgroundColor: '$primaryBlue',
  }
});
