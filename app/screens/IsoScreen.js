import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, Dimensions, TouchableOpacity, Modal, KeyboardAvoidingView} from 'react-native';

import { Fab, Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { PersonCard } from '../components/PersonCard';
import { CardOnePreview } from '../components/CardOnePreview';

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
        
        <ScrollView style={{ flex: 1 }}
        >
          {this.state.people.map((person, key) =>
          <TouchableOpacity
            onPress={this._showModal} key={key}>
            <PersonCard
                key={key}
              name={person.name}
              location={person.location}
              imagepath={person.imagepath}/>
          </TouchableOpacity>
          )}
        </ScrollView>

        <Modal
          onRequestClose={this._hideModal}
          transparent={false}
          visible={this.state.isModalVisible}
          animationType='slide'
          style={{ backgroundColor: 'whitesmoke' }}>
          <KeyboardAvoidingView
            behavior={'position'}
            style={{ backgroundColor: 'whitesmoke', flex: 1, marginTop: 25}}>
              <CardOnePreview cardnum={1} title={'Name'} tagline={'President'} buisname={'Example'} phonenum={'1-800-555-5555'}/>
          

            <TouchableOpacity
              style={styles.button}
              onPress={this._hideModal}>
              <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>


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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: myWidth*.4,
    height: myWidth*.12,
    backgroundColor: '$primaryBlue',
    borderRadius: 5,
    marginLeft: myWidth*.3,
    marginRight: myWidth*.3,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
