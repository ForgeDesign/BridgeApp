import React, { Component } from 'react';
import { View, Text, AppRegistry, TouchableOpacity, Modal, KeyboardAvoidingView, AsyncStorage, Dimensions, Picker, Image, ScrollView, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import store from 'react-native-simple-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Header } from '../components/Header';
import { CardInput } from '../components/CardInput';
import { Container } from '../components/Container';
import { CardOnePreview } from '../components/CardOnePreview';
import { CardTwoPreview } from '../components/CardTwoPreview';
import { CardThreePreview } from '../components/CardThreePreview';
import { CardFourPreview } from '../components/CardFourPreview';
import { CardFivePreview } from '../components/CardFivePreview'

import ImagePicker from 'react-native-image-picker'

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

// import GL from 'gl-react'
// import { Surface } from "gl-react-native";
// import { HueRotate } from 'gl-react-hue-rotate'

import {
    SlidersColorPicker,
    HueGradient,
    SaturationGradient,
    LightnessGradient,
    HueSlider,
    SaturationSlider,
    LightnessSlider
} from 'react-native-color';

const {height, width} = Dimensions.get('window');

export default class EcardScreen extends React.Component {

  state = {
    title: '',
    name: '',
    buisname: '',
    phonenum: '',
    email: '',
    address: '',
    website: '',
    cardnum: 1,
    isModalVisible: false,
    color: "rgba(255,255,255,0.3)",
    modalVisible: false,
    recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
    avatarSource: "null"
  }

  _showModal = () => { this.setState({ isModalVisible: true })
    console.log(width)
  }
  _hideModal = () => { this.setState({ isModalVisible: false })
    console.log(width)
  }

  _showColorModal = () => { this.setState({ modalVisible: true })
    console.log(width)
  }

  saveData = () => {
    let obj = {
      cardnum: this.state.cardnum,
      title: this.state.title,
      website: this.state.website,
      buisname: this.state.buisname,
      phonenum: this.state.phonenum,
      email: this.state.email,
      name: this.state.name,
      address: this.state.address,
      color: this.state.color,
      logo: this.state.avatarSource
    }
    store.push('usercard', obj)

    MessageBarManager.showAlert({
        title: 'Saved card!',
        message: 'Your new Bridge Card is now available. Checkout your profile page to view it!',
        alertType: 'info',
        viewTopOffset : 35
        // See Properties section for full customization
        // Or check `index.ios.js` or `index.android.js` for a complete example
    });
  }

  /*<View style={{
    borderBottomColor: '#003E5B',
    borderBottomWidth: 4,
    shadowOffset: { width: 0, height:2.8 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1}}/>*/

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        // Remove the alert located on this master page from the manager
        MessageBarManager.unregisterMessageBar();
    }

    changeColor() {
        this.setState({ modalVisible: false })
    }

    constructor(props) {
        super(props)

        this.addLogo = this.addLogo.bind(this);
    }

  render() {
    const { navigate } = this.props.navigation;
    const { title, website, buisname, phonenum, cardnum, name, email, address } = this.state;
    const { isLoading } = this.props;

    // testing the fucking color overlay shit
    // return (
    //     <Surface width={300} height={200}>
    //         <HueRotate hue={12}>
    //             <View key="pooP">
    //                 <Image
    //                     style={{ width: 256, height: 244 }}
    //                     source={require('../data/CardTemplates/businesscard4.png')}
    //                 />
    //             </View>
    //         </HueRotate>
    //     </Surface>
    // )

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

        { (() => {
          switch(cardnum) {
            case 1:
              return ( <CardOnePreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
            case 2:
              return ( <CardTwoPreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
            case 3:
              return ( <CardThreePreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
            case 4:
              return ( <CardFourPreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
            case 5:
              return ( <CardFivePreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
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

        <SlidersColorPicker
            visible={this.state.modalVisible}
            color={this.state.color}
            returnMode={'rgb'}
            onCancel={() => this.setState({ modalVisible: false })}
            onOk={colorHex => {
              this.setState({
                modalVisible: false,
                color: colorHex
              });
              this.setState({
                recents: [
                  colorHex,
                  ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                ]
              });
            }}
            swatches={this.state.recents}
            swatchesLabel="RECENTS"
            okLabel="Done"
            cancelLabel="Cancel"
        />

        <View style={styles.buttonRow }>
          <TouchableOpacity
            style={styles.button2}
            onPress={this._showModal}>
            <Text style={styles.buttonText}>Edit Content</Text>
          </TouchableOpacity>
            <TouchableOpacity
                style={styles.button2}
                onPress={this._showColorModal}>
                <Text style={styles.buttonText}>Choose Color</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonRow }>
            <TouchableOpacity
                style={styles.button2}
                onPress={this.saveData}>
                <Text style={styles.buttonText}>Save Card</Text>
            </TouchableOpacity>
        </View>

        <Modal
          onRequestClose={this._hideModal}
          transparent={true}
          visible={this.state.isModalVisible}
          animationType='fade'>

              <Header title={'Business Card'}/>
              <View style={{
                borderBottomColor: '#003E5B',
                borderBottomWidth: 4,
                shadowOffset: { width: 0, height:2.8 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1}}/>

              <KeyboardAwareScrollView style={{backgroundColor: 'whitesmoke', marginBottom: 10 }}>

              { (() => {
                switch(cardnum) {
                  case 1:
                    return ( <CardOnePreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                  case 2:
                    return ( <CardTwoPreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                  case 3:
                    return ( <CardThreePreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                  case 4:
                    return ( <CardFourPreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                  case 5:
                    return ( <CardFivePreview logo={this.state.avatarSource} color={this.state.color} title={title} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                }
              })()}

              <CardInput
                name={'title'}
                placeholder={'Large Text'}
                withRef={true}
                ref={(ref) => this.TitleInputRef = ref}
                editable={!isLoading}
                value={this.state.title}
                onChangeText={(value) => this.setState({title: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'name'}
                placeholder={'Name'}
                withRef={true}
                ref={(ref) => this.NameInputRef = ref}
                editable={!isLoading}
                value={this.state.name}
                onChangeText={(value) => this.setState({name: value })}
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

              <CardInput
                name={'email'}
                placeholder={'Email Address'}
                withRef={true}
                ref={(ref) => this.EmailInputRef = ref}
                editable={!isLoading}
                value={this.state.email}
                onChangeText={(value) => this.setState({email: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'website'}
                placeholder={'Website'}
                withRef={true}
                ref={(ref) => this.WebsiteInputRef = ref}
                editable={!isLoading}
                value={this.state.website}
                onChangeText={(value) => this.setState({website: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'address'}
                placeholder={'Buisness Address'}
                withRef={true}
                ref={(ref) => this.AddressInputRef = ref}
                editable={!isLoading}
                value={this.state.Address}
                onChangeText={(value) => this.setState({address: value })}
                isEnabled={!isLoading}/>

              <View style={styles.buttonRow}>

                <TouchableOpacity
                  style={styles.button2}
                  onPress={this.addLogo}>
                    <Text style={styles.buttonText}>Add Logo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button2}
                  onPress={this._hideModal}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAwareScrollView>
          </Modal>

          <MessageBarAlert ref="alert" />

        </Container>
    )
  }

    options = {
        title: 'Select Logo',
        noData: true,
        storageOptions: {
            skipBackup: true,
            path: 'images',
            waitUntilSaved: true
        }
    };

    async addLogo() {
        await ImagePicker.showImagePicker(this.options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                // You can also display the image using data:
                let source = response.uri;

                this.setState({
                    avatarSource: source
                });

            }
        })
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
        marginTop: 3,
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
        marginTop: 3,
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
