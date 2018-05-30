import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import ButtonWithDescription from './ButtonWithDescription';
import ConnectButtonWithDescription from './ConnectButtonWithDescription';
import ProfilePictureAndLevel from './ProfilePictureAndLevel';
import BigTextAndLowerText from './BigTextAndLowerText';
import Prompt from 'rn-prompt';

import { Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window'); 
const aspectRatio = height/width;

// if(aspectRatio>1.6) {

//    // Code for Iphone

// }
// else {

//    // Code for Ipad

// }

import firebase from 'react-native-firebase';
const rootRef = firebase.database().ref();

import Moment from 'moment';

export default class ProfileHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileName: 'Tap to add name',
            promptVisible: false,
            cardCount: 0,
            cardConnectCount: 0,
            time: ""
        };
        timestamp = firebase.auth().currentUser.metadata.creationTime
        Moment.locale('en');
        formatted = Moment(timestamp).format('MM / D / YY')
        this.state.time = formatted
    }

    componentWillMount() {
        value = firebase.auth().currentUser.displayName
        if (value !== null) {
            this.setState({ profileName: value });
        }
        else {
            this.setState({ profileName: 'Tap to add name' })
        }

        var pathPerson = firebase.auth().currentUser.uid + "person"
        rootRef.child(pathPerson).once().then(val => {
            var person = val._value
            if (person == null) {
                obj = JSON.parse(JSON.stringify( firebase.auth().currentUser._user ))
                obj.level = "Lite"
                delete obj.refreshToken
                delete obj.providerId
                delete obj.providerData
                delete obj.uid
                delete obj.metadata
                delete obj.phoneNumber
                delete obj.isAnonymous
                delete obj.emailVerified
                delete obj.email
                rootRef.child(pathPerson).set(obj)
            }
        })
    }

    openConnect(cardNum = undefined) {
        this.connect.openConnect(cardNum)
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps
        this.setState({
            cardCount: nextProps.numberOfCards,
            cardConnectCount: nextProps.capturedCards
        })
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.showPopup()}>
                            <ConnectButtonWithDescription ref={ref => this.connect = ref} pictureName='md-share' description='Connect' />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ProfilePictureAndLevel />
                    </View>

                    <View>
                        <ButtonWithDescription pictureName='md-card' description='Cards' navigation={this.props.navigation} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: '2%' }}>
                    <Text style={{ fontSize: aspectRatio<1.6 ? 15 : 20, color: 'white' }} onPress={() => this.setState({ promptVisible: true })}>
                        {this.state.profileName}
                    </Text>

                </View>

                {
                    aspectRatio<1.6 ? (
                        <View style={{opacity : 0.0}}/>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: '2%' }}>
                            <View style={{left: 10, }}>
                                <BigTextAndLowerText bigText={this.state.cardConnectCount} lowerText='Bridges' />
                            </View>
                            
                            <View style={{ left: 20, borderRightWidth: 1, height: '100%', borderRightColor: '#668b9d' }} />

                            <View style={{left: 20, }}>
                                <BigTextAndLowerText bigText={this.state.cardCount} lowerText='BridgeCards' />
                            </View>
                            
                            <View style={{ left: 20, borderRightWidth: 1, height: '100%', borderRightColor: '#668b9d' }} />

                            <View style={{}}>
                                <BigTextAndLowerText bigText={this.state.time} lowerText='MemberSince' />
                            </View>
                        </View>
                    )
                }
                    

                <Prompt
                    title="What is your name? "
                    placeholder="John Doe"
                    visible={this.state.promptVisible}
                    onCancel={() => {

                            this.setState({
                                promptVisible: false
                            });
                        }
                    }
                    onSubmit={(value) => {
                        if (/^\s+$/.test(value)) {
                            this.setState({
                                promptVisible: false,
                                profileName: 'Tap to add name'
                            });
                        }
                        else {
                            this.setState({
                                promptVisible: false,
                                profileName: value
                            });
                            firebase.auth().currentUser.updateProfile({displayName: value})
                            var pathPerson = firebase.auth().currentUser.uid + "person/displayName"
                            rootRef.child(pathPerson).set(value)
                        }
                    }

                    } />

            </View>
        )
    }
}
