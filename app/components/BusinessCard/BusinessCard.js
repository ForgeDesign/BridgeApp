import React from 'react';
import { View, TouchableOpacity, Text, Modal, Image } from 'react-native';
import Hero from 'react-native-hero';
import CardStyle from '../../data/CardTemplates/CardStyle'

import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-native';
import GLImage from "gl-react-image";
import { HueRotate } from 'gl-react-hue-rotate'

export default class BusinessCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.updateWith(props, true)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.updateWith(nextProps, false)
        }
    }

    updateWith(props, constructor) {
        var cardStyle = new CardStyle().getCardStyle(props.cardnum, props.font)
        object = {
            hidden: false,
            style : cardStyle.style,
            image : cardStyle.image,
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
        if (constructor)
            return object
        this.setState(object)
    }

    render() {
        if (this.state.hidden==true) {
            return null;
        }
        else {
            return(
                <View style={this.state.style.top}>
                    <Surface style={{width: '100%', height: '100%'}}>
                        <HueRotate style={this.state.style.image} hue={4}>
                            <GLImage style={this.state.style.image} source={this.state.image} />
                        </HueRotate>
                    </Surface>
                </View>
            )
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