import React from 'react';

import { View, Text, Image, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { BusinessCard } from '../BusinessCard';

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
            <BusinessCard 
                font={this.props.card.font}
                cardnum={this.props.card.cardnum}
                logo={this.props.card.avatarSource}
                color={this.props.card.color} 
                position={this.props.card.position} 
                website={this.props.card.website} 
                businame={this.props.card.businame} 
                phonenum={this.props.card.phonenum} 
                name={this.props.card.name} 
                email={this.props.card.email} 
                address={this.props.card.address}
                stateabb={this.props.card.stateabb}
                city={this.props.card.city}
                zip={this.props.card.zip}
                socialMedia={this.props.card.socialMedia}
                section={this.props.section}
                index={this.props.index}
                founder={this.props.card.founder}
                contact={true}
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
