import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';

var people = [
  {
    "name": "George Washington",
    "location": "Westmoreland, VA",
    "imagepath": "../assets/images/george.jpg"
  },
  {
    "name": 'Thomas Jefferson',
    "location": 'Shadwell, VA',
    "imagepath": '../assets/images/tommy.jpg'
  }
]

export default class IsoScreen extends React.Component {


  constructor(){
    super();
    this.state = {
      people:
        [
          {
            "name": "George Washington",
            "location": "Westmoreland, VA",
            "imagepath": "../assets/images/george.jpg"
          },
          {
            "name": 'Thomas Jefferson',
            "location": 'Shadwell, VA',
            "imagepath": '../assets/images/tommy.jpg'
          }
        ]
      }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title={'Connect'}/>
        <ScrollView style={styles.scroll}>
          {people.map((person) =>
            <PersonCard
              name={person.name}
              location={person.location}
              imagepath={person.imagepath}/>
          )}
        </ScrollView>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '$offwhite',
  }
});
