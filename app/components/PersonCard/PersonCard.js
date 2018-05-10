import React from 'react';

import { View, Text, Image, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { CardSwiper } from '../CardSwiper';

class PersonCard extends React.Component {

  state = {
    isModalVisible: false,
    hidden: false,
    bigstuff: ""
  }

  // abortions are not okay

  constructor(props) {
      super(props)
      Promise.all(props.card).then((val) => {
          console.log(val[0])
          
      })
    //   this.state.location = props.location
      if(props.card[0] && props.card[0].businame != undefined && props.card[0].position != undefined) {
        this.state.location = JSON.parse(JSON.stringify(props.card[0].businame)) + " : " + JSON.parse(JSON.stringify(props.card[0].position))
      }
  }

  componentWillMount() {
      this.updateName()
  }

  async updateName() {
    await Promise.all(this.props.card).then((val) => {
        stuff = val[0].businame + " : " + val[0].position
        this.setState({
            bigstuff: stuff
        })
      }
     )
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.location != "" && nextProps.location != undefined)
        this.setState({location: nextProps.location})
    else
        return
  }

  _showModal = () => { this.setState({ isModalVisible: true })}

  _hideModal = () => { this.setState({ isModalVisible: false })}

  render() {

    image = this.props.imagepath

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
          <Text style={styles.location}>{this.state.bigstuff}</Text>
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
                recommendation={this.props.recommendation}
                card={this.props.card}
            />
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
