import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, Modal, KeyboardAvoidingView, Switch, Dimensions, Picker, Image, ScrollView, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from '../components/Header';
import { CardInput } from '../components/CardInput';
import { CardInputSmall } from '../components/CardInputSmall';
import { Container } from '../components/Container';
import { BusinessCard } from '../components/BusinessCard';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker'
import ImageCropper from 'react-native-image-crop-picker';

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

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

export default class EditCardScreen extends React.Component {

    async getTemplateNames() {
        templates = Array()
        await rootRef.child("templateCards").once().then(val => {
            val.forEach(child => {
                templates.push(child.val().template_name)
            })
        })
        return templates
    }

    componentWillMount() {
        this.getTemplateNames().then(templates => {
            this.setState({availableTemplates : templates.sort()})
        })
    }

    constructor(props) {
        super(props)

        this.addLogo = this.addLogo.bind(this);
        this.removeLogo = this.removeLogo.bind(this)
        this.chosenImage = this.props.navigation.state.params.card.item.chosenImage
        this.state = {
            logoFrame: this.props.navigation.state.params.card.item.logoFrame,
            position: this.props.navigation.state.params.card.item.position,
            name: this.props.navigation.state.params.card.item.name,
            businame: this.props.navigation.state.params.card.item.businame,
            phonenum: this.props.navigation.state.params.card.item.phonenum,
            email: this.props.navigation.state.params.card.item.email,
            address: this.props.navigation.state.params.card.item.address,
            website: this.props.navigation.state.params.card.item.website,
            cardnum: this.props.navigation.state.params.card.item.cardnum,
            city: this.props.navigation.state.params.card.item.city,
            stateabb: this.props.navigation.state.params.card.item.stateabb,
            zip: this.props.navigation.state.params.card.item.zip,
            socialMedia: this.props.navigation.state.params.card.item.socialMedia,
            font: this.props.navigation.state.params.card.item.font,
            isModalVisible: false,
            fireKey: this.props.navigation.state.params.card.item.fireKey,
            color: this.props.navigation.state.params.card.item.color,
            modalVisible: false,
            recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
            logo: this.props.navigation.state.params.card.item.logo,
            chosenImageThingy: this.props.navigation.state.params.card.item.chosenImage,
            fonts : [
                {
                    value: 'American Typewriter'
                },
                {
                    value: 'Arial'
                },
                {
                    value: 'Avenir'
                },
                {
                    value: 'Bradley Hand'
                },
                {
                    value: 'Helvetica'
                },  
                {
                    value: 'Kailasa'
                },
                {
                    value: 'Palatino'
                },
                {
                    value: 'Papyrus'
                },
                {
                    value: 'Roboto'
                },
                {
                    value: 'System Font'
                },
                {
                    value: 'Trebuchet MS'
                },
                {
                    value: 'Verdana'
                },
            ],
            availableTemplates : [
                ""
            ],
        }
    }

    _showModal = () => { this.setState({ isModalVisible: true }) }
    _hideModal = () => { this.setState({ isModalVisible: false }) }
    _showColorModal = () => { this.setState({ modalVisible: true }) }

    saveData = () => {
        cards = this.props.navigation.state.params.cards
        cards[this.props.navigation.state.params.card.index] = this.state

        card = cards[this.props.navigation.state.params.card.index]
        key = cards[this.props.navigation.state.params.card.index]["fireKey"]
        card.chosenImage = this.chosenImage
        rootRef.child(firebase.auth().currentUser.uid + "cards/" + key).update(card)

        this.props.navigation.goBack()
    }

    changeColor() {
        this.setState({ modalVisible: false })
    }

