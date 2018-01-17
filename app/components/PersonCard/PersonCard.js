import React from 'react';

import { View, Text, Image, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { CardOnePreview } from '../CardOnePreview';
import { CardTwoPreview } from '../CardTwoPreview';
import { CardThreePreview } from '../CardThreePreview';
import { CardFourPreview } from '../CardFourPreview';
import { CardFivePreview } from '../CardFivePreview';

class PersonCard extends React.Component {

  state = {
    isModalVisible: false,
    hidden: false
  }

  _showModal = () => { this.setState({ isModalVisible: true })}

  _hideModal = () => { this.setState({ isModalVisible: false })}

  render() {

    if(this.props.action == "None") {
        return(
            <View style={styles.container}>
                <View style={styles.piccontainer}>
                    <Image
                        source={this.props.imagepath}
                        style={styles.image}/>
                </View>
                <View style={styles.textcontainer}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.location}>{this.props.location}</Text>
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
            source={this.props.imagepath}
            style={styles.image}/>
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.location}>{this.props.location}</Text>
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
            { (() => {
              switch(this.props.card.cardnum) {
                case 1:
                  return ( <CardOnePreview logo={this.props.card.avatarSource} color={this.props.card.color} position={this.props.card.position} website={this.props.card.website} buisname={this.props.card.buisname} phonenum={this.props.card.phonenum} name={this.props.card.name} email={this.props.card.email} address={this.props.card.address}/> );
                case 2:
                  return ( <CardTwoPreview logo={this.props.card.avatarSource} color={this.props.card.color} position={this.props.card.position} website={this.props.card.website} buisname={this.props.card.buisname} phonenum={this.props.card.phonenum} name={this.props.card.name} email={this.props.card.email} address={this.props.card.address}/> );
                case 3:
                  return ( <CardThreePreview logo={this.props.card.avatarSource} color={this.props.card.color} position={this.props.card.position} website={this.props.card.website} buisname={this.props.card.buisname} phonenum={this.props.card.phonenum} name={this.props.card.name} email={this.props.card.email} address={this.props.card.address}/> );
                case 4:
                  return ( <CardFourPreview logo={this.props.card.avatarSource} color={this.props.card.color} position={this.props.card.position} website={this.props.card.website} buisname={this.props.card.buisname} phonenum={this.props.card.phonenum} name={this.props.card.name} email={this.props.card.email} address={this.props.card.address}/> );
                case 5:
                  return ( <CardFivePreview logo={this.props.card.avatarSource} color={this.props.card.color} position={this.props.card.position} website={this.props.card.website} buisname={this.props.card.buisname} phonenum={this.props.card.phonenum} name={this.props.card.name} email={this.props.card.email} address={this.props.card.address}/> );
              }
            })()}
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
