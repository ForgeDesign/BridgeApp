import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, Dimensions, TouchableOpacity, Modal, KeyboardAvoidingView} from 'react-native';

import { Fab, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';

const myWidth = Dimensions.get('window').width;
export default class IsoScreen extends React.Component {

  _showModal = () => { this.setState({ isModalVisible: true })
    console.log(myWidth);
  }
  _hideModal = () => { this.setState({ isModalVisible: false })
    console.log(myWidth)
  }
  constructor(){
    super();


    this.state = {
      people:
        [
          {
            "name": "Mark Brown",
            "location": "71 Pilgrim Ave. Chevy Chase, MD",
            "imagepath": require("../assets/images/markbrown.jpg"),
            "card":{
              "position":"Chief Operating Officer",
              "website":"gsb.com",
              "buisname":"Global Secure Bank",
              "phonenum":"(213)6129713",
              "name":"Mark Brown",
              "email":"brownmark@gsb.com",
              "address":"71 Pilgrim Ave. Chevy Chase, MD",
              "cardnum": 1
            }
          },
          {
            "name": "Brian Amin",
            "location": "3052 Parker Dr. Akron, OH",
            "imagepath": require("../assets/images/brianamin.jpg"),
            "card":{
              "position":"Project Manager",
              "website":"polyend.com",
              "buisname":"Polyend Deseign",
              "phonenum":"(330)6510981",
              "name":"Brian Amin",
              "email":"brian.amin@gmail.com",
              "address":"3052 Parker Dr. Akron, OH",
              "cardnum": 2
            }
          },
          {
            "name": "Mary Lewis",
            "location": "4 Goldfield Rd. Honolulu, HI",
            "imagepath": require("../assets/images/marylewis.jpg"),
            "card":{
              "position":"VP of Engineering",
              "website":"arkp.net",
              "buisname":"Ark Petrol",
              "phonenum":"(541)9241536",
              "name":"Mary Lewis",
              "email":"mlewis1@arkp.net",
              "address":"4 Goldfield Rd. Honolulu, HI",
              "cardnum": 3
            }
          },
          {
            "name": "David Rodriguez",
            "location": "44 Shirley Ave. West Chicago, IL",
            "imagepath": require("../assets/images/davidrodriguez.jpg"),
            "card":{
              "position":"Head of Product Development",
              "website":"zatri.net",
              "buisname":"Zatri Co.",
              "phonenum":"(338)1459857",
              "name":"David Rodriguez",
              "email":"djrodriguez@zatri.net",
              "address":"44 Shirley Ave. West Chicago, IL",
              "cardnum": 4
            }
          },
          {
            "name": "Frank Barnes",
            "location": "530 Winding Way Reynoldsburg, OH",
            "imagepath": require("../assets/images/frankbarnes.jpg"),
            "card":{
              "position":"Sales Director",
              "website":"shop.vindu.com",
              "buisname":"Vindu",
              "phonenum":"(330)2523647",
              "name":"Frank Barnes",
              "email":"barnes2@gmail.com",
              "address":"530 Winding Way Reynoldsburg, OH",
              "cardnum": 5
            }
          }
        ],
      active: true,
      isModalVisible:false,
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

        <ScrollView style={{ flex: 1, marginTop: 6 }}>
          {this.state.people.map((person, key) =>
            <PersonCard
              key={key}
              name={person.name}
              card={person.card}
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
  },

});