    swipeableFunc(index) {
        // this.setState({chosenImageThingy : index})
        this.chosenImage = index
    }

render() {
    const { navigate } = this.props.navigation;
    const { position, socialMedia, website, businame, phonenum, name, email, address, cardnum, city, stateabb, zip, font } = this.state;
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

        <BusinessCard
            logoFrame={this.state.logoFrame}
            createOrEdit={true}
            swipeable={true}
            swipeableFunc={this.swipeableFunc.bind(this)}
            chosenImage={this.state.chosenImageThingy}
            font={this.state.font}
            cardnum={this.state.cardnum}
            logo={this.state.logo} 
            color={this.state.color} 
            city={city} 
            stateabb={stateabb} 
            zip={zip} 
            position={position} 
            website={website} 
            businame={businame} 
            phonenum={phonenum} 
            name={name} 
            email={email}
            socialMedia={socialMedia}
            address={address}
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
            {this.state.availableTemplates.map((item, index) => {
                if (typeof item == "string")
                    return (<Picker.Item label={item} value={item} key={index}/>) 
            })}
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

            <Header title={'Business Card'} back={() => this._hideModal()}/>
            <View style={{
                borderBottomColor: '#003E5B',
                borderBottomWidth: 4,
                shadowOffset: { width: 0, height:2.8 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1}}/>

            <KeyboardAwareScrollView extraHeight={150} style={{backgroundColor: 'whitesmoke' }}>

            <BusinessCard
                logoFrame={this.state.logoFrame}
                createOrEdit={true}
                swipeable={true}
                swipeableFunc={this.swipeableFunc.bind(this)}
                chosenImage={this.props.navigation.state.params.card.item.chosenImage}
                font={this.state.font}
                cardnum={this.state.cardnum}
                logo={this.state.logo} 
                color={this.state.color} 
                city={city} 
                stateabb={stateabb} 
                zip={zip} 
                position={position} 
                website={website} 
                businame={businame} 
                phonenum={phonenum} 
                name={name} 
                email={email} 
                socialMedia={socialMedia}
                address={address}
            />

            <Dropdown
                onChangeText={(value) => {
                    this.setState({font: value})
                }}
                value={this.state.prefont}
                containerStyle={styles.container}
                style={styles.containerInner}
                label='Card Font'
                data={this.state.fonts}
                textColor={$primaryBlue}
                selectedItemColor={$primaryBlue}
            />

            <CardInput
                name={'name'}
                placeholder={'Name'}
                withRef={true}
                ref={(ref) => this.NameInputRef = ref}
                editable={!isLoading}
                value={this.state.name}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                    this.PositionInputRef.focus(); 
                }}
                onChangeText={(value) => this.setState({name: value })}
                isEnabled={!isLoading}/>

