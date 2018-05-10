import React from 'react';
import { TextInput, View, TouchableOpacity, Text, Image, Easing, Linking, Platform, Dimensions } from 'react-native';
import Hero from 'react-native-hero';
import CardStyle from '../../data/CardTemplates/CardStyle'
// import { Shaders, Node, GLSL } from 'gl-react';
// import { Surface } from 'gl-react-native';
// import GLImage from "gl-react-image";
// import { HueRotate } from 'gl-react-hue-rotate'
import { Icon } from 'native-base';
import FlipCard from 'react-native-flip-card'
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode';
import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

import Geocoder from 'react-native-geocoder';
import Swiper from 'react-native-swiper';
import openMap from 'react-native-open-maps';
import Orientation from 'react-native-orientation';

var {height, width} = Dimensions.get('window');

const available_media = [
    "instagram",
    "linkedin",
    "twitter"
]

export default class BusinessCard extends React.Component {

    state = {
        loaded: false,
        hidden: false,
        style : "",
        image : [],
        color: "",
        logo: "",
        email: "",
        address:  "",
        website:  "",
        phonenum:  "",
        city:  "",
        name:  "",
        businame:  "",
        position:  "",
        stateabb:  "",
        socialMedia:  "",
        zip:  "",
        storeKey:  "",
        section:  "",
        index:  "",
        key:  "",
        editable: false,
        isFlipped: false,
        isLandscaped: false,
        qr: "qr",
        autoplay: true,
        qrCode: false,
        swipeable: false,
    }

