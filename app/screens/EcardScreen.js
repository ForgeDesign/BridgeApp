import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, AppRegistry, TouchableOpacity, Modal, KeyboardAvoidingView, AsyncStorage, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import store from 'react-native-simple-store';

import { Header } from '../components/Header';
import { HeaderSmall } from '../components/HeaderSmall';
import { CardInput } from '../components/CardInput';
import { Container } from '../components/Container';
import { CardPreview } from '../components/CardPreview';
import { ImageCycler } from '../components/ImageCycler';

var {height, width} = Dimensions.get('window');

export default class EcardScreen extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    title: '',
    tagline: '',
    buisname: '',
    phonenum: '',
    isModalVisible: false,
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  saveData = () => {
    let obj = {
      title: this.state.title,
      tagline: this.state.tagline,
      buisname: this.state.buisname,
      phonenum: this.state.phonenum
    }
    store.push('usercards', obj)
  }

  render() {
    const { navigate } = this.props.navigation;
    const { title, tagline, buisname, phonenum} = this.state;
    const { isLoading } = this.props;
    return (
      <Container>

        <Header title={'Business Card'}/>
        <View style={{
          borderBottomColor: '#003E5B',
          borderBottomWidth: 4,
          shadowOffset: { width: 0, height:2.8 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1}}/>
        <ImageCycler
        style={{overflow: 'hidden'}}
          /* title={title}
          tagline={tagline}
          buisname={buisname}
          phonenum={phonenum}
          *//> 

        <View style={styles.buttonRow }>
          <TouchableOpacity
            style={styles.button2}
            onPress={this._showModal}>
            <Text style={styles.buttonText}>Edit Texts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={this.saveData}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <Modal
          onRequestClose={this._hideModal}
          transparent={true}
          visible={this.state.isModalVisible}>

          <Container>
            <KeyboardAvoidingView
              behavior={'position'}
              style={{ flex: 1 }}>
              <HeaderSmall title={'Business Card'}/>
              <View style={{
              borderBottomColor: '#003E5B',
              borderBottomWidth: 4,
              shadowOffset: { width: 0, height:2.8 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1}}/>

              <ImageCycler
                title={title}
                tagline={tagline}
                buisname={buisname}
                phonenum={phonenum}/>

              <CardInput
                name={'title'}
                placeholder={'Title'}
                withRef={true}
                ref={(ref) => this.TitleInputRef = ref}
                editable={!isLoading}
                value={this.state.title}
                onChangeText={(value) => this.setState({title: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'tagline'}
                placeholder={'Tagline'}
                withRef={true}
                ref={(ref) => this.TaglineInputRef = ref}
                editable={!isLoading}
                value={this.state.tagline}
                onChangeText={(value) => this.setState({tagline: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'buisname'}
                placeholder={'Buisness Name'}
                withRef={true}
                ref={(ref) => this.BuisnameInputRef = ref}
                editable={!isLoading}
                value={this.state.buisname}
                onChangeText={(value) => this.setState({buisname: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'phonenum'}
                placeholder={'Phone Number'}
                withRef={true}
                ref={(ref) => this.PhonenumInputRef = ref}
                editable={!isLoading}
                value={this.state.phonenum}
                onChangeText={(value) => this.setState({phonenum: value })}
                isEnabled={!isLoading}/>



              <TouchableOpacity
                style={styles.button}
                onPress={this._hideModal}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Container>

        </Modal>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width*.4,
    height: width*.12,
    backgroundColor: '$primaryBlue',
    borderRadius: 5,
    marginLeft: width*.3,
    marginRight: width*.3,
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width*.4,
    height: width*.12,
    backgroundColor: '$primaryBlue',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
})