            <CardInput
                name={'position'}
                placeholder={'Position Title'}
                withRef={true}
                ref={(ref) => this.PositionInputRef = ref}
                editable={!isLoading}
                value={this.state.position}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                    this.businameInputRef.focus(); 
                }}
                onChangeText={(value) => this.setState({position: value })}
                isEnabled={!isLoading}/>

            <CardInput
                name={'businame'}
                placeholder={'Business Name'}
                withRef={true}
                ref={(ref) => this.businameInputRef = ref}
                editable={!isLoading}
                value={this.state.businame}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                    this.PhonenumInputRef.focus(); 
                }}
                onChangeText={(value) => this.setState({businame: value })}
                isEnabled={!isLoading}/>

            <CardInput
                name={'phonenum'}
                placeholder={'Phone Number'}
                withRef={true}
                ref={(ref) => this.PhonenumInputRef = ref}
                editable={!isLoading}
                value={this.state.phonenum}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                    this.EmailInputRef.focus(); 
                }}
                onChangeText={(value) => this.setState({phonenum: value })}
                isEnabled={!isLoading}/>

            <CardInput
                name={'email'}
                placeholder={'Email Address'}
                withRef={true}
                ref={(ref) => this.EmailInputRef = ref}
                editable={!isLoading}
                value={this.state.email}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                    this.WebsiteInputRef.focus(); 
                }}
                onChangeText={(value) => this.setState({email: value })}
                isEnabled={!isLoading}/>

            <CardInput
                name={'website'}
                placeholder={'Website'}
                withRef={true}
                ref={(ref) => this.WebsiteInputRef = ref}
                editable={!isLoading}
                value={this.state.website}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                    this.TwitterInputRef.focus(); 
                }}
                onChangeText={(value) => this.setState({website: value })}
                isEnabled={!isLoading}/>

                <CardInput
                    name={'twitter'}
                    placeholder={'Twitter Username'}
                    withRef={true}
                    ref={(ref) => this.TwitterInputRef = ref}
                    editable={!isLoading}
                    value={this.state.socialMedia.twitter == "thisisafakeprofiledonotusethisinprod" ? "" : this.state.socialMedia.twitter}
                    returnKeyType = {"next"}
                    onSubmitEditing={(event) => { 
                        this.InstagramInputRef.focus(); 
                    }}
                    onChangeText={(value) => this.setState(prevState => ({
                        socialMedia: {
                            ...prevState.socialMedia,
                            twitter: value
                        }
                    }))}
                    isEnabled={!isLoading}/>

                <CardInput
                    name={'instagram'}
                    placeholder={'Instagram Username'}
                    withRef={true}
                    ref={(ref) => this.InstagramInputRef = ref}
                    editable={!isLoading}
                    value={this.state.socialMedia.instagram == "thisisafakeprofiledonotusethisinprod" ? "" : this.state.socialMedia.instagram}
                    returnKeyType = {"next"}
                    onSubmitEditing={(event) => { 
                        this.LinkedinInputRef.focus(); 
                    }}
                    onChangeText={(value) => this.setState(prevState => ({
                        socialMedia: {
                            ...prevState.socialMedia,
                            instagram: value
                        }
                    }))}
                    isEnabled={!isLoading}/>

                <CardInput
                    name={'linkedin'}
                    placeholder={'Linkedin Username'}
                    withRef={true}
                    ref={(ref) => this.LinkedinInputRef = ref}
                    editable={!isLoading}
                    value={this.state.socialMedia.linkedin == "thisisafakeprofiledonotusethisinprod" ? "" : this.state.socialMedia.linkedin}
                    returnKeyType = {"next"}
                    onSubmitEditing={(event) => { 
                        this.AddressInputRef.focus(); 
                    }}
                    onChangeText={(value) => this.setState(prevState => ({
                        socialMedia: {
                            ...prevState.socialMedia,
                            linkedin: value
                        }
                    }))}
                    isEnabled={!isLoading}/>

            <CardInput
                name={'address'}
                placeholder={'Business Address'}
                withRef={true}
                ref={(ref) => this.AddressInputRef = ref}
                editable={!isLoading}
                value={this.state.address}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                    this.CityInputRef.focus(); 
                }}
                onChangeText={(value) => this.setState({address: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'city'}
                placeholder={'City'}
                withRef={true}
                ref={(ref) => this.CityInputRef = ref}
                editable={!isLoading}
                value={this.state.city}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                    this.StateInputRef.focus(); 
                }}
                onChangeText={(value) => this.setState({city: value })}
                isEnabled={!isLoading}/>

                <View style={styles.inputRow}>

                    <CardInputSmall
                    name={'stateabb'}
                    placeholder={'State'}
                    withRef={true}
                    ref={(ref) => this.StateInputRef = ref}
                    editable={!isLoading}
                    value={this.state.stateabb}
                    returnKeyType = {"next"}
                    onSubmitEditing={(event) => { 
                        this.ZipInputRef.focus(); 
                    }}
                    maxLength={2}
                    onChangeText={(value) => this.setState({stateabb: value })}
                    isEnabled={!isLoading}/>

                    <CardInputSmall
                    name={'zip'}
                    placeholder={'Zip Code'}
                    withRef={true}
                    maxLength={10}
                    ref={(ref) => this.ZipInputRef = ref}
                    editable={!isLoading}
                    value={this.state.zip}
                    onChangeText={(value) => this.setState({zip: value })}
                    isEnabled={!isLoading}/>

                </View>

                <View
                    style={{width:'100%', padding: 0, marginTop: 10, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection:'row',}}>
                        <Text style={{flexDirection:'column', marginRight: 10}}>Circle Logo</Text>
                        <Switch
                        style={{flexDirection:'column'}}
                        onTintColor={"#003E5B"}
                        onValueChange={() => {
                            this.setState({logoFrame: !this.state.logoFrame})
                        }}
                        value={this.state.logoFrame}
                        />
                        <Text style={{flexDirection:'column', marginLeft: 10}}>Square Logo</Text>
                    </View>

                <View style={styles.buttonRow}>
                        <TouchableOpacity
                        style={styles.button4}
                        onPress={this.addLogo}>
                        <Text style={styles.buttonText}>Add Logo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={this.state.logo == undefined ? styles.button5 : styles.button4}
                        disabled={this.state.logo == undefined ? true : false}
                        onPress={this.removeLogo}>
                        <Text style={styles.buttonText}>Remove Logo</Text>
                        </TouchableOpacity>
                    </View>

            <View style={styles.buttonRow}>

                <TouchableOpacity
                style={styles.button123}
                onPress={this._hideModal}>
                <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>
        </Modal>

        </Container>
    )
}

    options = {
        title: 'Select Logo',
        noData: false,
        includeBase64: true,
    };

    removeLogo() {
        this.setState({logo: undefined})
    }

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
                let source = response.uri;
                ImageCropper.openCropper({
                    compressImageQuality: 1.0,
                    includeBase64: true,
                    path: source,
                    width: 400,
                    height: 400,
                    cropperCircleOverlay: true
                  }).then(image => {
                        based64 = "data:" + image.mime + ";base64," + image.data
                        this.setState({
                            logo: based64
                        });
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
        marginTop: 3,
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
    button123: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 10
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
        marginBottom: 10,
    },
    button3: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    button4: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    button5: {
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
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
        height: Platform.OS == "android" ? 50 : 180
    }
})
