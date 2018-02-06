import React, { Component } from 'react';
import { View, Text, AppRegistry, TouchableOpacity, Modal, KeyboardAvoidingView, AsyncStorage, Dimensions, Picker, Image, ScrollView, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import store from 'react-native-simple-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Header } from '../components/Header';
import { CardInput } from '../components/CardInput';
import { CardInputSmall } from '../components/CardInputSmall';
import { Container } from '../components/Container';
import { BusinessCard } from '../components/BusinessCard';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker'
import StatusBarAlert from 'react-native-statusbar-alert';

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
    fonts : [
        {
            value: 'Arial'
        },
        {
            value: 'Avenir'
        },
        {
            value: 'Helvetica'
        },  
        {
            value: 'System Font'
        },
    ],
    precity: '',
    city: '',
    prestateabb: '',
    stateabb: '',
    prezip: '',
    prefont: '',
    font: '',
    zip: '',
    preposition: '',
    position: '',
    prename: '',
    name: '',
    prebusiname: '',
    businame: '',
    prephonenum: '',
    phonenum: '',
    preemail: '',
    email: '',
    preaddress: '',
    address: '',
    prewebsite: '',
    website: '',
    cardnum: 1,
    isModalVisible: false,
    color: "rgba(255,255,255,0.3)",
    modalVisible: false,
    recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
    logo: undefined,
    alertVisible: false
}

_showModal = () => { this.setState({ isModalVisible: true }) }
_hideModal = () => { this.setState({ isModalVisible: false }) }
_showColorModal = () => { this.setState({ modalVisible: true }) }

confirmChanges = () => {
    this.setState({
        city: this.state.precity,
        stateabb: this.state.prestateabb,
        zip: this.state.prezip,
        font: this.state.prefont,
        address: this.state.preaddress,
        position: this.state.preposition,
        name: this.state.prename,
        businame: this.state.prebusiname,
        email: this.state.preemail,
        website: this.state.prewebsite,
        phonenum: this.state.prephonenum,
        logo: this.state.logo 
    });
    this._hideModal();
}

saveData = () => {
    let obj = {
        font: this.state.font,
        city: this.state.city,
        stateabb: this.state.stateabb,
        zip: this.state.zip,
        position: this.state.position,
        cardnum: this.state.cardnum,
        website: this.state.website,
        businame: this.state.businame,
        phonenum: this.state.phonenum,
        email: this.state.email,
        name: this.state.name,
        address: this.state.address,
        color: this.state.color,
        logo: this.state.logo,
    }
    store.push('busicards', obj)

    this.makeAlertAppear()
    setTimeout(() => {
        this.makeAlertDisappear()
    }, 2000)

}

