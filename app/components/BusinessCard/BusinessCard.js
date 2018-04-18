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

var {height, width} = Dimensions.get('window');

const available_media = [
    "instagram",
    "linkedin"
]

export default class BusinessCard extends React.Component {

    state = {
        hidden: false,
        style : "",
        image : "",
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
        qr: "qr"
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
        await rootRef.child(firebase.auth().currentUser.uid + storeKey).once().then(val => {
            if (this.state.storeKey == "people") {
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
                    if(this.state.key !== undefined && cardArray[this.state.key]["notes"] != undefined) {
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
        object = {
            cardnum: props.cardnum,
            hidden: false,
            style : this.state.style,
            image : this.state.image,
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
        this.setState(object)
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
                image : cardStyle.image,
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
            this.setState(object)
        })
    }

    _flip = () => {
        this.setState({ isFlipped: !this.state.isFlipped })
    }

    _landscape = () => {
        this.setState({ isLandscaped: !this.state.isLandscaped })
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
                rootRef.child(firebase.auth().currentUser.uid + this.state.storeKey).once().then(val => {
                    if (this.state.storeKey == "people") {
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
                    }) : <View/>}

                    <View
                    style={{
                        bottom: 80,
                        left: 235
                    }}>
                        {
                            this.state.qr ? (
                                <QRCode
                                value={"bridgecard://connectRemote/" + firebase.auth().currentUser.uid + "/card/" + this.state.section}
                                size={100}
                                bgColor={$primaryBlue}
                                fgColor='white'/>
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

    _renderFront = () => {
        return (
            <View style={this.state.style.card}>
                <Image
                    style={this.state.style.image}
                    colorOverlay={this.state.color}
                    source={typeof this.state.image == "number" ? this.state.image : this.state.image != "" ? {uri : this.state.image} : undefined}
                    resizeMode="stretch"
                />
                <Image
                    style={this.state.style.logo}
                    source={this.state.logo != "" ? this.state.logo : undefined}
                />
                <View style={this.state.style.inputs}>
                    <TouchableOpacity 
                    activeOpacity={1}
                    style={this.state.style.addressTouch}>
                        <TextInput
                            editable={this.state.editable}
                            style={this.state.style.addressInput}
                            value={this.state.address}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={() => Linking.openURL("mailto:" + this.state.email)}
                    style={this.state.style.emailTouch}>
                        <TextInput
                            editable={this.state.editable}
                            style={this.state.style.emailInput}
                            value={this.state.email}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={() => Linking.openURL(this.state.website)}
                    style={this.state.style.websiteTouch}>
                        <TextInput
                            editable={this.state.editable}
                            style={this.state.style.websiteInput}
                            value={this.state.website}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={() => Linking.openURL("tel:" + this.state.phonenum)}
                    style={this.state.style.phonenumTouch}>
                        <TextInput
                            editable={this.state.editable}
                            style={this.state.style.phonenumInput}
                            value={this.state.phonenum}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    activeOpacity={1}
                    style={this.state.style.address2Touch}>
                        <TextInput
                            editable={this.state.editable}
                            style={this.state.style.address2Input}
                            value={this.state.city + " " + this.state.stateabb + " " + this.state.zip}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    activeOpacity={1}
                    style={this.state.style.nameTouch}>
                        <TextInput
                            editable={this.state.editable}
                            style={this.state.style.nameInput}
                            value={this.state.name}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    activeOpacity={1}
                    style={this.state.style.businameTouch}>
                        <TextInput
                            editable={this.state.editable}
                            style={this.state.style.businameInput}
                            value={this.state.businame}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>

                     <TouchableOpacity 
                    activeOpacity={1}
                    style={this.state.style.positionTouch}>
                        <TextInput
                            editable={this.state.editable}
                            style={this.state.style.positionInput}
                            value={this.state.position}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}





            // return(
                // <View style={this.state.style.top}>
                //     <Image
                //         style={this.state.style.logo}
                //         source={{uri: this.state.logo }}
                //     />
                //     <Text style={this.state.style.email}>
                //         <TextInput
                //             style={this.state.style.emailInput}
                //             value={this.state.email}
                //         />
                //     </Text>
                //     <Text style={this.state.style.address}>
                //         <TextInput
                //             style={this.state.style.addressInput}
                //             value={this.state.address}
                //         />
                //     </Text>
                //     <Text style={this.state.style.website}>
                //         <TextInput
                //             style={this.state.style.websiteInput}
                //             value={this.state.website}
                //         />
                //     </Text>
                //     <Text style={this.state.style.phonenum}>
                //         <TextInput
                //             style={this.state.style.phonenumInput}
                //             value={this.state.phonenum}
                //         />
                //     </Text>
                //     <Text style={this.state.style.address2}>
                //         <TextInput
                //             style={this.state.style.address2Input}
                //             value={this.state.city + " " + this.state.stateabb + " " + this.state.zip}
                //         />
                //     </Text>
                //     <Text style={this.state.style.name}>
                //         <TextInput
                //             style={this.state.style.nameInput}
                //             value={this.state.name}
                //         />
                //     </Text>
                //     <Text style={this.state.style.businame}>
                //         <TextInput
                //             style={this.state.style.businameInput}
                //             value={this.state.businame}
                //         />
                //     </Text>
                //     <Text style={this.state.style.title}>
                //         <TextInput
                //             style={this.state.style.position}
                //             value={this.state.position}
                //         />
                //     </Text>
                //     <Surface style={{width: '100%', height: '100%'}}>
                //         <HueRotate hue={9}>
                //             <GLImage source={this.state.image} />
                //         </HueRotate>
                //     </Surface>
                // </View>
            // )