import React from 'react';
import { TextInput, View, TouchableOpacity, Text, Image, Easing, Linking } from 'react-native';
import Hero from 'react-native-hero';
import CardStyle from '../../data/CardTemplates/CardStyle'
import store from 'react-native-simple-store';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-native';
import GLImage from "gl-react-image";
import { HueRotate } from 'gl-react-hue-rotate'
import { Icon } from 'native-base';
var FlipView = require('react-native-citycheck-flip-view');
import FlipCard from 'react-native-flip-card'
import Modal from "react-native-modal";

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
        var cards = await store.get(this.state.storeKey)
        notes = ""
        if (cards!==null){
            if (key !== undefined) {
                notes = cards[key].notes
            }
            else if (this.state.storeKey == "people") {
                notes = cards[this.state.section][this.state.index].card["notes"]
            }
        }
        return notes
    }

    updateWith(props, constructor) {
        storeKey = "busicards"
        if (props.contact === true)
            storeKey = "people"
        logo = {uri: props.logo}
        if (props.name == "Ryan Camardo" && props.city == "Bridge")
            logo = props.logo
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
                    <TouchableOpacity
                        onPress={this._flip}
                        onLongPress={() => {
                            this._landscape()
                        }}
                        style={this.state.style.wrapFront}
                    >
                        <View style={this.state.style.container}>
                            <FlipView
                                front={this._renderFront()}
                                back={this._renderBack()}
                                isFlipped={this.state.isFlipped}
                                flipAxis="y"
                                flipEasing={Easing.out(Easing.ease)}
                                flipDuration={200}
                                perspective={1000}
                            />
                        </View>                    

                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        onSwipe={() => {
                            this._landscape()
                        }}
                        swipeDirection={"down"}
                        isVisible={this.state.isLandscaped}
                        animationType='slide'
                    >
                            <FlipCard 
                                flipHorizontal={true}
                                flipVertical={false}
                                perspective={1000}
                                flip={this.state.isFlipped}
                                clickable={false}
                                style={{borderWidth: 0}}
                            >
                                {/* Face Side */}
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onLongPress={this._landscape}
                                    onPress={this._flip}
                                    style={this.state.style.wrapBack}
                                >
                                    {this._renderFront()}
                                </TouchableOpacity>

                                {/* Back Side */}
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onLongPress={this._landscape}
                                    onPress={this._flip}
                                    style={this.state.style.wrapBack}
                                >
                                    {this._renderBack()}
                                </TouchableOpacity>
                            </FlipCard>
                        
                    </Modal>
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
            <View>
                <View style={this.state.style.backSide}>
                    <Hero style={this.state.style.image}
                        colorOverlay={this.state.color}
                        fullWidth={false}
                        source={require('../../data/CardTemplates/cardBack.png')}
                        renderOverlay={() => (
                            <View style={this.state.style.container}>

                                <View style={{marginTop: 5}}/>

                                {this.state.socialMedia != undefined ? this.mapObject(this.state.socialMedia, function (key, value) {
                                    disabled = false
                                    opacity = 1
                                    if (value == undefined || value == "" || value == "thisisafakeprofiledonotusethisinprod") {
                                        disabled = true
                                        opacity = 0
                                    }
                                    if (key == "instagram")
                                        return (
                                            <View style={{opacity: opacity}} key={key} >
                                                <TouchableOpacity disabled={disabled} style={{width: '8%'}} onPress={() => Linking.openURL("https://www.instagram.com/" + value)}>
                                                    <Icon name='logo-instagram' style={{top: 5, left: 10, fontSize: 36, color: '#bc2a8d'}} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    else if (key == "linkedin")
                                        return (
                                            <View style={{opacity: opacity}} key={key} >
                                                <TouchableOpacity disabled={disabled} style={{width: '8%'}} onPress={() => Linking.openURL("https://www.linkedin.com/in/" + value)}>
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
                                        store.get(this.state.storeKey).then((cards) => {
                                            if (cards!==null){
                                                if(this.state.key !== undefined) {
                                                    cards[this.state.key]["notes"] = text
                                                    store.save(this.state.storeKey, cards)
                                                }
                                                else if (this.state.storeKey == "people") {
                                                    cards[this.state.section][this.state.index].card["notes"] = text
                                                    store.save(this.state.storeKey, cards)
                                                }
                                            }
                                        });
                                    }}
                                    value={this.state.notes}
                                    style={this.state.style.notes}
                                />
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }

    _renderFront = () => {
        return (
            <View>
                <View style={this.state.style.frontSide}>
                    <Hero style={this.state.style.image}
                        colorOverlay={this.state.color}
                        fullWidth={false}
                        source={this.state.image}
                        renderOverlay={() => (
                            <View style={this.state.style.container}>
                                <Image
                                    style={this.state.style.logo}
                                    source={this.state.logo}
                                />
                                <Text style={this.state.style.email}>
                                    <TextInput
                                        editable={this.state.editable}
                                        style={this.state.style.emailInput}
                                        value={this.state.email}
                                    />
                                </Text>
                                <Text style={this.state.style.address}>
                                    <TextInput
                                        editable={this.state.editable}
                                        style={this.state.style.addressInput}
                                        value={this.state.address}
                                    />
                                </Text>
                                <Text style={this.state.style.website}>
                                    <TextInput
                                        editable={this.state.editable}
                                        style={this.state.style.websiteInput}
                                        value={this.state.website}
                                    />
                                </Text>
                                <Text style={this.state.style.phonenum}>
                                    <TextInput
                                        editable={this.state.editable}
                                        style={this.state.style.phonenumInput}
                                        value={this.state.phonenum}
                                    />
                                </Text>
                                <Text style={this.state.style.address2}>
                                    <TextInput
                                        editable={this.state.editable}
                                        style={this.state.style.address2Input}
                                        value={this.state.city + " " + this.state.stateabb + " " + this.state.zip}
                                    />
                                </Text>
                                <Text style={this.state.style.name}>
                                    <TextInput
                                        editable={this.state.editable}
                                        style={this.state.style.nameInput}
                                        value={this.state.name}
                                    />
                                </Text>
                                <Text style={this.state.style.businame}>
                                    <TextInput
                                        editable={this.state.editable}
                                        style={this.state.style.businameInput}
                                        value={this.state.businame}
                                    />
                                </Text>
                                <Text style={this.state.style.title}>
                                    <TextInput
                                        editable={this.state.editable}
                                        style={this.state.style.titleInput}
                                        value={this.state.position}
                                    />
                                </Text>
                            </View>
                        )}
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
                //             style={this.state.style.titleInput}
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