    constructor(props) {
        super(props)
        this.updateWith(props, true)
        this.getNotes(props.id).done(notes => {
            this.setState({notes: notes})
        })        
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            if (this.props.cardnum != nextProps.cardnum)
                this.updateWith(nextProps, false)
            else {
                this.updateNoStyle(nextProps, false)
            }
            this.getNotes(nextProps.id).done(notes => {
                this.setState({notes: notes})
            })
        }
    }

    async getNotes(key) {
        notes = ""
        storeKey = "cards"
        if (this.props.contact)
            storeKey = "people"
        if(this.props.recommendation == false || this.props.recommendation == undefined)
        await rootRef.child(this.props.justImage == "IMAGE" ? firebase.auth().currentUser.uid + storeKey + "/" + this.props.section : firebase.auth().currentUser.uid + storeKey).once().then(val => {
            if (this.props.justImage == "IMAGE") {
                if(val.val() != null && val.val().notes != null)
                    notes = val.val().notes
                if (/^\s+$/.test(notes))
                    notes = null
            }
            else if (this.state.storeKey == "people") {
                var peopleObj = {}
                val.forEach(child => {
                    peopleObj[child.key] = child.val()
                })
                if(Object.keys(peopleObj).length > 0) {
                    var foundPerson
                    var cardIndex
                    for (let index = 0; index < Object.keys(peopleObj).length; index++) {
                        const element = peopleObj[Object.keys(peopleObj)[index]];
                        for (let index2 = 0; index2 < element.card.length; index2++) {
                            const card = element.card[index2];
                            if (card.id == this.state.section) {
                                foundPerson = element
                                cardIndex = index2
                                break
                            }
                        }
                        if(foundPerson)
                            break
                    }
                    notes = foundPerson.card[cardIndex].notes
                    if (/^\s+$/.test(notes))
                        notes = null
                }
            } else {
                var cardArray = []
                val.forEach(child => {
                    cardArray.push(child.val())
                })
                if (cardArray.length > 0) {
                    if(this.state.key !== undefined && cardArray != undefined && cardArray[this.state.key] != undefined && cardArray[this.state.key]["notes"] != undefined) {
                        notes = cardArray[this.state.key]["notes"]
                        if (/^\s+$/.test(notes))
                            notes = null
                    }
                }
            }
        })
        return notes
    }

    updateNoStyle(props, constructor) {
        storeKey = "cards"
        if (props.contact === true)
            storeKey = "people"
        qr = false
        if(storeKey == "cards")
            qr = true
        logo = {uri: props.logo}
        var object
        var skip = false
        if(props.justImage == "IMAGE") {
            object = {
                image : this.state.image,
                style : this.state.style,
                hidden: false,
                image : props.justImageImage,
                storeKey: storeKey,
                section: props.section,
                index: props.index,
                key: props.id,
                editable: false,
                isFlipped: false,
                isLandscaped: false,
            }
        }
        else if(this.props.font == props.font)
        object = {
            cardnum: props.cardnum,
            hidden: false,
            style : this.state.style,
            image : this.state.image,
            chosenImage: props.chosenImage,
            color: props.color,
            logo: logo,
            email: props.email,
            address: props.address,
            website: props.website,
            phonenum: props.phonenum,
            city: props.city,
            name: props.name,
            businame: props.businame,
            position: props.position,
            stateabb: props.stateabb,
            socialMedia: props.socialMedia,
            zip: props.zip,
            storeKey: storeKey,
            section: props.section,
            index: props.index,
            key: props.id,
            editable: false,
            isFlipped: false,
            isLandscaped: false,
            qr: qr
        }
        else {
            skip = true
            this.updateWith(props, false)
        }
        if(Array.isArray(object.image)) {
            console.log("GOT HERE 1")
            if(object.image.length > 1 && props.createOrEdit)
                object.swipeable = true
        }
        if(!skip)
        this.setState(object, () => {
            setTimeout(() => {
                this.setState({loaded : true})
            },350);
        })
    }

    updateWith(props, constructor) {
        storeKey = "cards"
        if (props.contact === true)
            storeKey = "people"
        qr = false
        if(storeKey == "cards")
            qr = true
        logo = {uri: props.logo}
        new CardStyle().getCardStyle(props.cardnum, props.font).then(cardStyle => {
            object = {
                cardnum: props.cardnum,
                hidden: false,
                style : cardStyle.style,
                image : props.justImage ? props.justImageImage : cardStyle.image,
                chosenImage: props.chosenImage,
                color: props.color,
                logo: logo,
                email: props.justImage ? "" : props.email,
                address: props.justImage ? "" : props.address,
                website: props.justImage ? "" : props.website,
                phonenum: props.justImage ? "" : props.phonenum,
                city: props.justImage ? "" : props.city,
                name: props.justImage ? "" : props.name,
                businame: props.justImage ? "" : props.businame,
                position: props.justImage ? "" : props.position,
                stateabb: props.justImage ? "" : props.stateabb,
                socialMedia: props.socialMedia,
                zip: props.justImage ? "" : props.zip,
                storeKey: storeKey,
                section: props.section,
                index: props.index,
                key: props.id,
                editable: false,
                isFlipped: false,
                isLandscaped: false,
                qr: qr
            }
            if(Array.isArray(object.image)) {
                console.log("GOT HERE 2")
                if(object.image.length > 1 && props.createOrEdit)
                    object.swipeable = true
            }
            this.setState(object, () => {
                setTimeout(() => {
                    this.setState({loaded : true})
                },350);
            })
        })
    }

    _flip = () => {
        this.setState({ isFlipped: !this.state.isFlipped })
    }

    _landscape = () => {
        this.setState({ isLandscaped: !this.state.isLandscaped })
        // Orientation.getOrientation((err, orientation) => {
        //     if(orientation == "PORTRAIT")
        //         Orientation.lockToLandscape();
        //     else
        //         Orientation.lockToPortrait();
        // })
    }

    render() {
        if (this.state.hidden==true) {
            return null;
        }
        else {
            return (
                <View>
                    {!this.state.isLandscaped ? (
                    
                    <View style={Platform.OS == "ios" ? {} : this.state.style.androidAdjust}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onLongPress={this._landscape}
                            onPress={this._flip}
                            disabled={this.props.createOrEdit ? true : false}
                        >
                            <View style={this.state.style.normalscaped} >
                                <View style={this.state.style.container}>
                                    <FlipCard 
                                        flipHorizontal={true}
                                        flipVertical={false}
                                        perspective={1000}
                                        flip={this.state.isFlipped}
                                        clickable={false}
                                        style={{borderWidth: 0, width: '100%', height: '100%'}}
                                    >
                                        {/* Face Side */}
                                        {this.isLandscaped ? <View/> : this._renderFront()}

                                        {/* Back Side */}
                                        {this.isLandscaped ? <View/> : this._renderBack()}
                                    </FlipCard>
                                </View>                    
                            </View>
                        </TouchableOpacity>        
                    </View>            
                ) : (

                    <Modal
                        transparent={false}
                        onSwipe={() => {
                            this._landscape()
                        }}
                        style={{width:'100%', height:'100%', padding: 0}}
                        swipeDirection={"down"}
                        isVisible={this.state.isLandscaped}
                        animationType='slide'
                    >
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onLongPress={this._landscape}
                            onPress={this._flip}
                            disabled={this.props.createOrEdit ? true : false}
                            style={{width:'100%', height:'100%', padding: 0}}
                        >
                            <View style={this.state.style.container}>
                                <FlipCard 
                                    flipHorizontal={true}
                                    flipVertical={false}
                                    perspective={1000}
                                    flip={this.state.isFlipped}
                                    clickable={false}
                                    style={Platform.OS == "ios" ? this.state.style.cardLandscapedIos : this.state.style.cardLandscapedAndroid}
                                >
                                    {/* Face Side */}
                                    {this._renderFront()}

                                    {/* Back Side */}
                                    <View style={{transform: [
                                                    { scaleX: -1 }
                                                ]}}>
                                    {this._renderBack()}
                                    </View>
                                </FlipCard>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                )}
                    
                </View>
                
            )
        }
    }

    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });
    }

    _renderBack = () => {
        var notesInput

        notesInput = <TextInput
            editable={true}
            placeholder={"Type all your notes here!"}
            multiline={true}
            maxHeight={150}
            numberOfLines={4}
            onChangeText={(text) => {
                this.setState({notes: text})
                rootRef.child(this.props.justImage == "IMAGE" ? firebase.auth().currentUser.uid + this.state.storeKey + "/" + this.props.section : firebase.auth().currentUser.uid + this.state.storeKey).once().then(val => {
                    if (this.props.justImage == "IMAGE") {
                        obj = val.val()
                        obj.notes = text
                        rootRef.child(firebase.auth().currentUser.uid + this.state.storeKey + "/" + this.props.section).update(obj)
                    }
                    else if (this.state.storeKey == "people") {
                        var peopleObj = {}
                        val.forEach(child => {
                            peopleObj[child.key] = child.val()
                        })
                        if(Object.keys(peopleObj).length > 0) {
                            var foundPerson
                            var foundCard
                            for (let index = 0; index < Object.keys(peopleObj).length; index++) {
                                const element = peopleObj[Object.keys(peopleObj)[index]];
                                for (let index2 = 0; index2 < element.card.length; index2++) {
                                    const card = element.card[index2];
                                    if (card.id == this.state.section) {
                                        foundPerson = Object.keys(peopleObj)[index]
                                        foundCard = index2
                                        break
                                    }
                                }
                                if(foundPerson)
                                    break
                                
                            }
                            peopleObj[foundPerson].card[foundCard].notes = text
                            rootRef.child(firebase.auth().currentUser.uid + this.state.storeKey).update(peopleObj)
                        }
                    } else {
                        var cardArray = []
                        val.forEach(child => {
                            cardArray.push(child.val())
                        })
                        cardArray[this.state.key]["notes"] = text
                        rootRef.child(firebase.auth().currentUser.uid + "cards/" + cardArray[this.state.key]["fireKey"]).update(cardArray[this.state.key])
                    }
                })
            }}
            value={this.state.notes}
            style={this.state.style.notes}
        />

        if(this.props.recommendation == true)
            notesInput = null

        return (
            <View style={this.state.style.cardBack}>
                <View style={this.state.style.container}>
                    <View style={{marginTop: 5, padding: 0}}/>

                    {this.state.socialMedia != undefined ? this.mapObject(this.state.socialMedia, function (key, value) {
                        disabled = false
                        opacity = 1
                        if (value == undefined || value == "" || value == "thisisafakeprofiledonotusethisinprod") {
                            disabled = true
                            opacity = 0
                        }
                        if (key == "instagram")
                            return (
                                <View style={{opacity: opacity, zIndex: 2, backgroundColor: 'transparent'}} key={key} >
                                    <TouchableOpacity disabled={disabled} style={{width: '10%'}} onPress={() => Linking.openURL("https://www.instagram.com/" + value)}>
                                        <Icon name='logo-instagram' style={{top: 5, left: 10, fontSize: 36, color: '#bc2a8d'}} />
                                    </TouchableOpacity>
                                </View>
                            )
                        else if (key == "linkedin")
                            return (
                                <View style={{opacity: opacity, zIndex: 2, backgroundColor: 'transparent'}} key={key} >
                                    <TouchableOpacity disabled={disabled} style={{width: '10%'}} onPress={() => Linking.openURL("https://www.linkedin.com/in/" + value)}>
                                        <Icon name='logo-linkedin' style={{top: 5, left: 10, fontSize: 36, color: '#0077B5'}} />
                                    </TouchableOpacity>
                                </View>
                            )
                        else if (key == "twitter")
                            return (
                                <View style={{opacity: opacity, zIndex: 2, backgroundColor: 'transparent'}} key={key} >
                                    <TouchableOpacity disabled={disabled} style={{width: '10%'}} onPress={() => Linking.openURL("https://www.twitter.com/" + value)}>
                                        <Icon name='logo-twitter' style={{top: 5, left: 10, fontSize: 36, color: '#0077B5'}} />
                                    </TouchableOpacity>
                                </View>
                            )
                    }) : <View/>}

                    <View
                    style={{
                        zIndex: 2000
                    }}>
                        {
                            this.state.qr ? (
                                <TouchableOpacity disabled={false} style={{zIndex: 1999, width: '20%'}} onPress={() => this.setState({qrCode: true})}>
                                    <Modal
                                    transparent={false}
                                    style={{width:'100%', height:'100%', padding: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}
                                    swipeDirection={"down"}
                                    isVisible={this.state.qrCode}
                                    animationType='slide'
                                    >
                                        <View style={{right: 19}}>
                                            <QRCode
                                            value={"bridgecard://connectRemote/" + firebase.auth().currentUser.uid + "/card/" + this.state.section}
                                            size={300}
                                            bgColor={$primaryBlue}
                                            fgColor='white'/>

                                            <TouchableOpacity onPress={() => this.setState({qrCode: false})}>
                                                <TextInput
                                                style={{color: "white", bottom: "2%", fontSize: 40, textAlign: 'center'}}
                                                editable={this.state.editable}
                                                value={"Hide QR"}
                                                pointerEvents="none"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                                    <TextInput
                                    // style={{color: "#003E5B", bottom: 80, left: 235,}}
                                    editable={this.state.editable}
                                    value={"Show QR"}
                                    pointerEvents="none"
                                    />
                                </TouchableOpacity>
                                
                            ) :
                            (
                                <View/>
                            )
                        }
                        
                    </View>

                    {notesInput}
                    
                </View>
            </View>
        )
    }

    unsetAutoplay() {
        this.setState({autoplay: false})
    }

    _renderFront = () => {

        if ( !this.state.loaded )
            return(<View/>)
        else
        return (
            this.state.swipeable ? (
                <Swiper
                loop={true}
                // autoplay={this.props.loadAfter ? this.state.autoplay : false}
                ref={(ref) => this.swiper = ref}
                onIndexChanged={(index) => {
                    this.props.swipeableFunc(index)
                }}
                horizontal={true} 
                index={this.state.chosenImage ? this.state.chosenImage : 0} 
                showsButtons={this.state.image.length > 1 ? true : false} 
                showsPagination={true}
                >
                {this.state.image.map(function(item, i){
                    if(item != null)
                    return (
                    <View style={this.state.style.card} key={i}>
                        <Image
                            style={this.state.style.image}
                            colorOverlay={this.state.color}
                            source={typeof this.state.image == "number" ? this.state.image : this.state.image != "" ? {uri : this.state.image[i]} : undefined}
                            resizeMode="stretch"
                        />
                        <Image
                            style={this.props.logoFrame ? this.state.style.logo1 : this.state.style.logo}
                            source={this.state.logo != "" ? this.state.logo : undefined}
                        />
                        <View style={this.state.style.inputs}>
                            {this.props.justImage == "IMAGE" ? (
                                <View/>
                            ) : (
                                <View>
                                    <TouchableOpacity 
                                    activeOpacity={1}
                                    disabled={ !this.state.isLandscaped }
                                    style={this.state.style.addressTouch}>
                                        <TextInput
                                            placeholderTextColor={"white"}
                                            placeholder={this.props.createOrEdit ? "Address" : ""}
                                            editable={this.state.editable}
                                            style={this.props.createOrEdit && this.state.address == "" ? this.state.style.addressInputPlaceholder : this.state.style.addressInput}
                                            value={this.state.address}
                                            pointerEvents="none"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    onPress={ () => Linking.openURL("mailto:" + this.state.email)}
                                    disabled={ !this.state.isLandscaped }
                                    style={this.state.style.emailTouch}>
                                        <TextInput
                                            placeholderTextColor={"white"}
                                            placeholder={this.props.createOrEdit ? "Email" : ""}
                                            editable={this.state.editable}
                                            style={this.props.createOrEdit && this.state.email == "" ? this.state.style.emailInputPlaceholder : this.state.style.emailInput}
                                            value={this.state.email}
                                            pointerEvents="none"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    onPress={() => Linking.openURL(this.state.website.toLowerCase().includes("http") || this.state.website.toLowerCase().includes("https") ? this.state.website : "http://" + this.state.website)}
                                    disabled={ !this.state.isLandscaped }
                                    style={this.state.style.websiteTouch}>
                                        <TextInput
                                            placeholderTextColor={"white"}
                                            placeholder={this.props.createOrEdit ? "Website" : ""}
                                            editable={this.state.editable}
                                            style={this.props.createOrEdit && this.state.website == "" ? this.state.style.websiteInputPlaceholder : this.state.style.websiteInput}
                                            value={this.state.website}
                                            pointerEvents="none"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    onPress={ () => Linking.openURL("tel:" + this.state.phonenum)}
                                    disabled={ !this.state.isLandscaped }
                                    style={this.state.style.phonenumTouch}>
                                        <TextInput
                                            placeholderTextColor={"white"}
                                            placeholder={this.props.createOrEdit ? "Telephone" : ""}
                                            editable={this.state.editable}
                                            style={this.props.createOrEdit && this.state.phonenum == "" ? this.state.style.phonenumInputPlaceholder : this.state.style.phonenumInput}
                                            value={this.state.phonenum}
                                            pointerEvents="none"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    activeOpacity={1}
                                    disabled={ !this.state.isLandscaped }
                                    style={this.state.style.address2Touch}>
                                        <TextInput
                                            placeholderTextColor={"white"}
                                            placeholder={this.props.createOrEdit ? "City, State, Zipcode" : ""}
                                            editable={this.state.editable}
                                            style={this.props.createOrEdit && this.state.city + this.state.stateabb + this.state.zip == "" ? this.state.style.address2InputPlaceholder : this.state.style.address2Input}
                                            value={this.state.city + " " + this.state.stateabb + " " + this.state.zip}
                                            pointerEvents="none"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    activeOpacity={1}
                                    disabled={ !this.state.isLandscaped }
                                    style={this.state.style.nameTouch}>
                                        <TextInput
                                            placeholderTextColor={"white"}
                                            placeholder={this.props.createOrEdit ? "Name" : ""}
                                            editable={this.state.editable}
                                            style={this.props.createOrEdit && this.state.name == "" ? this.state.style.nameInputPlaceholder : this.state.style.nameInput}
                                            value={this.state.name}
                                            pointerEvents="none"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    activeOpacity={1}
                                    disabled={ !this.state.isLandscaped }
                                    style={this.state.style.businameTouch}>
                                        <TextInput
                                            placeholderTextColor={"white"}
                                            placeholder={this.props.createOrEdit ? "Business" : ""}
                                            editable={this.state.editable}
                                            style={this.props.createOrEdit && this.state.businame == "" ? this.state.style.businameInputPlaceholder : this.state.style.businameInput}
                                            value={this.state.businame}
                                            pointerEvents="none"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    activeOpacity={1}
                                    disabled={ !this.state.isLandscaped }
                                    style={this.state.style.positionTouch}>
                                        <TextInput
                                            placeholderTextColor={"white"}
                                            placeholder={this.props.createOrEdit ? "Position" : ""}
                                            editable={this.state.editable}
                                            style={this.props.createOrEdit && this.state.position == "" ? this.state.style.positionInputPlaceholder : this.state.style.positionInput}
                                            value={this.state.position}
                                            pointerEvents="none"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                    )
                }.bind(this))}
            </Swiper>
            ) : (
                <View style={this.state.style.card}>
                    <Image
                        style={this.state.style.image}
                        colorOverlay={this.state.color}
                        source={typeof this.state.image == "number" ? this.state.image : this.state.image != "" ? {uri : this.props.justImage == "IMAGE" ? this.state.image : this.state.image[this.state.chosenImage]} : undefined}
                        resizeMode="stretch"
                    />
                    <Image
                        style={this.props.logoFrame ? this.state.style.logo1 : this.state.style.logo}
                        source={this.state.logo != "" ? this.state.logo : undefined}
                    />
                    <View style={this.state.style.inputs}>
                        {this.props.justImage == "IMAGE" ? (
                            <View/>
                        ) : (
                            <View>
                                <TouchableOpacity 
                                onPress={() => {
                                    var combined = this.state.address + this.state.city + " " + this.state.stateabb + " " + this.state.zip
                                    Geocoder.geocodeAddress(combined).then(res => {
                                        var latitude = res[0].position.lat
                                        var longitude = res[0].position.lng
                                        openMap({ latitude: latitude, longitude: longitude, name: this.state.businame });
                                        Orientation.lockToLandscape();
                                    })
                                    .catch(err => console.log(err))
                                }}
                                disabled={ !this.state.isLandscaped }
                                style={this.state.style.addressTouch}>
                                    <TextInput
                                        placeholderTextColor={"white"}
                                        placeholder={this.props.createOrEdit ? "Address" : ""}
                                        editable={this.state.editable}
                                        style={this.props.createOrEdit && this.state.address == "" ? this.state.style.addressInputPlaceholder : this.state.style.addressInput}
                                        value={this.state.address}
                                        pointerEvents="none"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={() => Linking.openURL("mailto:" + this.state.email)}
                                disabled={ !this.state.isLandscaped }
                                style={this.state.style.emailTouch}>
                                    <TextInput
                                        placeholderTextColor={"white"}
                                        placeholder={this.props.createOrEdit ? "Email" : ""}
                                        editable={this.state.editable}
                                        style={this.props.createOrEdit && this.state.email == "" ? this.state.style.emailInputPlaceholder : this.state.style.emailInput}
                                        value={this.state.email}
                                        pointerEvents="none"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={() => Linking.openURL(this.state.website.toLowerCase().includes("http") || this.state.website.toLowerCase().includes("https") ? this.state.website : "http://" + this.state.website)}
                                disabled={ !this.state.isLandscaped }
                                style={this.state.style.websiteTouch}>
                                    <TextInput
                                        placeholderTextColor={"white"}
                                        placeholder={this.props.createOrEdit ? "Website" : ""}
                                        editable={this.state.editable}
                                        style={this.props.createOrEdit && this.state.website == "" ? this.state.style.websiteInputPlaceholder : this.state.style.websiteInput}
                                        value={this.state.website}
                                        pointerEvents="none"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={() => Linking.openURL("tel:" + this.state.phonenum)}
                                disabled={ !this.state.isLandscaped }
                                style={this.state.style.phonenumTouch}>
                                    <TextInput
                                        placeholderTextColor={"white"}
                                        placeholder={this.props.createOrEdit ? "Telephone" : ""}
                                        editable={this.state.editable}
                                        style={this.props.createOrEdit && this.state.phonenum == "" ? this.state.style.phonenumInputPlaceholder : this.state.style.phonenumInput}
                                        value={this.state.phonenum}
                                        pointerEvents="none"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={() => {
                                    var combined = this.state.address + this.state.city + " " + this.state.stateabb + " " + this.state.zip
                                    Geocoder.geocodeAddress(combined).then(res => {
                                        var latitude = res[0].position.lat
                                        var longitude = res[0].position.lng
                                        openMap({ latitude: latitude, longitude: longitude, name: this.state.businame });
                                        Orientation.lockToLandscape();
                                    })
                                    .catch(err => console.log(err))
                                }}
                                disabled={ !this.state.isLandscaped }
                                style={this.state.style.address2Touch}>
                                    <TextInput
                                        placeholderTextColor={"white"}
                                        placeholder={this.props.createOrEdit ? "City, State, Zipcode" : ""}
                                        editable={this.state.editable}
                                        style={this.props.createOrEdit && this.state.city + this.state.stateabb + this.state.zip == "" ? this.state.style.address2InputPlaceholder : this.state.style.address2Input}
                                        value={this.state.city + " " + this.state.stateabb + " " + this.state.zip}
                                        pointerEvents="none"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                activeOpacity={1}
                                disabled={ !this.state.isLandscaped }
                                style={this.state.style.nameTouch}>
                                    <TextInput
                                        placeholderTextColor={"white"}
                                        placeholder={this.props.createOrEdit ? "Name" : ""}
                                        editable={this.state.editable}
                                        style={this.props.createOrEdit && this.state.name == "" ? this.state.style.nameInputPlaceholder : this.state.style.nameInput}
                                        value={this.state.name}
                                        pointerEvents="none"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                activeOpacity={1}
                                disabled={ !this.state.isLandscaped }
                                style={this.state.style.businameTouch}>
                                    <TextInput
                                        placeholderTextColor={"white"}
                                        placeholder={this.props.createOrEdit ? "Business" : ""}
                                        editable={this.state.editable}
                                        style={this.props.createOrEdit && this.state.businame == "" ? this.state.style.businameInputPlaceholder : this.state.style.businameInput}
                                        value={this.state.businame}
                                        pointerEvents="none"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                activeOpacity={1}
                                disabled={ !this.state.isLandscaped }
                                style={this.state.style.positionTouch}>
                                    <TextInput
                                        placeholderTextColor={"white"}
                                        placeholder={this.props.createOrEdit ? "Position" : ""}
                                        editable={this.state.editable}
                                        style={this.props.createOrEdit && this.state.position == "" ? this.state.style.positionInputPlaceholder : this.state.style.positionInput}
                                        value={this.state.position}
                                        pointerEvents="none"
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            )
            
        )
    }
}