/*<View style={{
    borderBottomColor: '#003E5B',
    borderBottomWidth: 4,
    shadowOffset: { width: 0, height:2.8 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1}}/>*/

    changeColor() {
        this.setState({ modalVisible: false })
    }

    constructor(props) {
        super(props)

        this.addLogo = this.addLogo.bind(this);
    }

    makeAlertAppear() {
        this.setState({alertVisible: true})
    }
    makeAlertDisappear() {
        this.setState({alertVisible: false})
    }

    update(key, value) {
        this.setState({[key] : value})
    }

    render() {
        const { navigate } = this.props.navigation;
        const { position, website, businame, phonenum, cardnum, name, email, address, city, stateabb, zip, font } = this.state;
        const { preposition, prewebsite, prebusiname, prephonenum, prename, preemail, preaddress, precity, prestateabb, prezip, prefont } = this.state;
        const { isLoading } = this.props;

        // testing the fucking color overlay shit
        // return (
        //     <Surface width={300} height={200}>
        //         <HueRotate hue={12}>
        //             <View key="pooP">
        //                 <Image
        //                     style={{ width: 256, height: 244 }}
        //                 />
        //             </View>
        //         </HueRotate>
        //     </Surface>
        // )
        /*<CardInput
        name={'title'}
        placeholder={'Large Text'}
        withRef={true}
        ref={(ref) => this.TitleInputRef = ref}
        editable={!isLoading}
        value={this.state.title}
        onChangeText={(value) => this.update(title, value)}
        isEnabled={!isLoading}/>*/

        return (
            <Container>

                <StatusBarAlert
                    visible={this.state.alertVisible}
                    message="Bridge Card Saved!"
                    backgroundColor={$alertSuccess}
                    color="white"
                    height={35}
                    onPress={() => this.props.navigation.navigate('Profile')}
                />

                <Header title={'Business Card'}/>
                <View style={{
                borderBottomColor: '#003E5B',
                borderBottomWidth: 4,
                shadowOffset: { width: 0, height:2.8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1}}/>

                <BusinessCard
                    font={this.state.prefont}
                    cardnum={this.state.cardnum}
                    logo={this.state.logo} 
                    color={this.state.color} 
                    city={this.state.precity} 
                    stateabb={this.state.prestateabb} 
                    zip={this.state.prezip} 
                    position={this.state.preposition} 
                    website={this.state.prewebsite} 
                    businame={this.state.prebusiname} 
                    phonenum={this.state.prephonenum} 
                    name={this.state.prename} 
                    email={this.state.preemail} 
                    address={this.state.preaddress}
                />

                <View style={styles.pickWrapper}>
                <Picker
                    style={styles.picker}
                    mode="dialog"
                    placeholder="Select One"
                    selectedValue={cardnum}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ cardnum: itemValue })
                    }}>
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

                    <KeyboardAwareScrollView extraHeight={150} style={{backgroundColor: 'whitesmoke'}}>

                    <BusinessCard
                        font={this.state.prefont}
                        cardnum={this.state.cardnum}
                        logo={this.state.logo} 
                        color={this.state.color} 
                        city={this.state.precity} 
                        stateabb={this.state.prestateabb} 
                        zip={this.state.prezip} 
                        position={this.state.preposition} 
                        website={this.state.prewebsite} 
                        businame={this.state.prebusiname} 
                        phonenum={this.state.prephonenum} 
                        name={this.state.prename} 
                        email={this.state.preemail} 
                        address={this.state.preaddress}
                    />

                    <CardInput
                        name={'name'}
                        placeholder={'Name'}
                        withRef={true}
                        ref={(ref) => this.NameInputRef = ref}
                        editable={!isLoading}
                        value={this.state.prename}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.PositionInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("prename", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'position'}
                        placeholder={'Position Title'}
                        withRef={true}
                        ref={(ref) => this.PositionInputRef = ref}
                        editable={!isLoading}
                        value={this.state.preposition}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.businameInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("preposition", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'businame'}
                        placeholder={'Business Name'}
                        withRef={true}
                        ref={(ref) => this.businameInputRef = ref}
                        editable={!isLoading}
                        value={this.state.prebusiname}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.PhonenumInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("prebusiname", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'phonenum'}
                        placeholder={'Phone Number'}
                        withRef={true}
                        ref={(ref) => this.PhonenumInputRef = ref}
                        editable={!isLoading}
                        value={this.state.prephonenum}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.EmailInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("prephonenum", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'email'}
                        placeholder={'Email Address'}
                        withRef={true}
                        ref={(ref) => this.EmailInputRef = ref}
                        editable={!isLoading}
                        value={this.state.preemail}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.WebsiteInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("preemail", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'website'}
                        placeholder={'Website'}
                        withRef={true}
                        ref={(ref) => this.WebsiteInputRef = ref}
                        editable={!isLoading}
                        value={this.state.prewebsite}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.AddressInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("prewebsite", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'address'}
                        placeholder={'Street Address'}
                        withRef={true}
                        ref={(ref) => this.AddressInputRef = ref}
                        editable={!isLoading}
                        value={this.state.preaddress}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.CityInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("preaddress", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'city'}
                        placeholder={'City'}
                        withRef={true}
                        ref={(ref) => this.CityInputRef = ref}
                        editable={!isLoading}
                        value={this.state.precity}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.StateInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("precity", value)}
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
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.ZipInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("prestateabb", value)}
                        isEnabled={!isLoading}/>

                        <CardInputSmall
                        name={'zip'}
                        placeholder={'Zip Code'}
                        withRef={true}
                        maxLength={10}
                        ref={(ref) => this.ZipInputRef = ref}
                        editable={!isLoading}
                        value={this.state.prezip}
                        returnKeyType = {"next"}
                        onChangeText={(value) => this.update("prezip", value)}
                        isEnabled={!isLoading}/>

                    </View>

                    <Dropdown
                        onChangeText={(value) => this.update("prefont", value)}
                        value={this.state.prefont}
                        containerStyle={styles.container}
                        style={styles.containerInner}
                        label='Card Font'
                        data={this.state.fonts}
                        textColor={$primaryBlue}
                        selectedItemColor={$primaryBlue}
                    />

                    <View style={styles.buttonRow}>

                        <TouchableOpacity
                        style={styles.button2}
                        onPress={this.addLogo}>
                            <Text style={styles.buttonText}>Add Logo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={styles.button2}
                        onPress={this.confirmChanges}>
                        <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonCancel}
                        onPress={this._hideModal}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </Modal>

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
    container: {
        width: width-20,
        height: width*.16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '$lightGray',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
      },
      containerInner: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        marginLeft: '40%',
        marginRight: '40%',
      },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: width*.3,
        marginRight: width*.3,
        marginTop: 10,
    },
    buttonCancel: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: width*.3,
        marginRight: width*.3,
        marginTop: 10,
        marginBottom: 30,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputRow: {
    flexDirection: 'row',
    justifyContent: 'center'
    },
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
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
