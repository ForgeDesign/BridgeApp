import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, AppRegistry, TouchableOpacity, Modal, KeyboardAvoidingView, AsyncStorage, Dimensions, Picker } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import store from 'react-native-simple-store';

import { Header } from '../components/Header';
import { CardInput } from '../components/CardInput';
import { Container } from '../components/Container';
import { CardOnePreview } from '../components/CardOnePreview';
import { CardTwoPreview } from '../components/CardTwoPreview';
import { CardThreePreview } from '../components/CardThreePreview';
import { CardFourPreview } from '../components/CardFourPreview';
import { CardFivePreview } from '../components/CardFivePreview';

const {height, width} = Dimensions.get('window');

export default class EcardScreen extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    title: '',
    tagline: '',
    buisname: '',
    phonenum: '',
    cardnum: 1,
    isModalVisible: false,
  }

  _showModal = () => { this.setState({ isModalVisible: true })
    console.log(width)
  }
  _hideModal = () => { this.setState({ isModalVisible: false })
    console.log(width)
  }

  saveData = () => {
    let obj = {
      cardnum: this.state.cardnum,
      title: this.state.title,
      tagline: this.state.tagline,
      buisname: this.state.buisname,
      phonenum: this.state.phonenum,
    }
    store.push('usercard', obj)
  }

  /*<View style={{
    borderBottomColor: '#003E5B',
    borderBottomWidth: 4,
    shadowOffset: { width: 0, height:2.8 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1}}/>*/

  render() {
    const { navigate } = this.props.navigation;
    const { title, tagline, buisname, phonenum, cardnum } = this.state;
    const { isLoading } = this.props;
    return (
      <Container>

        <Header title={'Business Card'}/>

        { (() => {
          switch(cardnum) {
            case 1:
              return ( <CardOnePreview title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
            case 2:
              return ( <CardTwoPreview title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
            case 3:
              return ( <CardThreePreview title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
            case 4:
              return ( <CardFourPreview title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
            case 5:
              return ( <CardFivePreview title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
          }
        })()}
        <View style={styles.pickWrapper}>
          <Picker
            style={styles.picker}
            mode="dialog"
            placeholder="Select One"
            selectedValue={cardnum}
            onValueChange={(itemValue, itemIndex) => this.setState({ cardnum: itemValue })}>
            <Picker.Item label={"Black and Yellow"} value={1} />
            <Picker.Item label={"Blue and White"} value={2} />
            <Picker.Item label={"Minimalistic"} value={3} />
            <Picker.Item label={"Carbon"} value={4} />
            <Picker.Item label={"Red and White"} value={5} />
          </Picker>
        </View>

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

            <KeyboardAvoidingView
              behavior={'position'}
              style={{ backgroundColor: 'whitesmoke', flex: 1}}>

              <Header title={'Business Card'}/>

              { (() => {
                switch(cardnum) {
                  case 1:
                    return ( <CardOnePreview cardnum={cardnum} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                  case 2:
                    return ( <CardTwoPreview cardnum={cardnum} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                  case 3:
                    return ( <CardThreePreview cardnum={cardnum} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                  case 4:
                    return ( <CardFourPreview cardnum={cardnum} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                  case 5:
                    return ( <CardFivePreview cardnum={cardnum} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                }
              })()}

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
  pickWrapper: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '$lightGray',
  },
  pickWrapperText: {

  },
  picker: {

  }
})
