import React, { Component } from 'react';
import { View, Text, AppRegistry, TouchableOpacity, Modal, KeyboardAvoidingView, AsyncStorage, Dimensions, Picker, Image, ScrollView, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
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

export default class EditCardScreen extends React.Component {

    constructor(props) {
        super(props)

        console.log(props)

        this.addLogo = this.addLogo.bind(this);
        this.state = {
            position: this.props.navigation.state.params.card.item.position,
            name: this.props.navigation.state.params.card.item.name,
            buisname: this.props.navigation.state.params.card.item.buisname,
            phonenum: this.props.navigation.state.params.card.item.phonenum,
            email: this.props.navigation.state.params.card.item.email,
            address: this.props.navigation.state.params.card.item.address,
            website: this.props.navigation.state.params.card.item.website,
            cardnum: this.props.navigation.state.params.card.item.cardnum,
            city: this.props.navigation.state.params.card.item.city,
            stateabb: this.props.navigation.state.params.card.item.stateabb,
            zip: this.props.navigation.state.params.card.item.zip,
            isModalVisible: false,
            color: this.props.navigation.state.params.card.item.color,
            modalVisible: false,
            recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
            logo: this.props.navigation.state.params.card.item.logo,
        }
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
        cards = this.props.navigation.state.params.cards
        cards[this.props.navigation.state.params.card.index] = this.state
        AsyncStorage.setItem('buiscards', JSON.stringify(cards))

        MessageBarManager.showAlert({
            title: 'Saved card!',
            message: 'Your new Bridge Card is now available. Checkout your profile page to view it!',
            alertType: 'info',
            viewTopOffset : 35
            // See Properties section for full customization
            // Or check `index.ios.js` or `index.android.js` for a complete example
        });

        console.log(this.state)

        this.props.navigation.goBack()
    }

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

render() {
    const { navigate } = this.props.navigation;
    const { position, website, buisname, phonenum, name, email, address, cardnum, city, stateabb, zip } = this.state;
    const { isLoading } = this.props;

    return (
    <Container>

        <Header title={'Edit Card'}/>
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
            return ( <CardOnePreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
            case 2:
            return ( <CardTwoPreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
            case 3:
            return ( <CardThreePreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
            case 4:
            return ( <CardFourPreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
            case 5:
            return ( <CardFivePreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
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
                onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
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
                    return ( <CardOnePreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                case 2:
                    return ( <CardTwoPreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                case 3:
                    return ( <CardThreePreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                case 4:
                    return ( <CardFourPreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                case 5:
                    return ( <CardFivePreview logo={this.state.logo} color={this.state.color} city={city} stateabb={stateabb} zip={zip} position={position} website={website} buisname={buisname} phonenum={phonenum} name={name} email={email} address={address}/> );
                }
            })()}



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
                name={'position'}
                placeholder={'Position Title'}
                withRef={true}
                ref={(ref) => this.PositionInputRef = ref}
                editable={!isLoading}
                value={this.state.position}
                onChangeText={(value) => this.setState({position: value })}
                isEnabled={!isLoading}/>

            <CardInput
                name={'buisname'}
                placeholder={'Business Name'}
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
                placeholder={'Business Address'}
                withRef={true}
                ref={(ref) => this.AddressInputRef = ref}
                editable={!isLoading}
                value={this.state.address}
                onChangeText={(value) => this.setState({address: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'city'}
                placeholder={'City'}
                withRef={true}
                ref={(ref) => this.CityInputRef = ref}
                editable={!isLoading}
                value={this.state.precity}
                onChangeText={(value) => this.setState({precity: value })}
                isEnabled={!isLoading}/>

              <View style={styles.inputRow}>

                <CardInputSmall
                  name={'stateabb'}
                  placeholder={'State'}
                  withRef={true}
                  ref={(ref) => this.StateInputRef = ref}
                  editable={!isLoading}
                  value={this.state.prestateabb}
                  maxLength={2}
                  onChangeText={(value) => this.setState({prestateabb: value })}
                  isEnabled={!isLoading}/>

                <CardInputSmall
                  name={'zip'}
                  placeholder={'Zip Code'}
                  withRef={true}
                  maxLength={10}
                  ref={(ref) => this.ZipInputRef = ref}
                  editable={!isLoading}
                  value={this.state.prezip}
                  onChangeText={(value) => this.setState({prezip: value })}
                  isEnabled={!isLoading}/>

              </View>

            <View style={styles.buttonRow}>

                <TouchableOpacity
                style={styles.button2}
                onPress={this.addLogo}>
                    <Text style={styles.buttonText}>Add Logo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button2}
                onPress={this._hideModal}>
                <Text style={styles.buttonText}>Done</Text>
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
                    logo: source
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
        marginTop: 5,
        marginBottom:  5,
    },
    inputRow: {
      flexDirection: 'row',
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
