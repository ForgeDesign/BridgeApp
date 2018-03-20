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

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

var {height, width} = Dimensions.get('window');

const available_media = [
    "instagram",
    "linkedin"
]

export default class BusinessCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.updateWith(props, true)
        this.getNotes(props.id).done(notes => {
            this.setState({notes: notes})
        })
        let poo = {
            width: (width-20),
            height: ((width-20)*.57),
        }
        poo["pee"] = "poop"
        console.log(poo)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.updateWith(nextProps, false)
            this.getNotes(nextProps.id).done(notes => {
                this.setState({notes: notes})
            })
        }
    }

    async getNotes(key) {
        notes = ""
        await rootRef.child(firebase.auth().currentUser.uid + this.state.storeKey).once().then(val => {
            if (this.state.storeKey == "people") {
                var peopleObj = {}
                val.forEach(child => {
                    peopleObj[child.key] = child.val()
                })
                if(Object.keys(peopleObj).length > 0) {
                    notes = peopleObj[this.state.section][this.state.index].card["notes"]
                    if (/^\s+$/.test(notes))
                        notes = null
                }
            } else {
                var cardArray = []
                val.forEach(child => {
                    cardArray.push(child.val())
                })
                if (cardArray.length > 0) {
                    if(this.state.key !== undefined) {
                        notes = cardArray[this.state.key]["notes"]
                        if (/^\s+$/.test(notes))
                            notes = null
                    }
                }
            }
        })
        return notes
    }

    updateWith(props, constructor) {
        storeKey = "cards"
        if (props.contact === true)
            storeKey = "people"
        logo = {uri: props.logo}
        if (props.founder == true)
            logo = {uri: "data:image/png;base64,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"}
        var cardStyle = new CardStyle().getCardStyle(props.cardnum, props.font)
            object = {
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
            }
        if (constructor)
            return object
        this.setState(object)
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

                    <TextInput
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
                                    peopleObj[this.state.section][this.state.index].card["notes"] = text
                                    rootRef.child(firebase.auth().currentUser.uid + this.state.storeKey).update(peopleObj)
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
                    source={this.state.image}
                    resizeMode="stretch"
                />
                <Image
                    style={this.state.style.logo}
                    source={this.state.logo}
                />
                <View style={this.state.style.inputs}>
                    <TextInput
                        editable={this.state.editable}
                        style={this.state.style.addressInput}
                        value={this.state.address}
                        pointerEvents="none"
                    />
                    <TextInput
                        editable={this.state.editable}
                        style={this.state.style.emailInput}
                        value={this.state.email}
                        pointerEvents="none"
                    />
                    <TextInput
                        editable={this.state.editable}
                        style={this.state.style.websiteInput}
                        value={this.state.website}
                        pointerEvents="none"
                    />
                    <TextInput
                        editable={this.state.editable}
                        style={this.state.style.phonenumInput}
                        value={this.state.phonenum}
                        pointerEvents="none"
                    />
                    <TextInput
                        editable={this.state.editable}
                        style={this.state.style.address2Input}
                        value={this.state.city + " " + this.state.stateabb + " " + this.state.zip}
                        pointerEvents="none"
                    />
                    <TextInput
                        editable={this.state.editable}
                        style={this.state.style.nameInput}
                        value={this.state.name}
                        pointerEvents="none"
                    />
                    <TextInput
                        editable={this.state.editable}
                        style={this.state.style.businameInput}
                        value={this.state.businame}
                        pointerEvents="none"
                    />
                    <TextInput
                        editable={this.state.editable}
                        style={this.state.style.positionInput}
                        value={this.state.position}
                        pointerEvents="none"
                    />
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