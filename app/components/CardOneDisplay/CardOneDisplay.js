import React from 'react';
import Hero from 'react-native-hero';
import { View, TouchableOpacity, Text, Modal, Image } from 'react-native';

import styles from './styles';

class CardOneDisplay extends React.Component {

  state = {
    isModalVisible: false,
    hidden: false
  }

  _showModal = () => { this.setState({ isModalVisible: true })}

  _hideModal = () => { this.setState({ isModalVisible: false })}

  render() {

    if (this.state.hidden==true) {
      return null;
    }

    else {
      return (
        <TouchableOpacity>
          <View style={styles.top}>
              <Hero style={styles.image}
                  colorOverlay={this.props.color}
                  fullWidth={false}
                  source={require('../../data/CardTemplates/businesscard1update.png')}
                  renderOverlay={() => (
                      <View style={styles.container}>
                              <Image
                                  style={styles.logo}
                                  source={{uri: this.props.logo }}
                              />
                              <Text style={styles.email}>{this.props.email}</Text>
                              <Text style={styles.address}>{this.props.address}</Text>
                              <Text style={styles.website}>{this.props.website}</Text>
                              <Text style={styles.phonenum}>{this.props.phonenum}</Text>
                              <Text style={styles.address2}>{this.props.city} {this.props.stateabb} {this.props.zip}</Text>
                              <Text style={styles.name}>{this.props.name}</Text>
                              <Text style={styles.businame}>{this.props.businame}</Text>
                              <Text style={styles.title}>{this.props.position}</Text>
                      </View>
                  )}
              />
          </View>
          <Modal
            onRequestClose={this._hideModal}
            transparent={true}
            visible={this.state.isModalVisible}
            animationType='fade'>

            <View style={styles.modal}>

              <View style={styles.modalView}>

                <View style={styles.buttonRow}>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.setState({ hidden: true })}>
                      <Text style={styles.buttonText}>Delete Card</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={this._hideModal}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.editCard}>
                    <Text style={styles.buttonText}>Edit Card</Text>
                  </TouchableOpacity>

                </View>

              </View>

            </View>

          </Modal>

        </TouchableOpacity>
      )
    }
  }
}

export default CardOneDisplay;
