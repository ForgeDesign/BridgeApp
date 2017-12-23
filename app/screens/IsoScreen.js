import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, Dimensions} from 'react-native';
// import { Dimensions } from 'react-native';
import { Fab, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';

const myWidth = Dimensions.get('window').width;
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
        
        <Header title={'Connect'} />
        <View style={{
          borderBottomColor: '#003E5B',
          borderBottomWidth: 4,
          shadowOffset: { width: 0, height:2.8 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1}}/>

        <ScrollView style={{  flex: 1,
    backgroundColor: '$offwhite',}}
        >
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
