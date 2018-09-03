import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Platform, 
    TouchableOpacity, 
    Modal, 
    KeyboardAvoidingView, 
    AsyncStorage, 
    Dimensions, 
    Picker, 
    Image, 
    ScrollView, 
    StyleSheet,
    Alert,
    Switch,
    ActivityIndicator
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var widthRatio = Platform.OS == "android" ? (1050 / 355) * 1.0009 : (1050 / 355) * 1.0009
var heightRatio =  Platform.OS == "android" ? (600 / 202.35) * 1.14 : (600 / 202.35) * 1.0009
const aspectRatio = height/width;

import { Header } from '../components/Header';
import { CardInput } from '../components/CardInput';
import { CardInputSmall } from '../components/CardInputSmall';
import { Container } from '../components/Container';
import { BusinessCard } from '../components/BusinessCard';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker'
import ImageCropper from 'react-native-image-crop-picker'
import StatusBarAlert from 'react-native-statusbar-alert';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

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

class EcardScreen extends React.Component {

    async getTemplateNames() {
        templates = Array()
        await rootRef.child("templateCards").once().then(val => {
            val.forEach(child => {
                templates.push(child.val().template_name)
            })
        })
        return templates
    }

    componentDidMount() {
        this.getTemplateNames().then(templates => {
            templates.sort()
            this.setState({availableTemplates : templates})
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            // here we are in screen
            // this.forceUpdate()
            console.log("in the ecard screen")
            this.bigbusinesscardbugfix.swiper.sendToBeginning()
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // NOT HERE
        }
    }

state = {
    logoFrame: false,
    availableTemplates : [
        ""
    ],
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
    chosenImageThingy: 0,
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
    cardnum: "Carbon",
    isModalVisible: false,
    color: "rgba(255,255,255,0.3)",
    modalVisible: false,
    recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
    logo: undefined,
    alertVisible: false
}

_showModal = () => { 
    this.setState({ isModalVisible: true }) 
}
_hideModal = () => { 
    this.setState({ isModalVisible: false }) 

    this.bigbusinesscardbugfix.fixSwiper()
    this.forceUpdate()
}
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
        instagram: this.state.preinstagram,
        twitter: this.state.pretwitter,
        linkedin: this.state.prelinkedin,
        logo: this.state.logo 
    });
    this._hideModal();

    this.bigbusinesscardbugfix.fixSwiper()
    this.forceUpdate()
}

    saveData = () => {
        this.bigbusinesscardbugfix.fixSwiper()
        this.bigbusinesscardbugfix.fixSwiper()
        // this.forceUpdate()
        var pathPerson = firebase.auth().currentUser.uid + "person"
        var pathCards = firebase.auth().currentUser.uid + "cards"
        rootRef.child(pathPerson).once().then(val => {
            rootRef.child(pathCards).once().then(val2 => {
                if(val2.val() != null && val.val().level == "Lite" && Object.keys( val2.val() ).length > 0) {
                    Alert.alert("As a free user, you may only have 1 BridgeCard. \n\nUpgrade today!")
                } else {
                    instagram = "thisisafakeprofiledonotusethisinprod"
                    if (this.state.instagram != undefined && this.state.instagram != "")
                        instagram = this.state.instagram
                    linkedin = "thisisafakeprofiledonotusethisinprod"
                        if (this.state.linkedin != undefined && this.state.linkedin != "")
                            linkedin = this.state.linkedin
                    twitter = "thisisafakeprofiledonotusethisinprod"
                        if (this.state.twitter != undefined && this.state.twitter != "")
                            twitter = this.state.twitter
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
                        notes: "",
                        socialMedia: {
                            instagram: instagram,
                            linkedin: linkedin,
                            twitter: twitter
                        },
                        logo: this.state.logo,
                        logoFrame: this.state.logoFrame,
                        chosenImage: this.chosenImage ? this.chosenImage : 0
                    }
    
                    key = rootRef.child(firebase.auth().currentUser.uid + "cards").push(obj).key
                    obj["fireKey"] = key
                    rootRef.child(firebase.auth().currentUser.uid + "cards/" + key).update(obj)
    
                    var d = new Date();
                    obj = {
                        connector: "You",
                        text: "created a new",
                        connectee: "BridgeCard",
                        icon: "md-card",
                        image: "",
                        time: d.toString()
                    }
                    rootRef.child(firebase.auth().currentUser.uid + "activity").push(obj)
    
                    this.makeAlertAppear()
                    setTimeout(() => {
                        this.makeAlertDisappear()
                    }, 3000)
                }
            })
        })

    }

    changeColor() {
        this.setState({ modalVisible: false })
    }

    constructor(props) {
        super(props)
        bigThingy = this
        this.removeLogo = this.removeLogo.bind(this)
        this.addLogo = this.addLogo.bind(this)
        this.loadedCallback = this.loadedCallback.bind(this)
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

    chosenImage = 0
    hackyWorkAround = 0

    swipeableFunc(index) {
        // this.setState({chosenImageThingy : index})
        this.chosenImage = index
    }

    reset() {
        this.setState({
            city: "",
            precity: "",
            stateabb: "",
            prestateabb: "",
            zip: "",
            prezip: "",
            address: "",
            preaddress: "",
            position: "",
            preposition: "",
            name: "",
            prename: "",
            businame: "",
            prebusiname: "",
            email: "",
            preemail: "",
            website: "",
            prewebsite: "",
            phonenum: "",
            prephonenum: "",
            instagram: "",
            preinstagram: "",
            twitter: "",
            pretwitter: "",
            linkedin: "",
            prelinkedin: "",
            logo: undefined
        });
    }

    loadedCallback() {
        console.log("SETTING STATE", this)
        this.setState({loadingCard: false})
    }

    render() {
        const { navigate } = this.props.navigation;
        const { position, website, businame, instagram, twitter, linkedin, phonenum, cardnum, name, email, address, city, stateabb, zip, font } = this.state;
        const { preposition, prewebsite, prebusiname, preinstagram, pretwitter, prelinkedin, prephonenum, prename, preemail, preaddress, precity, prestateabb, prezip, prefont } = this.state;
        const { isLoading } = this.props;

        return (
            <Container>

                <StatusBarAlert
                    visible={this.state.alertVisible}
                    message="BridgeCard Saved!"
                    backgroundColor={$alertSuccess}
                    color="white"
                    height={35}
                    onPress={() => this.props.navigation.navigate('Profile')}
                />

                <Header title={'Create'}/>
                <View style={{
                borderBottomColor: '#003E5B',
                borderBottomWidth: 4,
                shadowOffset: { width: 0, height:2.8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1}}/>

                <View>

                    {this.state.loadingCard ? (
                        <View style={{
                            height: aspectRatio<1.6 ? 171 : 202.35,
                            paddingBottom: 20,
                            marginBottom: 20
                        }}>
                            {/* <ActivityIndicator color="blue" animating={this.state.loadingCard} /> */}
                        </View>
                    ) : (
                        <BusinessCard
                            logoFrame={this.state.logoFrame}
                            createOrEdit={true}
                            loadedCallback={() => this.loadedCallback()}
                            chosenImage={this.chosenImage}
                            ref={ref => this.bigbusinesscardbugfix = ref}
                            key={this.state.cardnum}
                            loadAfter={true}
                            swipeable
                            swipeableFunc={this.swipeableFunc.bind(this)}
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
                            socialMedia={{instagram: this.state.preinstagram, linkedin: this.state.prelinkedin, twitter: this.state.pretwitter}}
                        />
                    )}

                </View>

                <View style={styles.pickWrapper}>
                <Picker
                    ref={(ref) => this.picker = ref}
                    style={styles.picker}
                    mode="dialog"
                    placeholder="Select One"
                    selectedValue={this.state.cardnum}
                    onValueChange={(itemValue, itemIndex) => {
                        // this.hackyWorkAround += 1
                        this.setState({ cardnum: itemValue, loadingCard: true }, () => {
                            setTimeout(() => {
                                this.setState({ loadingCard: false })
                                // this.bigbusinesscardbugfix.fixSwiper()
                            }, 200)
                            // this.bigbusinesscardbugfix.fixSwiper()
                        })
                        // this.chosenImage = 0
                    }}>
                    {this.state.availableTemplates ? this.state.availableTemplates.map((item, index) => {
                        if (typeof item == "string")
                            return (<Picker.Item label={item} value={item} key={index}/>) 
                    }) : <View/>}
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
                        onPress={this.reset.bind(this)}>
                        <Text style={styles.buttonText}>Reset Card</Text>
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

                    <Header title={'Business Card'} back={() => this._hideModal()}/>
                    <View style={{
                        borderBottomColor: '#003E5B',
                        borderBottomWidth: 4,
                        shadowOffset: { width: 0, height:2.8 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1}}/>

                    <KeyboardAwareScrollView extraHeight={150} style={{backgroundColor: 'whitesmoke'}}>

                    <BusinessCard
                        logoFrame={this.state.logoFrame}
                        createOrEdit={false}
                        key={this.state.cardnum * 10}
                        // swipeable={true}
                        // swipeableFunc={this.swipeableFunc.bind(this)}
                        chosenImage={this.chosenImage}
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
                        socialMedia={{instagram: this.state.preinstagram, linkedin: this.state.prelinkedin, twitter: this.state.pretwitter}}
                    />

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
                            this.InstagramInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("prewebsite", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'instagram'}
                        placeholder={'Instagram Username'}
                        withRef={true}
                        ref={(ref) => this.InstagramInputRef = ref}
                        editable={!isLoading}
                        value={this.state.preinstagram}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.TwitterInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("preinstagram", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'twitter'}
                        placeholder={'Twitter Username'}
                        withRef={true}
                        ref={(ref) => this.TwitterInputRef = ref}
                        editable={!isLoading}
                        value={this.state.pretwitter}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.LinkedinInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("pretwitter", value)}
                        isEnabled={!isLoading}/>

                    <CardInput
                        name={'linkedin'}
                        placeholder={'Linkedin Username'}
                        withRef={true}
                        ref={(ref) => this.LinkedinInputRef = ref}
                        editable={!isLoading}
                        value={this.state.prelinkedin}
                        returnKeyType = {"next"}
                        onSubmitEditing={(event) => { 
                            this.AddressInputRef.focus(); 
                        }}
                        onChangeText={(value) => this.update("prelinkedin", value)}
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
                        style={styles.button3}
                        onPress={this.addLogo}>
                        <Text style={styles.buttonText}>Add Logo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={this.state.logo == undefined ? styles.button4 : styles.button3}
                        disabled={this.state.logo == undefined ? true : false}
                        onPress={this.removeLogo}>
                        <Text style={styles.buttonText}>Remove Logo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                        style={styles.button2}
                        onPress={this._hideModal}>
                        <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={styles.button2}
                        onPress={this.confirmChanges}>
                        <Text style={styles.buttonText}>Confirm</Text>
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
                    cropperCircleOverlay: !this.state.logoFrame
                  }).then(image => {
                        based64 = "data:" + image.mime + ";base64," + image.data
                        this.setState({
                            logo: based64
                        });
                        this.forceUpdate()
                });

            }
        })
    }
}

export default withNavigationFocus(EcardScreen, 'Ecard')

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
        marginBottom: 10,
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
