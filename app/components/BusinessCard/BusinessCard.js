import React from 'react';
import { View, TouchableOpacity, Text, Modal, Image } from 'react-native';
import Hero from 'react-native-hero';

const cardStyles = {
    card1: {
        style: require("../../data/CardTemplates/card1style"),
        image: require('../../data/CardTemplates/card1.png')
    },
    card2: {
        style: require("../../data/CardTemplates/card2style"),
        image: require('../../data/CardTemplates/card2.png')
    },
    card3: {
        style: require("../../data/CardTemplates/card3style"),
        image: require('../../data/CardTemplates/card3.png')
    },
    card4: {
        style: require("../../data/CardTemplates/card4style"),
        image: require('../../data/CardTemplates/card4.png')
    },
    card5: {
        style: require("../../data/CardTemplates/card5style"),
        image: require('../../data/CardTemplates/card5.png')
    }
}

export default class BusinessCard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            hidden: false,
            style : cardStyles["card" + props.cardnum].style.default,
            image : cardStyles["card" + props.cardnum].image,
            color: props.color,
            logo: props.logo,
            email: props.email,
            address: props.address,
            website: props.website,
            phonenum: props.phonenum,
            city: props.city,
            name: props.name,
            businame: props.businame,
            position: props.position,
            stateabb: props.stateabb,
            zip: props.zip
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.setState({
                style : cardStyles["card" + nextProps.cardnum].style.default,
                image : cardStyles["card" + nextProps.cardnum].image,
                color: nextProps.color,
                logo: nextProps.logo,
                email: nextProps.email,
                address: nextProps.address,
                website: nextProps.website,
                phonenum: nextProps.phonenum,
                city: nextProps.city,
                name: nextProps.name,
                businame: nextProps.businame,
                position: nextProps.position,
                stateabb: nextProps.stateabb,
                zip: nextProps.zip
            })
        }
    }

    render() {
        if (this.state.hidden==true) {
            return null;
        }
        else {
            return (
                <View>
                    <View style={this.state.style.top}>
                        <Hero style={this.state.style.image}
                            colorOverlay={this.state.color}
                            fullWidth={false}
                            source={this.state.image}
                            renderOverlay={() => (
                                <View style={this.state.style.container}>
                                    <Image
                                        style={this.state.style.logo}
                                        source={{uri: this.state.logo }}
                                    />
                                    <Text style={this.state.style.email}>{this.state.email}</Text>
                                    <Text style={this.state.style.address}>{this.state.address}</Text>
                                    <Text style={this.state.style.website}>{this.state.website}</Text>
                                    <Text style={this.state.style.phonenum}>{this.state.phonenum}</Text>
                                    <Text style={this.state.style.address2}>{this.state.city} {this.state.stateabb} {this.state.zip}</Text>
                                    <Text style={this.state.style.name}>{this.state.name}</Text>
                                    <Text style={this.state.style.businame}>{this.state.businame}</Text>
                                    <Text style={this.state.style.title}>{this.state.position}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            )
        }
    }
}