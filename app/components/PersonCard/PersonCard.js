import React from 'react';

import { View, Text, Image, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { CardSwiper } from '../CardSwiper';
import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

class PersonCard extends React.Component {

  state = {
    isModalVisible: false,
    hidden: false,
    bigstuff: ""
  }

  // abortions are not okay

  constructor(props) {
      super(props)
    //   this.state.location = props.location
      if(props.card[0] && props.card[0].businame != undefined && props.card[0].position != undefined) {
        this.state.location = JSON.parse(JSON.stringify(props.card[0].businame)) + " : " + JSON.parse(JSON.stringify(props.card[0].position))
      }
  }

  componentWillMount() {
      this.updateName()
  }

  filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

    async updateName() {
        if(this.props.imageTypeStuff && this.props.imageTypeStuff != "undefined : undefined") {
            this.setState({
                bigstuff: this.props.imageTypeStuff
            })
            return
        }
            
        await Promise.all(this.props.card).then((val) => {
            val = this.filter_array(val)
            stuff = val[0].businame + " : " + val[0].position
            this.setState({
                bigstuff: stuff
            })
        })
    }

  visible = 0

  componentWillReceiveProps(nextProps) {
      if(nextProps.location != "" && nextProps.location != undefined)
        this.setState({location: nextProps.location})
    else
        return
  }

  _showModal = () => { this.setState({ isModalVisible: true })}

  _hideModal = () => { this.setState({ isModalVisible: false })}

  _deletecard() {
      cardKey = this.props.card[this.visible].fireKey
      path = firebase.auth().currentUser.uid + "people/" + this.props.imageFireKey + "/card/"
      rootRef.child(path).once().then(val => {
          val.forEach(child => {
              if(child.val().id == cardKey) {
                rootRef.child(path + child.key).remove()
              }
          })
      })
      this.props.card.splice(this.visible, 1)
      this.forceUpdate()
  }

  updateVisible(num) {
      this.visible = num
  }

  render() {

    image = this.props.imagepath

    deletebtn = <View/>
    if(this.props.card.length > 1)
    deletebtn = 
        <TouchableOpacity
        style={styles.button}
        onPress={this._deletecard.bind(this)}>
        <Text style={styles.buttonText}>Delete Card</Text>
    </TouchableOpacity>

    if(this.props.action == "None") {
        return(
            <View style={styles.container}>
                <View style={styles.piccontainer}>
                    <Image
                        source={image}
                        style={styles.image}/>
                </View>
                <View style={styles.textcontainer}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.location}>{this.state.bigstuff}</Text>
                </View>
            </View>
        )
    }

    return(
      <TouchableOpacity
        style={styles.container}
        onPress={this._showModal}>
        <View style={styles.piccontainer}>
          <Image
            source={{uri:this.props.imagepath}}
            style={styles.image}/>
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.location}>{this.props.thisisfrom ? this.state.bigstuff + "\nRecommended by: " + this.props.thisisfrom : this.state.bigstuff}</Text>
        </View>

        <Modal
          onRequestClose={this._hideModal}
          transparent={false}
          visible={this.state.isModalVisible}
          animationType='slide'
          style={{ backgroundColor: 'whitesmoke' }}>
          <View
            behavior={'position'}
            style={{ backgroundColor: 'whitesmoke', flex: 1, justifyContent: 'center'}}>
            <CardSwiper 
                updateVisible={this.updateVisible.bind(this)}
                fromContactsPage={this.props.fromContactsPage}
                recommendation={this.props.recommendation}
                card={this.props.card}
            />
            {deletebtn}
            <TouchableOpacity
              style={styles.button}
              onPress={this._hideModal}>
              <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}

export default PersonCard;
